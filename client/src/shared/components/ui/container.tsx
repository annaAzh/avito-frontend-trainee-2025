import { cn } from '@/shared/lib/utils';
import { FC, ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

export const Container: FC<Props> = ({ className, children }) => {
  return <div className={cn('max-w-[1280px] mx-auto px-3 sm:px-5', className)}>{children}</div>;
};
