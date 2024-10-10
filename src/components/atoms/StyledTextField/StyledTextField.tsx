import { FC } from 'react';
import { StandardTextFieldProps, SxProps, TextField } from '@mui/material';

export interface StyledTextFieldProps
  extends Omit<StandardTextFieldProps, 'variant'> {
  sx?: SxProps;
  disabledAutoFill?: boolean;
  variant?: 'outlined' | 'standard' | 'filled';
}

export const StyledTextField: FC<StyledTextFieldProps> = ({
  sx,
  value = '',
  onChange,
  variant = 'outlined',
  disabledAutoFill = true,
  ...rest
}) => {
  return (
    <>
      <TextField
        onChange={onChange}
        slotProps={{
          formHelperText: { component: 'div' },
          htmlInput: {
            ...rest?.slotProps?.htmlInput,
            autoComplete: disabledAutoFill ? 'off' : '',
          },
          input: {
            ...rest?.slotProps?.input,
            autoComplete: disabledAutoFill ? 'off' : '',
          },
        }}
        sx={{
          width: '100%',
          borderRadius: 2,
          padding: 0,
          '& label.Mui-focused': {
            color: 'text.focus',
            '& span': {
              color: 'text.focus',
            },
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            boxShadow: 'none',
            input: {
              '&::placeholder': {
                color: 'text.placeholder',
              },
              color: 'text.primary',
              lineHeight: 1,
            },
            '& fieldset': {
              borderColor: 'background.border_default',
            },
            '&:hover fieldset': {
              borderColor: 'background.border_hover',
              color: 'background.border_hover',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid',
              borderColor: 'background.border_focus',
            },
          },
          '& .Mui-disabled.MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'background.border_disabled',
            },
          },
          '& .Mui-disabled': {
            cursor: 'not-allowed',
            '&:hover fieldset': {
              borderColor: 'background.border_default',
            },
          },
          '& .MuiFormHelperText-root': {
            margin: 0,
            fontSize: 12,
          },
          ...sx,
        }}
        value={value}
        variant={variant}
        {...rest}
        // size={['xs', 'sm', 'md'].includes(breakpoints) ? 'small' : 'medium'}
      />
    </>
  );
};
