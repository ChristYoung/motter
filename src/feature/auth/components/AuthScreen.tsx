'use client';

import { useState } from 'react';

import { SignFlow } from '../types';
import { SignInCard } from './SignInCard';
import { SignUpCard } from './SignUpCard';

export const AuthScreen: React.FC = () => {
  const [state, setState] = useState<SignFlow>('singIn');
  return (
    <div className='__AuthScreen h-full flex items-center justify-center bg-[#5C3B58]'>
      <div className='md:h-auto md:w-[420px]'>
        {state === 'singIn' ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
      </div>
    </div>
  );
};
