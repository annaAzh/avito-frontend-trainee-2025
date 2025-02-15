import { cn } from '@/shared/lib/utils';
import { Filters } from '@/shared/types';
import { SelectForm } from '@/widget/Form/components/Select';
import { FC, useEffect, useState } from 'react';

interface Props {
  className?: string;
  onFilterChange: (filters: Filters) => void;
}

export const Filter: FC<Props> = ({ className, onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({ type: '', sort: '' });

  useEffect(() => onFilterChange(filters), [filters, onFilterChange]);

  const handleSelectType = (key: 'type' | 'sort', value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={cn('flex gap-4 items-center', className)}>
      <SelectForm
        callBack={(value) => handleSelectType('type', value)}
        name="type"
        placeholder="выбери тип объявления"
        select_label="тип объявления"
        items={[{ value: 'Недвижимость' }, { value: 'Авто' }, { value: 'Услуги' }, { value: 'Все' }]}
        className="max-w-[300px]"
      />

      <SelectForm
        callBack={(value) => handleSelectType('sort', value)}
        name="sort"
        placeholder="сортировка по"
        select_label="фильтр"
        items={[
          { value: 'Asc name' },
          { value: 'Desc name' },
          { value: 'сначала с фото' },
          { value: 'сначала без фото' },
        ]}
        className="max-w-[300px]"
      />
    </div>
  );
};
