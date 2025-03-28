'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { Loader, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useCurrentUser } from '../hooks';

export const UserBtn: React.FC = () => {
  const { userInfo, isLoading } = useCurrentUser();
  const router = useRouter();
  const { signOut } = useAuthActions();
  if (isLoading) {
    return <Loader className='size-4 animate-spin text-muted-foreground' />;
  }
  if (!userInfo) {
    return null;
  }
  const avatarFallback = userInfo!.name!.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <Avatar className='rounded-md size-10 hover:opacity-75 transition'>
          <AvatarImage className='rounded-md' alt={userInfo.name} src={userInfo.image} />
          <AvatarFallback className='rounded-md bg-sky-500 text-white'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' side='right' className='w-60'>
        <DropdownMenuItem
          onClick={() => {
            router.replace('/auth');
            signOut();
          }}
          className='h-10'
        >
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
