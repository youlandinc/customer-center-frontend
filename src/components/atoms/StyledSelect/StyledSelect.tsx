import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';

import { StyledSelectProps } from './StyledSelect.types';

export const StyledSelect: FC<StyledSelectProps> = ({
  label,
  labelId,
  id,
  value,
  onChange,
  options,
  sx,
  required = false,
  onOpen,
  onClose,
  open,
}) => {
  return (
    <FormControl
      required={required}
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
            borderColor: 'text.primary',
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
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        id={id}
        label={label}
        labelId={labelId}
        MenuProps={{
          disableScrollLock: true,
          MenuListProps: {
            sx: {
              m: 0,
              p: 0,
            },
          },
        }}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        value={value}
        variant={'outlined'}
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
