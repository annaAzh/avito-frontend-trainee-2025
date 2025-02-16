import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { FormInput } from './components/FormInput';
import { RequiredSymbol } from './components/RequiredSymbol';
import { ExtraFields } from './types';
import { ItemSchema } from '@/shared/lib/schemas/itemSchema';

interface Props {
  element: ExtraFields;
  control: Control<ItemSchema>;
}

export const ExtraFormFields: FC<Props> = ({ element, control }) => {
  return (
    <div>
      {element.domElement === 'input' ? (
        <>
          <Controller
            control={control}
            name={element.name}
            render={({ field }) => <FormInput label={element.label} name={field.name} required={element.required} />}
          />
        </>
      ) : (
        <>
          <Controller
            control={control}
            name={element.name}
            render={({ field }) => (
              <>
                <label>
                  {element.label} <RequiredSymbol />
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder={element.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {element.items &&
                      element.items.map((item: { label?: string | undefined; value: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
        </>
      )}
    </div>
  );
};
