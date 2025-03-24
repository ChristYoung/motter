import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { SignFlow } from '../types';

export interface SignUpCardProps {
  setState: (state: SignFlow) => void;
}

export const SignUpCard: React.FC<SignUpCardProps> = (props: SignUpCardProps) => {
  const { setState } = props;
  const { signIn } = useAuthActions();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState<string>('');

  const onProviderSignUp = (value: 'github' | 'google') => {
    setSpinning(true);
    signIn(value).finally(() => {
      setSpinning(false);
    });
  };

  const onPasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setSpinning(true);
    signIn('password', { name, email, password, flow: 'signUp' })
      .catch(() => {
        setError('invalid email or password');
      })
      .finally(() => {
        setSpinning(false);
      });
  };

  return (
    <Card className='__SignUpCard w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email or another service</CardDescription>
      </CardHeader>
      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4'></TriangleAlert>
          <p>{error}</p>
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5' onSubmit={onPasswordSignUp}>
          <Input
            disabled={spinning}
            value={name}
            placeholder='Name'
            type='text'
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
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
          <Input
            disabled={spinning}
            value={confirmPassword}
            placeholder='Confirm the password'
            type='password'
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          <Button type='submit' disabled={spinning} className='w-full' size={'lg'}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            variant='outline'
            className='w-full'
            size={'lg'}
            onClick={() => onProviderSignUp('github')}
          >
            <FaGithub /> Continue with Github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account?{' '}
          <span
            className='text-sky-700 hover:underline cursor-pointer'
            onClick={() => setState('singIn')}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
