import { Button, Container } from '@/shared/components/ui';
import { useItems } from '@/shared/hooks/useQueryAndMutation';
import { Header } from '@/widget/Header/Header';
import { MapPin } from 'lucide-react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const imagePlaceholder = '/assets/images/placeholder.svg';

export const CatalogPage: FC = () => {
  const { data, isLoading, error } = useItems();
  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Ошибка загрузки</p>;

  if (!data?.success || !data.data || data.data.length === 0) return <p>Объявления не найдены</p>;

  return (
    <>
      <Header />
      <Container>
        <h1 className="my-8 text-center text-3xl font-extrabold">Объявления</h1>
        <ul className="grid grid-cols-1 gap-5 justify-items-center">
          {data.data.map((item) => {
            return (
              <li
                className="border border-gray-300 rounded-2xl p-4 w-full max-w-[600px] bg-white shadow-md hover:shadow-lg transition-shadow h-full cursor-pointer"
                key={item.id}
              >
                <Link to={`/item/${item.id}`} className="flex gap-5">
                  <div className="relative max-w-[200px] h-[200px]">
                    <img
                      src={item.image || imagePlaceholder}
                      alt={item.name}
                      className="object-contain w-full h-full"
                    ></img>
                  </div>
                  <div className="flex flex-col flex-grow p-4">
                    <h4 className="mb-4 text-xl font-semibold">{item.name}</h4>
                    <p className="mb-1 text-gray-500 flex items-center gap-1">
                      <MapPin size={16} />
                      {item.location}
                    </p>
                    <p className="mb-1 text-gray-500">{item.type}</p>
                    <Button className="w-fit mt-auto" variant="outline">
                      Открыть
                    </Button>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
};
