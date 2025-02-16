import { Button, Container } from '@/shared/components/ui';
import { Paths } from '@/shared/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  return (
    <Container className="m-auto">
      <div className="py-6 flex flex-col items-center">
        <div className="text-primary uppercase mb-6 md:mb-10 text-9xl font-medium font-rubik ">404</div>
        <p className="font-rubik text-3xl md:text-4xl md:mb-4">Упс!</p>
        <p className="font-rubik text-3xl md:text-4xl mb-4">Страница не найдена</p>
        <p className="font-inter text-base text-gray-400 md:text-xl mb-8 text-center">
          Эта страница не существует или была удалена
        </p>
        <Button className="w-fit m-auto">
          <Link to={Paths.HOME}>Вернуться на главную</Link>
        </Button>
      </div>
    </Container>
  );
};
