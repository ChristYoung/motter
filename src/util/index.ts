import { VWordItemType } from '../../convex/schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const FREE_DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en'; //  Free dictionary API, supports cross-domain access, but does not return Chinese definitions, //https://dictionaryapi.dev/

export const fetchWordDetailsFromDictionary = async (
  word: string
): Promise<Partial<VWordItemType>> => {
  const response = await fetch(`${FREE_DICTIONARY_API}/${word}`);
  const data = (await response.json()) as unknown[];
  if (response.ok) {
    if (data?.length > 0 && data[0]) {
      const wordWrap = data[0] as any;
      const meanings =
        (wordWrap?.['meanings'] as unknown[])?.length > 0 ? (wordWrap?.meanings as unknown[]) : [];
      const word: string = wordWrap.word;
      const en_explanation = meanings
        .map((m: any) => {
          return `${m?.['partOfSpeech']} ${m?.['definitions'][0]?.definition}`;
        })
        .join('; ');
      return {
        text: word,
        phonetic: wordWrap?.phonetic,
        en_explanation,
        cn_explanation: '',
        mispronounced: false,
        total_count: 0,
        correct_count: 0,
        type: word.includes(' ') ? 'PHRASE' : 'WORD',
      } as VWordItemType;
    }
  }
  return {};
};
