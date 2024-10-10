import { FC } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface StyledButtonPropsWithDisabled extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

type StyledButtonProps<
  T extends StyledButtonPropsWithDisabled = StyledButtonPropsWithDisabled,
> = T &
  (T['loading'] extends undefined
    ? { disabled?: boolean }
    : { disabled?: boolean });

export const StyledButton: FC<StyledButtonProps> = ({
  loading = false,
  loadingText,
  disabled,
  onClick,
  sx,
  variant = 'contained',
  children,
  color = 'primary',
  ...rest
}) => {
  return (
    <Button
      color={color}
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        '&.MuiButton-root': {
          fontSize: 16,
          fontWeight: 600,
          lineHeight: 1.5,
          textTransform: 'none',
          borderRadius: 3,
          boxShadow: 'none',
        },
        '&.MuiButton-contained': {
          bgcolor:
            color !== 'primary'
              ? `${color}.main`
              : `${color}.contrastBackground`,
          '&:hover': {
            bgcolor:
              color !== 'primary' ? `${color}.hover` : `${color}.contrastHover`,
          },
          '&.Mui-disabled': {
            bgcolor: 'action.disabled_background',
          },
        },
        '&.MuiButton-outlined': {
          border: '2px solid',
          borderColor:
            color !== 'primary'
              ? `${color}.main`
              : `${color}.contrastBackground`,
          color:
            color !== 'primary'
              ? `${color}.main`
              : `${color}.contrastBackground`,
          '&:hover': {
            bgcolor: `${color}.background`,
            borderColor:
              color !== 'primary' ? `${color}.main` : `${color}.contrastHover`,
          },
          '&.Mui-disabled': {
            borderColor: 'action.disabled',
            color: 'action.disabled',
          },
        },
        '&.MuiButton-text': {
          bgcolor: 'transparent',
          color:
            color !== 'primary'
              ? `${color}.main`
              : `${color}.contrastBackground`,
          '&:hover': {
            bgcolor: 'transparent',
            color:
              color !== 'primary' ? `${color}.hover` : `${color}.contrastHover`,
          },
          '&.Mui-disabled': {
            color: 'action.disabled',
          },
        },
        '&.MuiButton-outlinedInfo, &.MuiButton-textInfo': {
          color: 'text.primary',
        },
        '&.MuiButton-sizeMedium': {
          px: 2.5,
          height: 56,
        },
        '&.MuiButton-sizeSmall': {
          px: 1.5,
          height: 40,
          fontSize: 14,
        },
        ...sx,
      }}
      variant={variant}
      {...rest}
    >
      {loading ? (
        loadingText ? (
          loadingText
        ) : (
          <CircularProgress
            sx={{
              color: 'action.loading',
              m: '0 auto',
              height: '24px !important',
              width: '24px !important',
            }}
          />
        )
      ) : (
        children
      )}
    </Button>
  );
};
