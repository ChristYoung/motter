'use client';

import { Home, MessageSquare, Moon, Sun, UserRoundMinus, ListCheck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { useSheet } from '@/context/SheetContextProvider';
import { useTheme } from '@/context/ThemeProvider';
import { UserBtn } from '@/feature/auth/components/UserBtn';
import { useCurrentUserFuncs } from '@/feature/auth/hooks';

import { FeatureFlag } from './FeatureFlag';
import SidebarBtn from './SideBarBtn';
import { WordInput } from './WordInput';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { openSheet } = useSheet();
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();
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
      <SidebarBtn
        icon={ListCheck}
        label='Input'
        onClick={() =>
          openSheet({
            id: 'word-input',
            title: 'Input New Word',
            content: <WordInput />,
            width: 800,
            direction: 'left',
            style: { overflowY: 'scroll' },
          })
        }
      ></SidebarBtn>
      <SidebarBtn
        icon={MessageSquare}
        label='Mng'
        onClick={() => onSideBarItemClick('/frame/words')}
      />
      <SidebarBtn onClick={toggleTheme} icon={theme === 'light' ? Sun : Moon} label='Theme' />
      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserBtn />
      </div>
    </aside>
  );
};

export default Sidebar;
