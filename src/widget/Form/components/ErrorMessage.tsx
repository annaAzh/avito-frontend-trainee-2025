import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

type Props = {
  message?: string;
  className?: string;
};

export const ErrorMessage: FC<Props> = ({ message, className }) => {
  return <p className={cn('text-red-500 text-sm mt-1', className)}>{message}</p>;
};
