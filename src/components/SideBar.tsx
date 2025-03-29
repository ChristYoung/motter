'use client';

import { Bell, Home, MessageSquare, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useTheme } from '@/context/ThemeProvider';
import { UserBtn } from '@/feature/auth/components/UserBtn';

import SidebarBtn from './SideBarBtn';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    // bg-[#481349]
    <aside className='__sidebar w-[70px] bg-[#481349] dark:bg-slate-800 h-full flex flex-col gap-y-4 items-center pt-[9px] pb-4 pr-3 pl-3'>
      <SidebarBtn icon={Home} label='Home' active={pathname.includes('/workspace')} />
      <SidebarBtn icon={MessageSquare} label='DMs' />
      <SidebarBtn icon={Bell} label='Activity' />
      <SidebarBtn onClick={toggleTheme} icon={theme === 'light' ? Sun : Moon} label='Theme' />
      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
