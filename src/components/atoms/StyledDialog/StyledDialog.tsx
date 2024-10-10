import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material';

export interface StyledDialogProps
  extends Omit<DialogProps, 'maxWidth' | 'content' | 'header' | 'footer'> {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

export const StyledDialog: FC<StyledDialogProps> = ({
  header,
  content,
  footer,
  sx,
  open,
  ...rest
}) => {
  return (
    <Dialog
      fullWidth={true}
      open={open}
      sx={{
        '&.MuiDialog-root': {
          '& .MuiDialog-paper': {
            width: {
              xl: 'calc(100% - 64px)',
              xs: 'calc(100% - 48px)',
            },
            mx: 3,
          },
          '& .MuiPaper-root': {
            borderRadius: 2,
            maxWidth: {
              xl: 600,
              xs: '100%',
            },
            boxShadow:
              'box-shadow: 0px 10px 10px 0px rgba(17, 52, 227, 0.10), 0px 0px 2px 0px rgba(17, 52, 227, 0.10)',
          },
        },
        ...sx,
      }}
      {...rest}
    >
      {header && (
        <DialogTitle
          component={'div'}
          sx={{
            px: 3,
            pt: 3,
            pb: content || footer ? 0 : 3,
            fontWeight: 600,
            fontSize: 18,
            color: 'text.primary',
          }}
        >
          {header}
        </DialogTitle>
      )}
      {content && (
        <DialogContent
          sx={{
            px: 3,
            pt: header ? 0 : 3,
            pb: footer ? 0 : 3,
          }}
        >
          {content}
        </DialogContent>
      )}
      {footer && (
        <DialogActions
          sx={{
            textAlign: 'right',
            px: '24px !important',
            pb: '24px !important',
            pt: content || header ? 0 : 3,
          }}
        >
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
};
