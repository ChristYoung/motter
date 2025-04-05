import { Skeleton } from './ui/skeleton';

export const FullSkeleton: React.FC = () => {
  return (
    <div className='w-full flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='w-full space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    </div>
  );
};
