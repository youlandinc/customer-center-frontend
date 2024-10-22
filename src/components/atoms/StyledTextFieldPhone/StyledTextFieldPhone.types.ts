import { SxProps } from '@mui/material';
import { InputBaseProps } from '@mui/material/InputBase';
import { NumberFormatValues } from 'react-number-format';

export interface StyledTextFieldPhoneProps {
  format?: string;
  label?: string;
  sx?: SxProps;
  required?: boolean;
  placeholder?: string;
  validate?: undefined | string[];
  mask?: string;
  value: number | string;
  onValueChange: (values: NumberFormatValues) => void;
  disabled?: boolean;
  error?: any;
  size?: 'small' | 'medium';
  onBlur?: InputBaseProps['onBlur'];
}
