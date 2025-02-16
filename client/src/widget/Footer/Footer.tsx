import { Container } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Github } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return (
    <div className={cn('bg-gray-200 py-4', className)}>
      <Container>
        <div className="flex gap-4 justify-center items-center">
          <Link
            to="https://github.com/annaAzh"
            target="_blank"
            className="hover:text-gray-600 transition-colors duration-200 font-medium flex gap-1"
          >
            <Github /> Anna Azherina
          </Link>
        </div>
      </Container>
    </div>
  );
};
