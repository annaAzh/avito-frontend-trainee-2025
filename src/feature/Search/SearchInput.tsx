import { Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Search } from 'lucide-react';
import { FC, useState } from 'react';

export const SearchInput: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const onClickItem = () => {
    setSearchQuery('');
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClickItem();
    }
  };

  return (
    <>
      {focused && <div className="fixed top-0 left-0 bottom-0 right-0 z-30 bg-black/50" />}
      <div className="flex justify-between items-center h-10 relative min-w-[320px] z-30">
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Поиск по объявлениям..."
          className="rounded-xl pl-11 w-full max-w-full outline-none border-primary h-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
        />
        <div
          className={cn(
            'absolute top-14 bg-amber-200 p-4 w-full max-w-full rounded-sm shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'opacity-100 visible top-12',
          )}
        >
          Здесь будут результаты поиска по объявлениям
        </div>
      </div>
    </>
  );
};
