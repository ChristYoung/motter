'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from 'date-fns';

import { ReusableTable } from '@/components/ReuseableTable';
import { VolumeHorn } from '@/components/Volume';
import { useGetWordsApi } from '@/feature/words/hooks/useWords';

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
    accessorKey: '',
    header: 'Right Rate',
    cell: ({ row }) => {
      const correctCount = row.getValue('correct_count') as number;
      const totalCount = row.getValue('total_count') as number;
      const rightRate = ((correctCount / totalCount || 0) * 100).toFixed(2);
      return `${rightRate}%`;
    },
  },
];

const WordsMng: React.FC = () => {
  const { userWords, isLoading } = useGetWordsApi();
  return (
    <div className='h-full px-10'>
      {!isLoading && userWords?.length > 0 && (
        <ReusableTable columns={columns} data={userWords as VWordItemType[]}></ReusableTable>
      )}
    </div>
  );
};

export default WordsMng;
