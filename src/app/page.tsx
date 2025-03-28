'use client';

import { Button } from '@/components/ui/button';
import { useDrawer } from '@/context/DrawerContext';
import { UserBtn } from '@/feature/auth/components/UserBtn';

export default function Home() {
  const { openDrawer } = useDrawer();
  return (
    <div className='h-full flex items-center justify-center gap-4'>
      <Button
        onClick={() => {
          openDrawer({
            id: 'welcome',
            title: 'Welcome to Motter',
            description: 'This is a sample drawer component.',
            content: <div>Drawer content goes here.</div>,
          });
        }}
      >
        Welcome to Motter
      </Button>
      <UserBtn />
    </div>
  );
}
