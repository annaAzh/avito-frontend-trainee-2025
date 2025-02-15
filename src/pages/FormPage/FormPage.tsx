import { Container } from '@/shared/components/ui';
import { useItem } from '@/shared/hooks/useQueryAndMutation';

import { Form } from '@/widget/Form/Form';
import { Header } from '@/widget/Header/Header';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

export const FormPage: FC = () => {
  const { id } = useParams();
  const [isEditing] = useState<boolean>(id ? true : false);

  const { data } = useItem(id || '');

  const defaultValues = data?.data ? data.data : undefined;

  return (
    <>
      <Header />
      <Container>
        <h1 className="my-8 text-center text-3xl font-extrabold text-primary">
          {isEditing ? 'Обновить объявление (Черновик)' : 'Загрузить новое объявление'}
        </h1>
        <Form isEditing={isEditing} id={id} defaultValues={defaultValues} />
      </Container>
    </>
  );
};
