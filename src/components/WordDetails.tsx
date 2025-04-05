import { Instagram, Trash2, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetWordByIdApi } from '@/feature/words/hooks/useWords';
import { safeJSONParse } from '@/util';

import { Id } from '../../convex/_generated/dataModel';
import { FullSkeleton } from './FullSkeleton';
import { SynonymTags } from './SynonymTags';
import { VolumeHorn } from './Volume';

export interface WordDetailsProps {
  wordId: Id<'words'>;
}

export const WordDetails: React.FC<WordDetailsProps> = (props: WordDetailsProps) => {
  const { wordId } = props;
  const { wordDetail, isLoading } = useGetWordByIdApi(wordId);

  if (isLoading) {
    return <FullSkeleton />;
  }

  return (
    <div className='w-full p-6'>
      {/* Word and pronunciation */}
      <div className='mb-8'>
        <h1 className='text-5xl font-bold text-foreground mb-2'>{wordDetail?.text}</h1>
        <div className='flex items-center gap-2'>
          {wordDetail?.phonetic && <span className='text-foreground'>{wordDetail?.phonetic}</span>}
          <VolumeHorn wordText={wordDetail?.text} preloadSrc />
        </div>
      </div>

      {/* Similar words section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>Similar</h2>
        <div className='flex flex-wrap gap-2'>
          <SynonymTags tags={safeJSONParse(wordDetail?.synonym, [])} />
        </div>
      </div>

      {/* Definition section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>Definition</h2>
        <div className='space-y-4'>
          <p className='text-foreground'>{wordDetail?.cn_explanation}</p>
          <p className='text-foreground'>{wordDetail?.en_explanation}</p>
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
