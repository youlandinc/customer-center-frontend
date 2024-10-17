import { FC } from 'react';
import {
  FormControl,
  Icon,
  MenuItem,
  Select,
  SxProps,
  Typography,
} from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';

import LOGO_PROHIBIT from './asset/logo-prohibit.svg';

interface StyledSelectPopupProps {
  id: string;
  value: string | undefined | number;
  onChange: SelectInputProps['onChange'];
  options: any[];
  sx?: SxProps;
  required?: boolean;
}

export const StyledSelectPopup: FC<StyledSelectPopupProps> = ({
  id,
  value,
  onChange,
  options,
  sx,
  required = false,
}) => {
  return (
    <FormControl
      required={required}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          padding: 0,
          border: 'none',
          '& .MuiOutlinedInput-input': {
            padding: '10.5px 32px 10.5px 14px',
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
      <Select
        displayEmpty
        id={id}
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
        renderValue={(selected) => {
          if ((selected as string).length === 0) {
            return (
              <Typography color={'text.secondary'}>Select a field</Typography>
            );
          }
          if (selected == -1) {
            return <Typography>Do not import</Typography>;
          }

          return options.find((item) => item.value === selected).label;
        }}
        value={value}
        variant={'outlined'}
      >
        <MenuItem
          disabled
          sx={{ px: 1.5, pt: 1.5, pb: 0, fontSize: 12 }}
          value={''}
        >
          Match to existing column
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.label} sx={{ py: 1.5, px: 3 }} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
        <MenuItem
          sx={{ height: 50, fontSize: 12, color: 'text.secondary', gap: 0.5 }}
          value={'-1'}
        >
          <Icon component={LOGO_PROHIBIT} sx={{ height: 18, width: 18 }} />
          Don&#39;t import column
        </MenuItem>
      </Select>
    </FormControl>
  );
};
