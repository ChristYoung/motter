import { useMutation } from 'convex/react';
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
