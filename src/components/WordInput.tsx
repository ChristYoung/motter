'use client';

import { useState } from 'react';

import { Input } from '@/components/ui/input';

export const WordInput: React.FC = () => {
  const [wordQueue, setWordQueue] = useState<string[]>(['']);
  return (
    <div className='__WordInput'>
      {wordQueue.map((word, index) => (
        <Input
          key={index}
          value={word}
          onChange={(e) => {
            const newWordQueue = [...wordQueue];
            newWordQueue[index] = e.target.value;
            setWordQueue(newWordQueue);
          }}
        />
      ))}
    </div>
  );
};
