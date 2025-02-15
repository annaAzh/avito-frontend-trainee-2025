import { queryClient } from '@/app/providers/queryProvider/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

interface Props {
  children?: React.ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QueryProvider };
