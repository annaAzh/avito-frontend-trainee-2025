import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useItems } from '@/shared/hooks/useQueryAndMutation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

vi.mock('@/shared/api', () => ({
  getItems: vi.fn().mockResolvedValue([{ id: 1, name: 'Item 1' }]),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('test useQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should call useQuery hook ', async () => {
    const { result } = renderHook(() => useItems(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await vi.waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.data).toEqual([{ id: 1, name: 'Item 1' }]);
  });
});
