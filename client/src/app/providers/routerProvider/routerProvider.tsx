import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Paths } from '@/shared/types';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { FormPage } from '@/pages/FormPage/FormPage';

const router = createBrowserRouter([
  {
    path: `${Paths.HOME}`,
    element: <CatalogPage />,
  },
  {
    path: `${Paths.LIST}`,
    element: <CatalogPage />,
  },
  {
    path: `${Paths.ITEM}`,
    element: <ProductPage />,
  },
  {
    path: `${Paths.FORM}`,
    element: <FormPage />,
  },
  {
    path: `${Paths.FORM_EDIT}`,
    element: <FormPage />,
  },
  {
    path: `${Paths.NOT_FOUND}`,
    element: <NotFoundPage />,
  },
]);

const RouteProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export { RouteProvider };
