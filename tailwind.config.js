/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        vp: {
          accent: 'var(--vp-c-accent)',
          'accent-bg': 'var(--vp-c-accent-bg)',
          'accent-hover': 'var(--vp-c-accent-hover)',
          'accent-text': 'var(--vp-c-accent-text)',
          'accent-soft': 'var(--vp-c-accent-soft)',
          bg: 'var(--vp-c-bg)',
          'bg-alt': 'var(--vp-c-bg-alt)',
          'bg-elv': 'var(--vp-c-bg-elv)',
          'bg-soft': 'var(--vp-c-bg-soft)',
          text: 'var(--vp-c-text)',
          'text-mute': 'var(--vp-c-text-mute)',
          'text-subtle': 'var(--vp-c-text-subtle)',
          divider: 'var(--vp-c-divider)',
          border: 'var(--vp-c-border)',
          'border-hard': 'var(--vp-c-border-hard)',
          control: 'var(--vp-c-control)',
          'control-hover': 'var(--vp-c-control-hover)',
          'control-disabled': 'var(--vp-c-control-disabled)',
          navbar: 'var(--vp-navbar-c-bg)',
          sidebar: 'var(--vp-sidebar-c-bg)',
          'code-bg': 'var(--vp-c-code-bg)',
          'code-text': 'var(--vp-c-code-text)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'vp-nav': '0 1px 0 0 var(--vp-c-divider)',
        'vp-sidebar': '1px 0 0 var(--vp-c-divider)',
        'vp-card': '0 1px 3px 0 var(--vp-c-border), 0 4px 6px 0 var(--vp-c-border)',
        'vp-popup': '0 6px 24px 0 var(--vp-c-shadow)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      spacing: {
        'navbar': '3.6rem',
        'sidebar': '20rem',
        'content': '740px',
        'homepage': '960px',
      },
      maxWidth: {
        'content': '740px',
        'homepage': '960px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
      },
    },
  },
  plugins: [],
};
