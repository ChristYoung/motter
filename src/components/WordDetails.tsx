import { Volume2, Instagram, Trash2, X, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface WordDetailsProps {
  wordId: Id<'words'>;
}

export const WordDetails: React.FC<WordDetailsProps> = (props: WordDetailsProps) => {
  const [similarWords, setSimilarWords] = useState([
    'essence',
    'configuration',
    'mechanics',
    'framework',
    'substance',
    'truth',
    'principle',
  ]);

  const removeWord = (wordToRemove: string) => {
    setSimilarWords(similarWords.filter((word) => word !== wordToRemove));
  };

  return (
    <div className='w-full p-6'>
      {/* Word and pronunciation */}
      <div className='mb-8'>
        <h1 className='text-5xl font-bold text-foreground mb-2'>texture</h1>
        <div className='flex items-center gap-2'>
          <span className='text-foreground'>/tekstʃər/</span>
          <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full'>
            <Volume2 className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Similar words section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>Similar</h2>
        <div className='flex flex-wrap gap-2'>
          {similarWords.map((word, index) => (
            <div
              key={index}
              className={`
                flex items-center gap-1 px-3 py-1.5 rounded-md border border-green-200 bg-green-50
              `}
            >
              <span className='text-foreground dark:text-background'>{word}</span>
              <Button
                variant='ghost'
                size='icon'
                className='size-5 p-0'
                onClick={() => removeWord(word)}
              >
                <X className='size-3 text-foreground dark:text-background' />
              </Button>
            </div>
          ))}
          <Button
            variant='outline'
            className='flex items-center gap-1 px-3 py-1.5 h-auto border-dashed'
          >
            <Plus className='h-3 w-3' />
            <span>add new</span>
          </Button>
        </div>
      </div>

      {/* Definition section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>Definition</h2>
        <div className='space-y-4'>
          <p className='text-foreground'>n. 质地，纹理；口感；(音乐或文学的) 谐和统一感, 神韵</p>
          <p className='text-foreground'>the feel of a surface or a fabric</p>
        </div>
      </div>

      {/* Examples section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>Examples</h2>
        <div className='space-y-4'>
          <p className='text-gray-800 dark:text-foreground'>
            It has an orange flavour and smooth <span className='text-red-500'>texture</span>.
          </p>
          <p className='text-gray-800 dark:text-foreground'>它有一种桔子的味道，质地光滑。</p>

          <div className='flex gap-2 mt-2'>
            <Button variant='outline' size='icon' className='size-10 rounded-full'>
              <Volume2 className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' className='size-10 rounded-full'>
              <Instagram className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' className='size-10 rounded-full'>
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* Input fields */}
      <div className='space-y-4 mb-8'>
        <Input
          placeholder='input your English example'
          className='border-gray-300 focus:border-gray-400 focus:ring-0'
        />
        <Input
          placeholder='input your Chinese example'
          className='border-gray-300 focus:border-gray-400 focus:ring-0'
        />
      </div>

      {/* Add example button */}
      <Button variant='outline' className='border-gray-300 text-gray-500 dark:text-foreground'>
        Add an example
      </Button>
    </div>
  );
};
