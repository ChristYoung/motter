import { Instagram, Trash2, Volume2 } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  useAddExampleApi,
  useDeleteExampleApi,
  useQueryExamplesByWordIdApi,
} from '@/feature/words/hooks/useExamples';
import { useGetWordByIdApi } from '@/feature/words/hooks/useWords';
import { safeJSONParse } from '@/util';

import { Id } from '../../convex/_generated/dataModel';
import { FullSkeleton } from './FullSkeleton';
import { SynonymTags } from './SynonymTags';
import { VolumeHorn } from './Volume';
import { Textarea } from './ui/textarea';

export interface WordDetailsProps {
  wordId: Id<'words'>;
}

export const WordDetails: React.FC<WordDetailsProps> = (props: WordDetailsProps) => {
  const { wordId } = props;
  const { wordDetail, isLoading } = useGetWordByIdApi(wordId);
  const { exampleList, isLoading: isLoadingExamples } = useQueryExamplesByWordIdApi(wordId);
  const { deleteExampleMutate } = useDeleteExampleApi();
  const { addExampleMutate } = useAddExampleApi();
  const inputRefCn = useRef<HTMLTextAreaElement>(null);
  const inputRefEn = useRef<HTMLTextAreaElement>(null);

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
        <h2 className='text-2xl font-bold text-foreground mb-4'>Synonyms</h2>
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
      <div className='mb-4'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>Examples</h2>
        <div className='space-y-4'>
          {isLoadingExamples ? (
            <FullSkeleton />
          ) : (
            exampleList.map((example) => (
              <div
                key={example._id}
                className='flex flex-col gap-2 border-b border-blue-100 dark:border-blue-200 pb-4'
              >
                <p className='text-gray-800 dark:text-foreground'>{example.en}</p>
                <p className='text-gray-800 dark:text-foreground'>{example.cn}</p>
                <div className='flex gap-2 mt-2'>
                  <Button variant='outline' size='icon' className='size-8 rounded-full'>
                    <Volume2 className='size-2' />
                  </Button>
                  <Button variant='outline' size='icon' className='size-8 rounded-full'>
                    <Instagram className='size-2' />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    className='size-8 rounded-full'
                    onClick={() => deleteExampleMutate(example._id)}
                  >
                    <Trash2 className='size-2' />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='space-y-3 my-3'>
          <Textarea ref={inputRefEn} placeholder='Type your English example' />
          <Textarea ref={inputRefCn} placeholder='Type your Chinese example' />
        </div>
      </div>

      {/* Add example button */}
      <Button
        variant='outline'
        onClick={() => {
          const exampleCn = inputRefCn.current?.value;
          const exampleEn = inputRefEn.current?.value;
          if (exampleCn && exampleEn) {
            addExampleMutate(wordId, { cn: exampleCn, en: exampleEn, isDictation: false });
            inputRefCn.current.value = '';
            inputRefEn.current.value = '';
          }
        }}
      >
        Add an example
      </Button>
    </div>
  );
};
