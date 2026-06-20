import { useRef, useState, useEffect } from 'react';
import { Lock, Check, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';

interface SlideCaptchaProps {
  onVerify: (verified: boolean) => void;
}

export default function SlideCaptcha({ onVerify }: SlideCaptchaProps) {
  const { t } = useLocale();
  const [verified, setVerified] = useState(false);
  const [position, setPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (verified) return;
    e.preventDefault();
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startPosRef.current = position;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (verified) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startPosRef.current = position;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || verified) return;
      
      const trackWidth = trackRef.current?.clientWidth ?? 300;
      const delta = e.clientX - startXRef.current;
      const newPos = Math.max(0, Math.min(startPosRef.current + delta, trackWidth - 44));
      setPosition(newPos);

      if (newPos >= trackWidth - 48) {
        isDraggingRef.current = false;
        setVerified(true);
        onVerify(true);
      }
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      
      const trackWidth = trackRef.current?.clientWidth ?? 300;
      if (position < trackWidth - 48) {
        setPosition(0);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || verified || e.touches.length === 0) return;
      
      const trackWidth = trackRef.current?.clientWidth ?? 300;
      const delta = e.touches[0].clientX - startXRef.current;
      const newPos = Math.max(0, Math.min(startPosRef.current + delta, trackWidth - 44));
      setPosition(newPos);

      if (newPos >= trackWidth - 48) {
        isDraggingRef.current = false;
        setVerified(true);
        onVerify(true);
      }
    };

    const handleTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [verified, onVerify, position]);

  const handleReset = () => {
    setVerified(false);
    setPosition(0);
    onVerify(false);
  };

  return (
    <div className="w-full select-none">
      <div
        ref={trackRef}
        className={`relative h-11 rounded-xl overflow-hidden transition-colors duration-300 ${
          verified
            ? 'bg-green-500/15 border border-green-500/30'
            : 'bg-vp-bg-alt border border-vp-divider'
        }`}
      >
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {verified ? (
            <span className="text-sm font-medium text-green-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              {t['verify success']}
            </span>
          ) : (
            <span className="text-sm text-vp-c-text-mute flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              {t['slide to verify']}
            </span>
          )}
        </div>

        {/* Slider button */}
        {!verified && (
          <motion.div
            className="absolute top-0.5 left-0.5 w-10 h-10 rounded-lg bg-white shadow-md border border-gray-200 flex items-center justify-center cursor-grab hover:bg-gray-50 active:scale-95 transition-transform"
            style={{ x: position }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <ArrowRightIcon />
          </motion.div>
        )}

        {/* Success overlay */}
        {verified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0.5 right-0.5 w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>

      {/* Reset link */}
      {verified && (
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 text-xs text-vp-c-text-mute hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          {t['verify reset']}
        </button>
      )}
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
