import { Footer } from '@/widget/Footer/Footer';
import { Header } from '@/widget/Header/Header';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer className="mt-auto" />
    </div>
  );
};
