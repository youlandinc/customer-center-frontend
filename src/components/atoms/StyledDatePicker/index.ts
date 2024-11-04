import { SxProps } from '@mui/material';

export const StyledDatePickerStyles: SxProps = {
  width: '100%',
  borderRadius: 2,
  padding: 0,
  '& label.Mui-focused': {
    color: 'text.focus',
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
      color: 'text.primary',
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
};
