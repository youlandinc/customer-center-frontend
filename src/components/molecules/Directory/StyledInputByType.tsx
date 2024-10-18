import { Box, Icon, Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';

import { StyledGoogleAutoComplete, StyledTextField } from '@/components/atoms';

import { ColumnTypeEnum } from '@/types';

import NOTIFICATION_ERROR from './assets/icon_validate_error.svg';

type StyledInputByTypeProps = {
  type: ColumnTypeEnum;
  label: string;
  name: string;
  required?: boolean;
  handleChange?: (key: string, value: unknown) => void;
  value: unknown;
  errorMessage?: ReactNode;
  isValidate?: boolean;
};

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
            <Icon component={NOTIFICATION_ERROR} sx={{ flexShrink: 0 }} />
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
}) => {
  switch (type) {
    case ColumnTypeEnum.text:
    case ColumnTypeEnum.email:
      return (
        <WrapInputError
          errorMessage={errorMessage}
          isValidate={isValidate}
          slot={
            <Box
              color={'action.active'}
              component={'a'}
              fontSize={12}
              ml={'auto'}
              onClick={() => {
                return;
              }}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              See the contact
            </Box>
          }
          type={type}
        >
          <StyledTextField
            error={!!errorMessage}
            label={label}
            onChange={(e) => {
              handleChange?.(name, e.target.value);
            }}
            required={required}
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
