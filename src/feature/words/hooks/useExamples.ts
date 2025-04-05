import { useMutation, useQuery } from 'convex/react';
import { useCallback } from 'react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export const useQueryExamplesByWordIdApi = (wordId: Id<'words'>) => {
  const exampleList = useQuery(api.examples.getExamplesByWordId, { wordId });
  const isLoading = exampleList === undefined;
  return { exampleList, isLoading };
};

export const useAddExampleApi = () => {
  const addExample = useMutation(api.examples.addExampleByWordId);
  const addExampleCallback = useCallback(
    async (
      wordId: Id<'words'>,
      example: {
        cn: string;
        en: string;
        isDictation: boolean;
      }
    ) => {
      await addExample({ wordId, ...example });
    },
    [addExample]
  );
  return addExampleCallback;
};

export const useDeleteExampleApi = () => {
  const deleteExample = useMutation(api.examples.deleteExampleById);
  const deleteExampleCallback = useCallback(
    async (exampleId: Id<'examples'>) => {
      await deleteExample({ exampleId });
    },
    [deleteExample]
  );
  return deleteExampleCallback;
};

export const useUpdateExampleApi = () => {
  const updateExample = useMutation(api.examples.updateExampleById);
  const updateExampleCallback = useCallback(
    async (
      exampleId: Id<'examples'>,
      data: {
        cn?: string;
        en?: string;
        isDictation?: boolean;
      }
    ) => {
      await updateExample({ exampleId, data });
    },
    [updateExample]
  );
  return updateExampleCallback;
};
