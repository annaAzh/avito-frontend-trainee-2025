import { Button, Container } from '@/shared/components/ui';
import { Header } from '@/widget/Header/Header';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Paths } from '@/shared/types';
import { useDeleteItemById, useItem } from '@/shared/hooks/useQueryAndMutation';
import toast from 'react-hot-toast';
import { IMAGE_PLACEHOLDER } from '@/shared/constants';

export const ProductPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingDelete, setLoadingDelete] = useState(false);

  const { data, isLoading, error } = useItem(id || '');
  const mutation = useDeleteItemById(id || '');
  const product = data?.data;

  if (!product) return <p>Продукт не найден</p>;
  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Ошибка загрузки</p>;

  const handleDeleteItem = async () => {
    setLoadingDelete(true);
    try {
      await mutation.mutateAsync();
      toast.success('Объявление успешно удалено');
      navigate(Paths.LIST);
    } catch {
      toast.error('Ошибка при удалении объявления');
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1 className="my-8 text-center text-3xl font-extrabold text-primary">{product.name}</h1>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="max-w-[300px] h-[300px] md:max-w-[400px] md:h-[400px] flex-shrink-0">
            <img
              src={product.image || IMAGE_PLACEHOLDER}
              alt={product.name}
              className={cn('object-cover w-full h-full ', { 'rounded-lg shadow-md': product.image })}
            ></img>
          </div>

          <div className="flex flex-col flex-grow p-4 space-y-4 bg-white">
            <p className="mb-1 text-gray-600 font-medium">{product.description}</p>

            <div className="space-y-2">
              <p className="text-primary font-semibold">
                Локация: <span className="text-gray-500">{product.location}</span>
              </p>
              <p className="text-primary font-semibold">
                Тип объявления: <span className="text-gray-500">{product.type}</span>
              </p>
            </div>

            {product.type === 'Недвижимость' && (
              <div className="space-y-2">
                <p className="text-primary">
                  Тип недвижимости: <span className="text-gray-500">{product.propertyType}</span>
                </p>
                <p className="text-primary">
                  Площадь: <span className="text-gray-500">{product.area} кв. м.</span>
                </p>
                <p className="text-primary">
                  Количество комнат: <span className="text-gray-500">{product.rooms}</span>
                </p>
                <p className="text-primary">
                  Цена: <span className="text-gray-500">{product.price} руб.</span>
                </p>
              </div>
            )}

            {product.type === 'Услуги' && (
              <div className="space-y-2">
                <p className="text-primary">
                  Тип услуги: <span className="text-gray-500">{product.serviceType}</span>
                </p>
                <p className="text-primary">
                  Опыт работы: <span className="text-gray-500">{product.experience} лет</span>
                </p>
                <p className="text-primary">
                  Стоимость услуги: <span className="text-gray-500">{product.cost} руб.</span>
                </p>
                {product.workSchedule && (
                  <p className="text-primary">
                    График работы: <span className="text-gray-500">{product.workSchedule}</span>
                  </p>
                )}
              </div>
            )}

            {product.type === 'Авто' && (
              <div className="space-y-2">
                <p className="text-primary">
                  Бренд: <span className="text-gray-500">{product.brand}</span>
                </p>
                <p className="text-primary">
                  Модель: <span className="text-gray-500">{product.model}</span>
                </p>
                <p className="text-primary">
                  Год выпуска: <span className="text-gray-500">{product.year}</span>
                </p>
                {product.mileage && (
                  <p className="text-primary">
                    Пробег: <span className="text-gray-500">{product.mileage}</span>
                  </p>
                )}
              </div>
            )}

            <Button loading={loadingDelete} variant="outline" onClick={() => navigate(Paths.FORM)}>
              Редактировать объявление
            </Button>

            <Button loading={loadingDelete} variant="destructive" onClick={handleDeleteItem}>
              Удалить объявление
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};
