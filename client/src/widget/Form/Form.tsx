import { cn } from '@/shared/lib/utils';
import { FC, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { auto, realEstate, services } from './constants';
import { ItemSchema, itemSchema } from '@/shared/lib/schemas/itemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddNewItem, useUpdateItemById } from '@/shared/hooks/useQueryAndMutation';
import { Auto, ItemRequest, Paths, RealEstate, Services } from '@/shared/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ExtraFields } from './types';
import { RequiredSymbol } from './components/RequiredSymbol';
import { FormInput } from './components/FormInput';
import { ExtraFormFields } from './ExtraFormFields';

interface Props {
  className?: string;
  isEditing?: boolean;
  defaultValues?: (RealEstate & { id: number }) | (Auto & { id: number }) | (Services & { id: number });
  id?: string;
}

export const FormComponent: FC<Props> = ({
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
  const { control, watch, setValue, reset, handleSubmit } = form;

  const type = watch('type');

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

        reset();

        navigate(Paths.LIST);
      } else {
        toast.error('Произошла ошибка при публикации объявления');
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

  useEffect(() => {
    if (type === 'Недвижимость') {
      setExtraFields(realEstate);
    } else if (type === 'Авто') {
      setExtraFields(auto);
    } else if (type === 'Услуги') {
      setExtraFields(services);
    }
  }, [type]);

  useEffect(() => {
    if (isEditing) return;

    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (const key in parsedData) {
        setValue(key as keyof ItemSchema, parsedData[key]);
      }
    }
  }, [setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('formData', JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...form}>
      <form className={cn('flex justify-center', className)} onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col flex-1 gap-4 max-w-[600px]">
          <Controller
            control={control}
            name="name"
            render={() => <FormInput label="Название" name="name" required />}
          />
          <Controller
            control={control}
            name="description"
            render={() => <FormInput label="Описание" name="description" required />}
          />
          <Controller
            control={control}
            name="location"
            render={() => <FormInput label="Локация" name="location" required />}
          />
          <Controller control={control} name="image" render={() => <FormInput label="Фото" name="image" />} />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <>
                <label>
                  Категория объявления <RequiredSymbol />
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выбери категорию объявления" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Недвижимость">Недвижимость</SelectItem>
                    <SelectItem value="Авто">Авто</SelectItem>
                    <SelectItem value="Услуги">Услуги</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          />

          {extraFields.map((element) => (
            <ExtraFormFields element={element} control={control} key={element.name} />
          ))}

          <Button loading={form.formState.isSubmitting} type="submit" className="w-fit mx-auto">
            {isEditing ? 'Сохранить изменения' : 'Загрузить'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
