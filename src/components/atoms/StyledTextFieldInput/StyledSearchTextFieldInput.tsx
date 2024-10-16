import { FC, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  OutlinedTextFieldProps,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { StyledTextFieldInput } from './StyledTextFieldInput';

type StyledTextFieldInputProps = OutlinedTextFieldProps & {
  handleClear?: () => void;
};

export const StyledSearchTextFieldInput: FC<StyledTextFieldInputProps> = ({
  handleClear,
  ...rest
}) => {
  const [focusVisible, setFocusVisible] = useState(false);

  return (
    <StyledTextFieldInput
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: 16 }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                handleClear?.();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              sx={{ display: 'none', p: 0 }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onBlur={() => {
        setFocusVisible(false);
      }}
      onFocus={() => {
        setFocusVisible(true);
      }}
      placeholder={focusVisible ? 'Search' : ''}
      sx={{
        width: focusVisible ? 340 : 200,
        transition: 'width 0.3s ease-in-out',
        '& input': { py: 1.25, fontSize: 14 },
        '& .MuiOutlinedInput-root': {
          height: '32px !important',
          '&.Mui-focused fieldset': {
            border: '1px solid',
            borderColor: 'border.focus',
          },
        },
        '& .MuiInputBase-root:hover': {
          '& .MuiButtonBase-root': {
            display: 'flex',
          },
        },
        bgcolor: '#FBFCFD',
        borderRadius: 2,
        '& .MuiOutlinedInput-root fieldset': {
          borderRadius: 2,
        },
      }}
      {...rest}
    />
  );
};
