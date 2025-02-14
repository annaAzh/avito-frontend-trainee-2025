import { Input } from '@/shared/components/ui';
import { Search } from 'lucide-react';
import { FC } from 'react';

interface Props {
  searchQuery: string;
  onChangeSearch: (value: string) => void;
}

export const SearchInput: FC<Props> = ({ onChangeSearch, searchQuery }) => {
  return (
    <>
      <div className="flex justify-between items-center h-10 relative min-w-[320px] max-w-[400px] z-30">
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Поиск по объявлениям..."
          className="rounded-xl pl-11 w-full max-w-full outline-none border-primary h-full"
          value={searchQuery}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </div>
    </>
  );
};
