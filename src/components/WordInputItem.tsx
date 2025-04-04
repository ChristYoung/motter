'use client';

import { useKeyPress } from 'ahooks';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useAddWordApi } from '@/feature/words/hooks/useWords';
import { fetchWordDetailsFromDictionary } from '@/util';

import { VWordItemType } from '../../convex/schema';

export interface WordInputItemProps {
  onFinish?: (word: string) => void;
  isFocus?: boolean;
}

export const WordInputItem: React.FC<WordInputItemProps> = (props: WordInputItemProps) => {
  const { onFinish, isFocus } = props;
  const [disabled, setDisabled] = useState<boolean>(false);
  const { mutate: mutateAddWord } = useAddWordApi();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addWordToDBHandler = useCallback(
    async (word: string) => {
      const wordFromDic = await fetchWordDetailsFromDictionary(word);
      await mutateAddWord(wordFromDic as VWordItemType);
    },
    [mutateAddWord]
  );

  useKeyPress('Enter', async (e) => {
    if (!isFocus) return;
    const wordValue = (e.target as HTMLInputElement).value;
    if (wordValue) {
      inputRef.current?.blur();
      await addWordToDBHandler(wordValue);
      onFinish?.(wordValue);
      setDisabled(true);
    }
  });

  return (
    <div className='__WordInputItem'>
      <Input disabled={disabled} ref={inputRef} placeholder='Enter a word' />
    </div>
  );
};
