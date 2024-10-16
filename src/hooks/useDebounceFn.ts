import { useTimeoutFunction } from '@/hooks/useTimeoutFunction';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useDebounceFn = (fn: Function, ms = 0) => {
  return useTimeoutFunction(fn, ms);
};
