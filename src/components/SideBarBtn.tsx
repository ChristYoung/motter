import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons/lib';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SidebarBtnProps {
  icon: LucideIcon | IconType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarBtn: React.FC<SidebarBtnProps> = (props: SidebarBtnProps) => {
  const { active, icon: Icon, label, onClick } = props;
  return (
    <div className='__sidebarBtn flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group'>
      <Button
        variant={'transparent'}
        onClick={onClick}
        className={cn('size-9 p-2 group-hover:bg-accent/20', active && 'bg-accent/20')}
      >
        <Icon className='size-5 text-white group-hover:scale-110 transition-all duration-300' />
      </Button>
      <span className='text-[11px] text-white group-hover:text-accent'>{label}</span>
    </div>
  );
};

export default SidebarBtn;
