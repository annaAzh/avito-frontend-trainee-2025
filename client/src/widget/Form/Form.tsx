import { cn } from '@/shared/lib/utils';
import { FC, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { auto, realEstate, services } from './constants';
import { ItemSchema, itemSchema } from '@/shared/lib/schemas/itemSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddNewItem, useUpdateItemById } from '@/shared/hooks/useQueryAndMutation';
import { Auto, ItemRequest, Paths, RealEstate, Services } from '@/shared/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/components/ui';
import { ExtraFields } from './types';
import { RequiredSymbol } from './components/RequiredSymbol';

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
  const { control, setValue, watch } = form;
  const type = useWatch({ control, name: 'type' });

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
    Object.keys(extraFields).forEach((key, i) => {
      if (extraFields[i].parentType === type) return;
      if (extraFields[i].parentType !== type) {
        setValue(extraFields[Number(key)].name, '');
      }
    });
  }, [extraFields, setValue]);

  useEffect(() => {
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
    <Form {...form}>
      <form className={cn('flex justify-center', className)} onSubmit={form.handleSubmit(submitForm)}>
        <div className="flex flex-col flex-1 gap-4 max-w-[600px]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <label>
                  Название <RequiredSymbol />
                </label>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <label>
                  Описание <RequiredSymbol />
                </label>
                <FormControl>
                  <Input placeholder="Введите описание" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <label>
                  Локация <RequiredSymbol />
                </label>
                <FormControl>
                  <Input placeholder="Введите локацию" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <label>Фото</label>
                <FormControl>
                  <Input placeholder="Введите ссылку на изображение" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <label>
                  Категория объявления <RequiredSymbol />
                </label>
                <FormControl>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {extraFields.map((element) => (
            <FormField
              key={element.id}
              control={form.control}
              name={element.name}
              render={({ field }) => (
                <FormItem>
                  <label>
                    {element.label} {element.required && <RequiredSymbol />}
                  </label>
                  <FormControl>
                    {element.domElement === 'input' ? (
                      <Input placeholder={element.label} {...field} />
                    ) : (
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <SelectTrigger>
                          <SelectValue placeholder={element.label} />
                        </SelectTrigger>
                        <SelectContent>
                          {element.items &&
                            element.items.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.value}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button loading={form.formState.isSubmitting} type="submit" className="w-fit mx-auto">
            {isEditing ? 'Сохранить изменения' : 'Загрузить'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
