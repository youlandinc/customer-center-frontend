import { FC, ReactNode } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Icon,
  SxProps,
} from '@mui/material';

import ICON_STATIC from './assets/icon_static.svg';
import ICON_CHECKED from './assets/icon_checked.svg';
import ICON_INDETERMINATE from './assets/icon_intermediate.svg';

export interface StyledCheckboxProps extends CheckboxProps {
  icon?: ReactNode;
  checkedIcon?: ReactNode;
  checkboxSx?: SxProps;
  checked?: boolean;
  label?: ReactNode;
  indeterminateIcon?: ReactNode;
  sxCheckbox?: SxProps;
}

export const StyledCheckbox: FC<StyledCheckboxProps> = ({
  checked = false,
  label,
  onChange,
  icon,
  checkedIcon,
  indeterminateIcon,
  indeterminate,
  sxCheckbox,
  sx,
  ...rest
}) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            checkedIcon={<Icon component={checkedIcon || ICON_CHECKED} />}
            disableRipple
            icon={<Icon component={icon || ICON_STATIC} />}
            indeterminate={indeterminate}
            indeterminateIcon={
              <Icon component={indeterminateIcon || ICON_INDETERMINATE} />
            }
            onChange={onChange}
            sx={{ ...sxCheckbox }}
            {...rest}
          />
        }
        label={label}
        sx={{
          alignItems: 'flex-start',
          // width: '100%',
          '& .MuiFormControlLabel-label': {
            width: '100%',
            ml: 1.5,
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'text.primary',
          },
          '& .Mui-checked': {
            '& svg > path': {
              fill: 'hsla(222,42%,55%,1) !important',
            },
          },
          '& .MuiCheckbox-root': {
            mt: '-11px',
            mr: '-11px',
            '& svg > path': {
              fill: '#929292',
            },
          },
          '& .Mui-disabled': {
            '& svg > path': {
              fill: '#BABCBE !important',
            },
          },
          ...sx,
        }}
      />
    </>
  );
};
