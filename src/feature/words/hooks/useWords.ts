import { useMutation } from 'convex/react';
import { useCallback } from 'react';

import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

export interface WordItemType {
  _id?: Id<'words'>;
  text: string;
  phonetic: string;
  cn_explanation: string;
  en_explanation: string;
  mispronounced: boolean;
  total_count: number;
  correct_count: number;
  type: 'WORD' | 'PHRASE';
}

export const useAddWordApi = () => {
  const mutation = useMutation(api.words.addWord);
  const mutate = useCallback(
    async (props: WordItemType) => {
      await mutation(props);
    },
    [mutation]
  );
  return { mutate };
};
