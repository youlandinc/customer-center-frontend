import { StyledGoogleAutoComplete, StyledTextField } from '@/components/atoms';
import { ColumnTypeEnum } from '@/types';
import { FC } from 'react';

type StyledInputByTypeProps = {
  type: ColumnTypeEnum;
  label: string;
  name: string;
  required?: boolean;
  handleChange?: (key: string, value: unknown) => void;
  value: unknown;
};

export const StyledInputByType: FC<StyledInputByTypeProps> = ({
  type,
  label,
  name,
  handleChange,
  required,
  value,
}) => {
  switch (type) {
    case ColumnTypeEnum.text:
    case ColumnTypeEnum.email:
      return (
        <StyledTextField
          label={label}
          onChange={(e) => {
            handleChange?.(name, e.target.value);
          }}
          required={required}
          type={type.toLocaleLowerCase()}
          value={value}
        />
      );
    case ColumnTypeEnum.address:
      return (
        <StyledGoogleAutoComplete
          address={{
            formatAddress: value as string,
            reset: () => {
              handleChange?.(name, '');
            },
            changeFieldValue: (key, value) => {
              handleChange?.(name, value);
            },
          }}
          fullAddress={false}
          required={required}
        />
      );
    default:
      return (
        <StyledTextField
          label={label}
          onChange={(e) => {
            handleChange?.(name, e.target.value);
          }}
          value={value}
        />
      );
  }
};
