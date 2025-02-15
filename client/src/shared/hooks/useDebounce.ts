import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay = 250) => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
