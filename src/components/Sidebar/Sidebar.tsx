import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SidebarItem {
  title: string;
  path: string;
  items?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
}

export default function Sidebar({ items, title }: SidebarProps) {
  const location = useLocation();

  const renderItem = (item: SidebarItem, index: number) => {
    const isActive = location.pathname === item.path;

    if (item.items) {
      return (
        <div key={item.path || index} className='mb-4'>
          <Link
            to={item.path}
            className={`block py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'text-vp-accent'
                : 'text-vp-c-text-mute hover:text-vp-c-accent'
            }`}
          >
            {item.title}
          </Link>
          <div className='ml-3 mt-1 border-l border-vp-divider pl-3 space-y-1'>
            {item.items.map((subItem, subIndex) => renderItem(subItem, subIndex))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.path || index}
        to={item.path}
        className={`block py-1.5 text-sm transition-colors ${
          isActive
            ? 'text-vp-accent font-medium'
            : 'text-vp-c-text-mute hover:text-vp-c-accent'
        }`}
      >
        <span className='flex items-center gap-1'>
          {isActive && <ChevronRight className='w-3 h-3' />}
          {item.title}
        </span>
      </Link>
    );
  };

  return (
    <aside className='w-64 shrink-0 hidden lg:block'>
      <div className='sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pl-4'>
        {title && (
          <h3 className='text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3'>
            {title}
          </h3>
        )}
        <nav className='space-y-0.5'>{items.map((item, index) => renderItem(item, index))}</nav>
      </div>
    </aside>
  );
}
