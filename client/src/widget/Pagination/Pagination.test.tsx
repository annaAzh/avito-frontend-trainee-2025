import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PaginationComponent } from './Pagination';
import userEvent from '@testing-library/user-event';

const mockOnPageChange = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

describe('Pagination Component', () => {
  it('should render pagination buttons', () => {
    render(<PaginationComponent onPageChange={mockOnPageChange} pages={5} />);

    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('should return null if quantity of pages equals 0', () => {
    const { container } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should decrease currentPage and call onPageChange when currentPage > 1', async () => {
    const { getByText } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={2} startPage={2} />);

    const btn = getByText(/Предыдущая/i);
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should increase currentPage and call onPageChange', async () => {
    const { getByText } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={3} startPage={2} />);

    const btn = getByText(/Следующая/i);
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should change currentPage by click on pagination button', async () => {
    const { getByText } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={3} startPage={2} />);

    const btn = getByText(/2/i);
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should not change currentPage and not call onPageChange when currentPage + 1 > pages', async () => {
    const { getByText } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={5} startPage={5} />);

    const btn = getByText(/Следующая/i);

    await userEvent.click(btn);
    expect(mockOnPageChange).not.toHaveBeenCalledWith(5);
  });

  it('should not change currentPage and not call onPageChange when currentPage <=1', async () => {
    const { getByText } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={5} startPage={1} />);

    const btn = getByText(/Предыдущая/i);

    await userEvent.click(btn);
    expect(mockOnPageChange).not.toHaveBeenCalledWith(1);
  });

  it('should not change be clicked on ...', async () => {
    const { getByText } = render(<PaginationComponent onPageChange={mockOnPageChange} pages={10} startPage={1} />);

    const btn = getByText('...');
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
