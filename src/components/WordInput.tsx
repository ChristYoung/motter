'use client';

import { useState } from 'react';

import { WordInputItem } from './WordInputItem';

export const WordInput: React.FC = () => {
  const [words, setWords] = useState<Array<{ isFocus: boolean }>>([{ isFocus: true }]);
  return (
    <div className='__WordInput'>
      {words.map((w, index) => (
        <div key={index} className='mb-5'>
          <WordInputItem
            isFocus={w.isFocus}
            onFinish={() => {
              setWords((prev) => {
                const newWords = [...prev];
                newWords[index] = { isFocus: false };
                newWords.push({ isFocus: true });
                return newWords;
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
