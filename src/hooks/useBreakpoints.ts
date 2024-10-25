import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

export const useBreakpoints = (
  fnc: typeof useMediaQuery = useMediaQuery,
): Breakpoint | 'xxl' => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce(
      (output: Breakpoint | 'xxl' | null, key: Breakpoint | 'xxl') => {
        const matches = fnc(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      },
      null,
    ) || 'xs'
  );
};
