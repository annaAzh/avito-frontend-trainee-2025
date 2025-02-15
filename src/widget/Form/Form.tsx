import { cn } from '@/shared/lib/utils';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/shared/components/ui';
import { FormInput } from './components/FormInput';
import { SelectForm } from './components/Select';
import { ExtraFields, FieldName } from './types';
import { auto, realEstate, services } from './constants';
import { autoSchema, ItemSchema, itemSchema, realEstateSchema, serviceSchema } from '@/shared/lib/schemas/itemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddNewItem, useUpdateItemById } from '@/shared/hooks/useQueryAndMutation';
import { Auto, ItemRequest, Paths, RealEstate, Services } from '@/shared/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const schemaMap = {
  Недвижимость: realEstateSchema,
  Авто: autoSchema,
  Услуги: serviceSchema,
};

interface Props {
  className?: string;
  isEditing?: boolean;
  defaultValues?: (RealEstate & { id: number }) | (Auto & { id: number }) | (Services & { id: number });
  id?: string;
}

export const Form: FC<Props> = ({
  className,
  isEditing,
  id,
  defaultValues = { name: '', description: '', location: '', image: undefined, type: undefined },
}) => {
  const [extraFields, setExtraFields] = useState<ExtraFields[]>([]);
  const navigate = useNavigate();

  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues,
    mode: 'onChange',
  });
  const { control, setValue, trigger } = form;
  const type = useWatch({ control, name: 'type' });
  const propertyType = useWatch({ control, name: 'propertyType' });
  const brand = useWatch({ control, name: 'brand' });
  const serviceType = useWatch({ control, name: 'serviceType' });

  useEffect(() => {
    if (type && schemaMap[type]) {
      const saveData = {
        name: form.getValues('name'),
        description: form.getValues('description'),
        image: form.getValues('image'),
        location: form.getValues('location'),
      };
      form.reset();
      setValue('type', type);
      setValue('name', saveData.name);
      setValue('description', saveData.description);
      setValue('image', saveData.image);
      setValue('location', saveData.location);
    }
  }, [type]);

  useEffect(() => {
    if (propertyType) {
      setValue('area', 0);
      setValue('rooms', 0);
      setValue('price', 0);
      setValue('type', type);
      setValue('propertyType', propertyType);
    }
    if (brand) {
      setValue('mileage', 0);
      setValue('year', new Date().getFullYear());
      setValue('model', '');
      setValue('type', type);
      setValue('brand', brand);
    }
    if (serviceType) {
      setValue('experience', 0);
      setValue('cost', 0);
      setValue('workSchedule', '');
      setValue('type', type);
      setValue('serviceType', serviceType);
    }
  }, [propertyType, brand, serviceType]);

  const mutation = useAddNewItem();
  const updateMutation = useUpdateItemById();

  const submitForm = async (data: ItemSchema) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== '' && value !== null && value !== undefined),
    ) as unknown as ItemRequest;

    if (!isEditing) {
      const result = await mutation.mutateAsync(cleanedData);
      if (result.success) {
        toast.success('Объявление было опубликовано');

        form.reset();
        navigate(Paths.LIST);
      } else {
        toast.success('Произошла ошибка при публикации объявления');
      }
    } else if (isEditing && id) {
      const result = await updateMutation.mutateAsync({ id, data: cleanedData });
      if (result.success) {
        toast.success('Объявление было обновлено');
      } else {
        toast.error('Ошибка при обновлении объявления');
      }
    }
  };

  const handleChangeCategory = (value: string) => {
    if (value === 'realEstate') {
      setExtraFields(realEstate);
      setValue('type', 'Недвижимость');
    } else if (value === 'auto') {
      setExtraFields(auto);
      setValue('type', 'Авто');
    } else if (value === 'services') {
      setExtraFields(services);
      setValue('type', 'Услуги');
    } else {
      setExtraFields([]);
    }

    trigger('type');
  };

  const handleInnerSelects = (name: FieldName, value: string) => {
    setValue(name, value);
  };

  return (
    <FormProvider {...form}>
      <form className={cn('flex justify-center', className)} onSubmit={form.handleSubmit(submitForm)}>
        <div className="flex flex-col flex-1 gap-4 max-w-[600px]">
          <FormInput name="name" required={true} label="Название" type="text" />
          <FormInput name="description" required={true} label="Описание" type="text" />
          <FormInput name="location" required={true} label="Локация" type="text" />
          <FormInput name="image" required={false} label="Ссылка на изображение" type="text" />

          <SelectForm
            name="type"
            required={true}
            callBack={handleChangeCategory}
            placeholder="Выбери категорию объявления"
            label="Категория объявления"
            select_label="Категория объявления"
            items={[
              { label: 'Недвижимость', value: 'realEstate' },
              { label: 'Авто', value: 'auto' },
              { label: 'Услуги', value: 'services' },
            ]}
          />
          {extraFields &&
            extraFields.length > 0 &&
            extraFields.map((element) => {
              return (
                <li key={element.id} className="list-none">
                  {element.domElement === 'input' && (
                    <FormInput
                      name={element.name}
                      required={element.required}
                      label={element.label}
                      type={element.type}
                    />
                  )}

                  {element.domElement === 'select' && (
                    <SelectForm
                      name={element.name}
                      required={element.required}
                      callBack={(value) => handleInnerSelects(element.name, value)}
                      items={element.items}
                      placeholder={element.label}
                      select_label={element.label}
                      label={element.label}
                    />
                  )}
                </li>
              );
            })}
          <Button loading={form.formState.isSubmitting} type="submit" className="w-fit mx-auto">
            {isEditing ? 'Сохранить изменения' : 'Загрузить'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
