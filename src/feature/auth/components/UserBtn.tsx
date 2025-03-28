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
import { cn } from '@/lib/utils';

import { useCurrentUser } from '../hooks';

export interface UserBtnProps {
  hideMenu?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UserBtn: React.FC<UserBtnProps> = (props: UserBtnProps) => {
  const { hideMenu, size } = props;
  const sizeMap = { sm: 'size-10', md: 'size-16', lg: 'size-20' };
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

  const AvatarContent = (
    <Avatar className={cn('rounded-md hover:opacity-75 transition', sizeMap[size || 'sm'])}>
      <AvatarImage className='rounded-md' alt={userInfo.name} src={userInfo.image} />
      <AvatarFallback className='rounded-md bg-sky-500 text-white'>{avatarFallback}</AvatarFallback>
    </Avatar>
  );

  return (
    <DropdownMenu modal={false}>
      {hideMenu ? (
        AvatarContent
      ) : (
        <DropdownMenuTrigger className='outline-none relative'>{AvatarContent}</DropdownMenuTrigger>
      )}
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
