import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/';
import { FC } from 'react';
import { RequiredSymbol } from './RequiredSymbol';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  name: string;
  label?: string;
  select_label: string;
  required?: boolean;
  placeholder: string;
  items?: { label?: string; value: string }[];
  callBack: (value: string) => void;
}

const SelectForm: FC<Props> = ({ name, required, items = [], placeholder, label, select_label, callBack }) => {
  return (
    <>
      <div>
        {label}
        {required && <RequiredSymbol />}
      </div>

      <Select name={name} required={required} onValueChange={callBack}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{select_label}</SelectLabel>
            {items.length > 0 &&
              items.map((item, i) => {
                return (
                  <SelectItem key={i} value={item.value}>
                    {item.label ? item.label : item.value}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export { SelectForm };
