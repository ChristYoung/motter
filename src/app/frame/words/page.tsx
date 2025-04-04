'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Volume2 } from 'lucide-react';

import { ReusableTable } from '@/components/ReuseableTable';
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
          <Volume2 strokeWidth={1} className='cursor-pointer' />
        </div>
      );
    },
  },
  {
    accessorKey: '_creationTime',
    header: 'Creation Time',
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
