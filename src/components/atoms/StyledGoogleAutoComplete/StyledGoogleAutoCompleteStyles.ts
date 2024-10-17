import { SxProps } from '@mui/material';

export const StyledGoogleAutoCompleteStyles: Record<
  string,
  Record<string, SxProps>
> = {
  inside: {
    autoComplete: {
      width: '100%',
    },
    icon: {
      width: 'calc(100% - 44px)',
      wordWrap: 'break-word',
    },
  },
};
