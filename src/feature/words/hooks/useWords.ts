import { useMutation, useQuery } from 'convex/react';
import { useCallback } from 'react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
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
  const wordList = useQuery(api.words.getUserWords);
  const isLoading = wordList === undefined;
  return { wordList, isLoading };
};

export const useGetWordByIdApi = (wordId: Id<'words'>) => {
  const wordDetail = useQuery(api.words.getWordById, { wordId });
  const isLoading = wordDetail === undefined;
  return { wordDetail, isLoading };
};

export const useDeleteWordApi = () => {
  const mutation = useMutation(api.words.deleteWord);
  const mutate = useCallback(
    async (wordId: Id<'words'>) => {
      await mutation({ wordId });
    },
    [mutation]
  );
  return { mutate };
};

export const useUpdateWordByIdApi = () => {
  const mutation = useMutation(api.words.updateWordById);
  const mutate = useCallback(
    async (wordId: Id<'words'>, data: Partial<VWordItemType>) => {
      await mutation({ wordId, data });
    },
    [mutation]
  );
  return { mutate };
};
