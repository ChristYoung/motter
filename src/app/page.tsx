'use client';

import { Button } from '@/components/ui/button';
import { UserBtn } from '@/feature/auth/components/UserBtn';

export default function Home() {
  return (
    <div className='h-full flex items-center justify-center gap-4'>
      <Button>Welcome to Motter</Button>
      <UserBtn />
    </div>
  );
}
