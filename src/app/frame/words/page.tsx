'use client';

import { ColumnDef } from '@tanstack/react-table';

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
  },
  {
    accessorKey: '_creationTime',
    header: 'Creation Time',
  },
  {
    accessorKey: '',
    header: 'Right Rate',
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
