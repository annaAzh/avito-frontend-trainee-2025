import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';
import { render } from '@testing-library/react';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const DebounceComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebounce(value, delay);

  return <div data-testid="testId">{debouncedValue}</div>;
};

describe('useDebounce', () => {
  it('should update value after delay', async () => {
    const { getByTestId } = render(<DebounceComponent value="test" delay={250} />);
    expect(getByTestId('testId')).toBeInTheDocument();
    expect(getByTestId('testId')).toHaveTextContent('');

    vi.runAllTimers();
    await vi.waitFor(() => expect(getByTestId('testId')).toHaveTextContent('test'));
  });
});
