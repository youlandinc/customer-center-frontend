import { SxProps } from '@mui/material';
import * as React from 'react';
import { BaseSelectProps } from '@mui/material/Select/Select';

export interface StyledSelectProps extends BaseSelectProps {
  validate?: undefined | string[];
  options: Option[];
  sxHelperText?: SxProps;
  sxList?: SxProps;
  onClose?: (event: React.SyntheticEvent) => void;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
}
