'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserBtn } from '@/feature/auth/components/UserBtn';

export default function Home() {
  const router = useRouter();
  const goToWorkspace = () => {
    router.replace(`/workspace`);
  };

  return (
    <div className='h-full flex flex-col items-center justify-center gap-4'>
      <UserBtn size='md' hideMenu />
      <Button onClick={goToWorkspace}>
        Welcome to Motter
        <ArrowRight />
      </Button>
    </div>
  );
}
