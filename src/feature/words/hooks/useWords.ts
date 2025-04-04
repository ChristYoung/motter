import { useMutation, useQuery } from 'convex/react';
import { useCallback } from 'react';

import { api } from '../../../../convex/_generated/api';
import { VWordItemType } from '../../../../convex/schema';

export const useAddWordApi = () => {
  const mutation = useMutation(api.words.addWord);
  const mutate = useCallback(
    async (props: VWordItemType) => {
      await mutation(props);
    },
    [mutation]
  );
  return { mutate };
};

export const useGetWordsApi = () => {
  const userWords = useQuery(api.words.getUserWords);
  const isLoading = userWords === undefined;
  return { userWords, isLoading };
};
