import { FC } from 'react';
import { OutlinedTextFieldProps, TextField } from '@mui/material';

type StyledTextFieldInputProps = OutlinedTextFieldProps;

export const StyledTextFieldInput: FC<StyledTextFieldInputProps> = ({
  onChange,
  sx,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      onChange={onChange}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          padding: 0,
          border: 'none',
          '& .MuiInputLabel-outlined': {
            transform: 'translate(14px, 18px) scale(1)',
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
          },

          '& .MuiOutlinedInput-input': {
            padding: '16.5px 32px 16.5px 14px',
          },
          '& fieldset': {
            border: '1px solid',
            borderColor: 'border.normal',
            borderRadius: 3,
          },
          '&.Mui-focused fieldset': {
            border: '1px solid',
            borderColor: 'border.focus',
          },
          '&:hover fieldset': {
            border: '1px solid',
            borderColor: 'border.focus',
          },
          '& input': {
            color: 'text.primary',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
          '&.Mui-focused': {
            color: 'text.secondary',
          },
        },
        ...sx,
      }}
      variant={'outlined'}
    />
  );
};
