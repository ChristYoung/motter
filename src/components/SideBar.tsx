'use client';

import { Home, MessageSquare, Moon, Sun, UserRoundMinus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';

import { UserBtn } from '@/feature/auth/components/UserBtn';
import { useCurrentUserFuncs } from '@/feature/auth/hooks';

import { FeatureFlag } from './FeatureFlag';
import SidebarBtn from './SideBarBtn';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const { userFuncs } = useCurrentUserFuncs();

  const onSideBarItemClick = (url: string) => {
    router.push(url);
  };

  return (
    // bg-[#481349]
    <aside className='__sidebar w-[70px] bg-[#481349] dark:bg-slate-800 h-full flex flex-col gap-y-4 items-center pt-[9px] pb-4 pr-3 pl-3'>
      <SidebarBtn
        icon={Home}
        label='Home'
        active={pathname.includes('/workspace')}
        onClick={() => onSideBarItemClick('/frame/workspace')}
      />
      <FeatureFlag conditions={[!!userFuncs, userFuncs?.code === 'ADMIN']} mode='allOf'>
        <SidebarBtn
          icon={UserRoundMinus}
          label='Users'
          active={pathname.includes('/users')}
          onClick={() => onSideBarItemClick('/frame/users')}
        />
      </FeatureFlag>
      <SidebarBtn icon={MessageSquare} label='DMs' />
      <SidebarBtn
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        icon={theme === 'light' ? Sun : Moon}
        label='Theme'
      />
      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
