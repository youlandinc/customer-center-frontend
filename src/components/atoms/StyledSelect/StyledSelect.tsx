import { FC } from 'react';
import {
  BaseSelectProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
} from '@mui/material';

export interface StyledSelectProps extends BaseSelectProps {
  options: Option[];
  sxList?: SxProps;
}

export const StyledSelect: FC<StyledSelectProps> = ({
  label,
  value,
  onChange,
  options,
  sx,
  sxList,
  required = false,
  size = 'medium',
  ...rest
}) => {
  return (
    <FormControl
      required={required}
      size={size}
      sx={{
        width: '100%',
        '& .Mui-disabled': {
          color: 'text.disabled',
          cursor: 'not-allowed',
        },
        '& .MuiInputBase-formControl': {
          borderRadius: 2,
        },
        '& .MuiInputLabel-formControl.Mui-focused': {
          color: 'text.primary',
        },
        '& .Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #202939 !important',
          },
          '& .MuiOutlinedInput-input': {
            background: 'transparent',
          },
        },
        ...sx,
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        defaultValue={''}
        label={label}
        MenuProps={{
          disableScrollLock: true,
          MenuListProps: {
            sx: {
              p: 0,
              m: 0,
              '& .MuiMenuItem-root:hover': {
                bgcolor: 'rgba(144, 149, 163, 0.1) !important',
              },
              '& .Mui-selected': {
                bgcolor: 'hsla(,100%,95%,1) !important',
              },
              '& .Mui-selected:hover': {
                bgcolor: 'hsla(,100%,92%,1) !important',
              },
              '& .MuiMenuItem-root': {
                fontSize: 14,
                color: 'text.primary',
                p: 1.5,
              },
              ...sxList,
            },
          },
          PaperProps: {
            style: { marginTop: 12, borderRadius: 8 },
          },
        }}
        onChange={onChange}
        value={value}
        variant={'outlined'}
        {...rest}
      >
        {options.map((item) => (
          <MenuItem
            key={item.key}
            sx={{ p: 1.5, fontSize: 14 }}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
