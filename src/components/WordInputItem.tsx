'use client';

import { useKeyPress } from 'ahooks';
import { useLayoutEffect, useRef } from 'react';

import { Input } from '@/components/ui/input';

export interface WordInputItemProps {
  onFinish?: (word: string) => void;
  isFocus?: boolean;
}

export const WordInputItem: React.FC<WordInputItemProps> = (props: WordInputItemProps) => {
  const { onFinish, isFocus } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  useKeyPress('Enter', (e) => {
    if (!isFocus) return;
    const wordValue = (e.target as HTMLInputElement).value;
    if (wordValue) {
      inputRef.current?.blur();
      onFinish?.(wordValue);
    }
  });

  return (
    <div className='__WordInputItem'>
      <Input ref={inputRef} placeholder='Enter a word' />
    </div>
  );
};
