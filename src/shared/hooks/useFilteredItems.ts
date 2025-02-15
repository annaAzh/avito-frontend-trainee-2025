import { ITEMS_PER_PAGE } from '@/shared/constants';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useItems } from '@/shared/hooks/useQueryAndMutation';
import { Filters, ItemResponse } from '@/shared/types';
import { useCallback, useEffect, useState } from 'react';

const useFilteredItem = () => {
  const { data, isLoading, error } = useItems();

  const [renderedData, setRenderedData] = useState<ItemResponse[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({ type: '', sort: '' });
  const debouncedQuery = useDebounce(searchQuery, 250);

  const [totalItems, setTotalItems] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    if (!data?.data || !data.success) return;

    let filteredItems = data.data.filter((el) => el.name.toLowerCase().includes(debouncedQuery.toLowerCase()));

    if (filters.type && filters.type !== 'Все') {
      filteredItems = filteredItems.filter((item) => item.type === filters.type);
    }

    if (filters.sort === 'Asc name') {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'Desc name') {
      filteredItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filters.sort === 'сначала с фото') {
      filteredItems = [...filteredItems.filter((el) => el.image), ...filteredItems.filter((el) => !el.image)];
    } else if (filters.sort === 'сначала без фото') {
      filteredItems = [...filteredItems.filter((el) => !el.image), ...filteredItems.filter((el) => el.image)];
    }

    setTotalItems(filteredItems.length);
    setPages(Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
    setCurrentPage((prevPage) => Math.min(prevPage, Math.ceil(filteredItems.length / ITEMS_PER_PAGE)));

    setRenderedData(filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) || []);
  }, [currentPage, data, debouncedQuery, filters]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleChangeFilters = useCallback((filters: Filters) => {
    setFilters(filters);
    setCurrentPage(1);
  }, []);

  return {
    isLoading,
    error,
    renderedData,
    pages,
    totalItems,
    searchQuery,
    currentPage,
    onPageChange,
    handleChangeSearch,
    handleChangeFilters,
  };
};

export { useFilteredItem };
