import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { FC } from 'react';

type Props = {
  onClick: () => void;
  className?: string;
};

export const ClearButton: FC<Props> = ({ onClick, className }) => {
  return (
    <button
      className={cn(
        'hover:opacity-100 opacity-50 transition-all duration-200 absolute right-2 top-1/2 translate-y-[-50%] cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      <X size={16} />
    </button>
  );
};
