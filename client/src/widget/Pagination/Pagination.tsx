import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  Pagination,
} from '@/shared/components/ui';
import { PaginationNext } from '@/shared/components/ui/pagination';
import { cn } from '@/shared/lib/utils';
import { getPaginationArray } from '@/shared/lib/utils/getpaginationArray';
import { FC, useState } from 'react';

interface Props {
  startPage?: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  pages?: number;
}

export const PaginationComponent: FC<Props> = ({ startPage = 1, onPageChange, siblings = 1, pages }) => {
  const [currentPage, setCurrentPage] = useState(startPage);

  if (!pages) {
    return null;
  }

  const arr = getPaginationArray(pages, currentPage, siblings);

  const handlePreviousClick = () => {
    if (currentPage <= 1) return;

    setCurrentPage(currentPage - 1);
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage + 1 > pages) return;

    setCurrentPage(currentPage + 1);
    onPageChange(currentPage + 1);
  };

  const handleItemClick = (page: number | string) => {
    if (typeof page === 'string') return;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Pagination className="mt-4 ">
      <PaginationContent>
        <>
          <PaginationItem key="previous" className="cursor-pointer">
            <PaginationPrevious
              onClick={handlePreviousClick}
              className={cn('', {
                'pointer-events-none opacity-40': currentPage <= 1,
              })}
            />
          </PaginationItem>
          {arr.map((page, index) => (
            <PaginationItem key={index} className="select-none cursor-pointer">
              <PaginationLink isActive={page === currentPage} onClick={() => handleItemClick(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem key="next" className="cursor-pointer">
            <PaginationNext
              onClick={handleNextClick}
              className={cn('', {
                'pointer-events-none opacity-40': currentPage + 1 > pages,
              })}
            />
          </PaginationItem>
        </>
      </PaginationContent>
    </Pagination>
  );
};
