'use client';

import { Button } from '@/components/ui/button';
import { useSheet } from '@/context/SheetContext';
import { UserBtn } from '@/feature/auth/components/UserBtn';

export default function Home() {
  const { openSheet } = useSheet();
  return (
    <div className='h-full flex items-center justify-center gap-4'>
      <Button
        onClick={() => {
          openSheet({
            id: 'welcome',
            title: 'Welcome to Motter',
            width: 600,
            description: 'This is a sample drawer component.',
            direction: 'right',
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
