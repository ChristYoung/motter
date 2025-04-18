'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { Binoculars, Trash2 } from 'lucide-react';

import { ReusableTable } from '@/components/ReuseableTable';
import { VolumeHorn } from '@/components/Volume';
import { WordDetails } from '@/components/WordDetails';
import { Button } from '@/components/ui/button';
import { useSheet } from '@/context/SheetContextProvider';
import { useDeleteWordApi, useGetWordsApi } from '@/feature/words/hooks/useWords';

import { Id } from '../../../../convex/_generated/dataModel';
import { VWordItemType } from '../../../../convex/schema';

const columns: ColumnDef<VWordItemType>[] = [
  {
    accessorKey: 'text',
    header: 'Word',
  },
  {
    accessorKey: 'phonetic',
    header: 'Phonetic',
    cell: ({ row }) => {
      const phonetic = row.getValue('phonetic') as string;
      return (
        <div className='flex items-center gap-2'>
          {phonetic}
          <VolumeHorn
            wordText={row.getValue('text') as string}
            preloadSrc={false}
            autoPlay={false}
          />
        </div>
      );
    },
  },
  {
    accessorKey: '_creationTime',
    header: 'Creation Time',
    cell: ({ row }) => {
      const creationTime = row.getValue('_creationTime') as string;
      return formatDate(new Date(creationTime), 'yyyy/MM/dd HH:mm:ss');
    },
  },
  {
    id: 'rightRate',
    header: 'Right Rate',
    cell: ({ row }) => {
      const { correct_count, total_count } = row.original;
      const rightRate = ((correct_count / total_count || 0) * 100).toFixed(2);
      return `${rightRate}%`;
    },
  },
  {
    accessorKey: '_id',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <OpenWordDetail wordId={row.getValue('_id') as Id<'words'>} />
        </div>
      );
    },
  },
];

const OpenWordDetail = (props: { wordId: Id<'words'> }) => {
  const { openSheet } = useSheet();
  const { mutate: mutateDeleteWordById } = useDeleteWordApi();
  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8 rounded-full'
        onClick={() => {
          openSheet({
            id: `word-detail_${props.wordId}`,
            content: <WordDetails wordId={props?.wordId} />,
            width: 800,
            style: { overflowY: 'auto' },
          });
        }}
      >
        <Binoculars className='size-4' />
      </Button>
      <Button
        variant='ghost'
        size='icon'
        className='h-8 w-8 rounded-full'
        onClick={() => mutateDeleteWordById(props.wordId)}
      >
        <Trash2 className='size-4' />
      </Button>
    </div>
  );
};

const WordsMng: React.FC = () => {
  const { wordList, isLoading } = useGetWordsApi();
  return (
    <div className='h-full px-10'>
      {!isLoading && wordList?.length > 0 && (
        <ReusableTable columns={columns} data={wordList as VWordItemType[]}></ReusableTable>
      )}
    </div>
  );
};

export default WordsMng;
