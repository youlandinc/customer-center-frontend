import { FC, useEffect, useState } from 'react';
import { NumberFormatValues, PatternFormat } from 'react-number-format';

import { StyledTextFieldPhoneProps } from './index';

import { StyledTextField } from '../StyledTextField';

export const StyledTextFieldPhone: FC<StyledTextFieldPhoneProps> = ({
  format = '(###) ###-####',
  mask = '_',
  value,
  onValueChange,
  sx,
  disabled = false,
  ...rest
}) => {
  const [text, setText] = useState<number | string>(value);

  useEffect(
    () => {
      if (value) {
        setText(value);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handledChange = (v: NumberFormatValues) => {
    setText(v.formattedValue);
    onValueChange(v);
  };

  return (
    <PatternFormat
      allowEmptyFormatting={true}
      customInput={StyledTextField}
      disabled={disabled}
      format={format}
      inputProps={{
        autoComplete: 'off',
      }}
      mask={mask}
      onValueChange={handledChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          boxShadow: 'none',
          input: {
            color: !value ? 'info.main' : 'text.primary',
            '&::placeholder': {
              color: 'text.placeholder',
            },
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
        ...sx,
      }}
      value={text}
      {...rest}
    />
  );
};
