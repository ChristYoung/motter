import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { SignFlow } from '../types';

export interface SignInCardProps {
  setState: (state: SignFlow) => void;
}

export const SignInCard: React.FC<SignInCardProps> = (props: SignInCardProps) => {
  const { setState } = props;
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState<string>('');
  const [spinning, setSpinning] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onProviderSignIn = (value: 'github' | 'google') => {
    setSpinning(true);
    signIn(value).finally(() => {
      setSpinning(false);
    });
  };

  const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpinning(true);
    signIn('password', { email, password, flow: 'signIn' })
      .catch(() => {
        setError('invalid email or password');
      })
      .finally(() => {
        setSpinning(false);
      });
  };

  return (
    <Card className='__SignInCard w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service</CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4'></TriangleAlert>
          <p>{error}</p>
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form onSubmit={onPasswordSignIn} className='space-y-2.5'>
          <Input
            disabled={spinning}
            value={email}
            placeholder='Email'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Input
            disabled={spinning}
            value={password}
            placeholder='Password'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <Button type='submit' className='w-full' size={'lg'} disabled={spinning}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            variant='outline'
            className='w-full'
            size={'lg'}
            disabled={spinning}
            onClick={() => onProviderSignIn('github')}
          >
            <FaGithub /> Continue with Github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <span className='text-sky-700 hover:underline cursor-pointer' onClick={() => setState('signUp')}>
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
