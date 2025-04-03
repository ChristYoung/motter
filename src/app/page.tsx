'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserBtn } from '@/feature/auth/components/UserBtn';

export default function Home() {
  const router = useRouter();
  const goToHome = () => {
    router.replace(`/frame`);
  };

  return (
    <div className='h-full flex flex-col items-center justify-center gap-4'>
      <Image src='/next.svg' width={360} height={360} className='select-none' alt='logo' />
      <UserBtn size='md' hideMenu />
      <Button onClick={goToHome}>
        Welcome to Motter
        <ArrowRight />
      </Button>
    </div>
  );
}
