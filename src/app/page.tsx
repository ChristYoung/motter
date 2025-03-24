import { Button } from '@/components/ui/button';
import { AuthScreen } from '@/feature/auth/components/AuthScreen';

export default function Home() {
  return (
    <div className='h-full flex items-center justify-center gap-4'>
      <Button>Welcome to Motter</Button>
    </div>
    // <AuthScreen />
  );
}
