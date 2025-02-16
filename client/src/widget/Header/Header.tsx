import { Button, Container } from '@/shared/components/ui';
import { Paths } from '@/shared/types';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 py-4">
      <Container>
        <div className="flex flex-wrap gap-5 justify-between items-center">
          <Link to={Paths.LIST}>
            <img src="/assets/icons/logo.svg" alt="logo" className="max-h-[28px]" />
          </Link>

          <div className="flex-1 md:ml-auto flex gap-5 justify-end items-center">
            <Link to={Paths.LIST} className="hover:text-gray-600 transition-colors duration-200 font-medium text-xl">
              Объявления
            </Link>
            <Button variant="outline" className="cursor-pointer" onClick={() => navigate(Paths.FORM)}>
              Разместить объявление
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
