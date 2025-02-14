import { SearchInput } from '@/feature/Search/SearchInput';
import { Button, Container } from '@/shared/components/ui';
import { Paths } from '@/shared/types';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 py-4">
      <Container>
        <div className="flex gap-4 justify-between items-center">
          <SearchInput />
          <Button variant="outline" className="cursor-pointer" onClick={() => navigate(Paths.FORM)}>
            Разместить объявление
          </Button>
        </div>
      </Container>
    </div>
  );
};
