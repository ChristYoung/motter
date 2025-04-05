import { useKeyPress } from 'ahooks';
import { Plus, X } from 'lucide-react';
import { memo, useCallback, useRef, useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

export interface SynonymTagsProps {
  tags: string[];
  freezed?: boolean;
  onTagsChange?: (newTags: string[]) => void;
}

const COLOR_MAP = ['pink', 'red', 'yellow', 'orange', 'green'];

export const SynonymTags: React.FC<SynonymTagsProps> = memo((props: SynonymTagsProps) => {
  const { tags, freezed, onTagsChange } = props;
  const [synonyms, setSynonyms] = useState<string[]>(tags);
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onRemoveTagHandler = useCallback(
    (removedTag: string) => {
      const newTags = synonyms.filter((p) => p !== removedTag);
      setSynonyms(newTags);
      onTagsChange(newTags);
    },
    [onTagsChange, synonyms]
  );

  const onAddTagHandler = useCallback(
    (addTag: string) => {
      if (!addTag || synonyms.includes(addTag)) return;
      const newTags = [...synonyms, addTag];
      setSynonyms(newTags);
      onTagsChange(newTags);
    },
    [onTagsChange, synonyms]
  );

  useKeyPress(
    'enter',
    (event) => {
      onAddTagHandler(event.target?.['value']);
    },
    {
      target: inputRef,
    }
  );

  return (
    <>
      {synonyms.length > 0 &&
        synonyms.map((s, i) => {
          const randomColor = COLOR_MAP[i % synonyms.length];
          const randomColorClassName = `border-${randomColor}-200 bg-${randomColor}-50`;
          return (
            <div
              key={s}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md border ${randomColorClassName}`}
            >
              <span className='text-foreground dark:text-background'>{s}</span>
              <Button
                variant='ghost'
                size='icon'
                className='size-5 p-0'
                onClick={() => onRemoveTagHandler(s)}
              >
                {!freezed && <X className='size-3 text-foreground dark:text-background' />}
              </Button>
            </div>
          );
        })}
      {!freezed && !inputVisible && (
        <Button
          variant='outline'
          className='flex items-center gap-1 px-3 py-1.5 h-auto border-dashed'
          onClick={() => {
            setInputVisible(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 50);
          }}
        >
          <Plus className='size-3' />
          <span>add new</span>
        </Button>
      )}
      {!freezed && inputVisible && (
        <Input
          ref={inputRef}
          className='border-gray-300 focus:border-gray-400 focus:ring-0 w-[75px]'
          onBlur={() => {
            const addedTag = inputRef.current.value;
            onAddTagHandler(addedTag);
          }}
        />
      )}
    </>
  );
});

SynonymTags.displayName = 'SynonymTags';
