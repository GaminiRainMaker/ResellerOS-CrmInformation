import {useEffect, useState} from 'react';

const useDebounceHook = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounceHook;
