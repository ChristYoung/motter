import { useGetWordByIdApi } from '@/feature/words/hooks/useWords';

import { Id } from '../../convex/_generated/dataModel';
import { FullSkeleton } from './FullSkeleton';

export interface WordDetailsProps {
  wordId: Id<'words'>;
}

export const WordDetails: React.FC<WordDetailsProps> = (props: WordDetailsProps) => {
  const { wordId } = props;
  const { wordDetail, isLoading } = useGetWordByIdApi(wordId);
  return isLoading ? (
    <FullSkeleton />
  ) : (
    <div className='__WordDetails'>{JSON.stringify(wordDetail)}</div>
  );
};
