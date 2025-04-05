import { Loader, Volume2 } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

export interface VolumeProps {
  wordText: string;
  preloadSrc?: boolean;
  autoPlay?: boolean;
}

export const AUDIO_SRC = 'https://dict.youdao.com/dictvoice?type=0&audio=';

export const VolumeHorn: React.FC<VolumeProps> = memo((props: VolumeProps) => {
  const { wordText, preloadSrc, autoPlay } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState('');
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (preloadSrc) {
      setAudioSrc(`${AUDIO_SRC}${wordText}`);
    }
  }, [preloadSrc, wordText]);

  const playAudioManual = () => {
    if (audioPlayerRef.current) {
      if (!preloadSrc && !audioSrc) {
        setLoading(true);
        setAudioSrc(`${AUDIO_SRC}${wordText}`);
      }
      setTimeout(() => audioPlayerRef.current.play(), 0);
    }
  };

  const onMediaLoadedHandler = () => {
    setLoading(false);
    if (autoPlay) {
      playAudioManual();
    }
  };

  return (
    <div className='__Volume'>
      {wordText && (
        <audio
          ref={audioPlayerRef}
          hidden
          onLoadedMetadata={onMediaLoadedHandler}
          src={audioSrc}
        ></audio>
      )}
      {loading ? (
        <Loader className='size-6 animate-spin text-foreground' />
      ) : (
        <Volume2 strokeWidth={1} className='cursor-pointer' onClick={playAudioManual} />
      )}
    </div>
  );
});

VolumeHorn.displayName = 'VolumeHorn';
