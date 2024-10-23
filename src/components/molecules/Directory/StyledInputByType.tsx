import { FC, PropsWithChildren, ReactNode } from 'react';
import { Icon, Stack, Typography } from '@mui/material';

import { ColumnTypeEnum } from '@/types';

import {
  StyledGoogleAutoComplete,
  StyledTextField,
  StyledTextFieldNumber,
  StyledTextFieldPhone,
  StyledTextFieldProps,
} from '@/components/atoms';

import ICON_NOTIFICATION_ERROR from './assets/icon_validate_error.svg';

type StyledInputByTypeProps = {
  type: ColumnTypeEnum;
  label?: string;
  name: string;
  required?: boolean;
  handleChange?: (key: string, value: unknown) => void;
  value: unknown;
  errorMessage?: ReactNode;
  isValidate?: boolean;
  errorSlot?: ReactNode;
} & StyledTextFieldProps;

type StyledErrorProps = {
  type: ColumnTypeEnum;
  message?: ReactNode;
  slot?: ReactNode;
};

const StyledError: FC<StyledErrorProps> = ({ type, message, slot }) => {
  switch (type) {
    case ColumnTypeEnum.email:
      return (
        <Stack bgcolor={'#F6EBE8'} borderRadius={2} gap={0.5} px={2} py={1.5}>
          <Stack
            flexDirection={'row'}
            gap={1}
            maxWidth={528}
            minWidth={303}
            width={'100%'}
          >
            <Icon component={ICON_NOTIFICATION_ERROR} sx={{ flexShrink: 0 }} />
            <Typography
              color={'error'}
              flex={1}
              sx={{ mt: 0.25, wordBreak: 'break-all' }}
              variant={'subtitle2'}
            >
              {message}
            </Typography>
          </Stack>
          {slot}
        </Stack>
      );
  }
};

const WrapInputError: FC<
  PropsWithChildren<
    Pick<StyledInputByTypeProps, 'type' | 'errorMessage' | 'isValidate'> &
      Pick<StyledErrorProps, 'slot'>
  >
> = ({ type, errorMessage, isValidate, children, slot }) => {
  return (
    <Stack gap={1}>
      {children}
      {isValidate && errorMessage && (
        <StyledError message={errorMessage} slot={slot} type={type} />
      )}
    </Stack>
  );
};

export const StyledInputByType: FC<StyledInputByTypeProps> = ({
  type,
  label,
  name,
  handleChange,
  required,
  value,
  errorMessage,
  isValidate,
  errorSlot,
  size,
  sx,
  onBlur,
}) => {
  switch (type) {
    case ColumnTypeEnum.text:
    case ColumnTypeEnum.email:
      return (
        <WrapInputError
          errorMessage={errorMessage}
          isValidate={isValidate}
          slot={errorSlot}
          type={type}
        >
          <StyledTextField
            error={!!errorMessage}
            label={label}
            onBlur={onBlur}
            onChange={(e) => {
              handleChange?.(name, e.target.value);
            }}
            required={required}
            size={size}
            sx={sx}
            type={type.toLocaleLowerCase()}
            value={value}
          />
        </WrapInputError>
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
          label={label}
          required={required}
          size={size}
          sx={sx}
        />
      );
    case ColumnTypeEnum.number:
      return (
        <StyledTextFieldNumber
          label={label}
          onBlur={onBlur}
          onValueChange={(values) => {
            handleChange?.(name, values.floatValue);
          }}
          size={size}
          sx={sx}
          value={value as any}
        />
      );
    case ColumnTypeEnum.phone:
      return (
        <StyledTextFieldPhone
          label={label}
          onBlur={onBlur}
          onValueChange={(values) => {
            handleChange?.(name, values.floatValue);
          }}
          size={size}
          sx={sx}
          value={value as any}
        />
      );
    default:
      return (
        <StyledTextField
          label={label}
          onBlur={onBlur}
          onChange={(e) => {
            handleChange?.(name, e.target.value);
          }}
          size={size}
          sx={sx}
          value={value}
        />
      );
  }
};
