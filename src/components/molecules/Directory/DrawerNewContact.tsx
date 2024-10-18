import { Drawer, DrawerProps, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { FC, useRef, useState } from 'react';
import { useAsyncFn } from 'react-use';

import { StyledButton } from '@/components/atoms';
import { StyledInputByType } from '@/components/molecules/Directory/StyledInputByType';
import { AUTO_HIDE_DURATION } from '@/constant';
import { useDebounceFn, useSwitch } from '@/hooks';
import { _addNewContact, _validateColumnData } from '@/request/directory';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';
import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';

import { AddContactRequestParam, HttpError, ValidateColumnData } from '@/types';

type DrawerNewContactProps = DrawerProps & { onClose?: () => void };

export const DrawerNewContact: FC<DrawerNewContactProps> = ({
  open,
  onClose,
}) => {
  const { metadataColumns, tableId } = useGridColumnsStore((state) => state);
  const setNewContact = useGridNewContactStore((state) => state.setNewContact);
  const [formData, setFormData] = useState({} as Record<string, any>);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    visible: continueShow,
    open: continueOpen,
    close: continueClose,
  } = useSwitch();

  const handleClose = () => {
    onClose?.();
    setFormData({});
    continueClose();
  };

  const [state, addNewContact] = useAsyncFn(
    async (param: AddContactRequestParam) => {
      try {
        await _addNewContact(param);
        handleClose();
        setNewContact(formData);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      }
    },
    [formData],
  );

  const [validateState, validateColumnData] = useAsyncFn(
    async (param: Omit<ValidateColumnData, 'tableId'>) => {
      try {
        const res = await _validateColumnData({
          tableId: tableId as number,
          ...param,
        });
        if (res.data?.variant === 'error') {
          const key = `${param.columnName}|${param.columnId}`;
          setFormData((prev) => ({
            ...prev,
            [key]: {
              value: param.columnValue,
              errorMessage: res.data?.errorMessage,
            },
          }));
        }
        return res;
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      }
    },
    [tableId],
  );

  const [, , validateDebounce] = useDebounceFn(validateColumnData, 400);

  const handleAddContact = async () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }
    const record = Object.entries(formData).map(([key, value]) => {
      const [columnName, columnId] = key.split('|');
      return {
        columnName,
        columnId: Number(columnId),
        columnValue: value,
      };
    });
    await addNewContact({ tableId: tableId as number, record: record });
  };

  return (
    <Drawer
      anchor={'right'}
      open={open}
      PaperProps={{ sx: { px: 3, py: 6, maxWidth: 560 } }}
    >
      <Stack gap={3} height={'100%'} padding={3}>
        <Typography variant={'subtitle1'}>
          {continueShow
            ? 'You are going to end the process'
            : 'Create a contact'}
        </Typography>
        {continueShow ? (
          <Typography flex={1} variant={'body2'}>
            By closing this modal, you will lose all the information you
            previously filled.
          </Typography>
        ) : (
          <Stack
            autoComplete={'off'}
            component={'form'}
            flex={1}
            gap={3}
            overflow={'auto'}
            ref={formRef}
          >
            {metadataColumns.map((item) => {
              const key = `${item.columnName}|${item.columnId}`;
              return (
                <StyledInputByType
                  errorMessage={formData[key]?.errorMessage}
                  handleChange={(key, value) => {
                    if (item.unique) {
                      validateDebounce({
                        columnId: item.columnId,
                        columnName: item.columnName,
                        columnValue: value,
                      });
                    }
                    setFormData((prev) => ({
                      ...prev,
                      [key]: {
                        value,
                      },
                    }));
                  }}
                  isValidate={item.unique}
                  key={key}
                  label={item.columnLabel}
                  name={key}
                  required={item.notNull}
                  type={item.columnType}
                  value={formData[key]?.value ?? ''}
                />
              );
            })}
          </Stack>
        )}
        <Stack direction={'row'} gap={6} justifyContent={'center'}>
          <StyledButton
            color={'info'}
            onClick={() => {
              return continueShow ? continueClose() : continueOpen();
            }}
            size={'small'}
            sx={{ width: 208 }}
            variant={'text'}
          >
            {continueShow ? 'Continue editing' : 'Cancel'}
          </StyledButton>
          <StyledButton
            color={continueShow ? 'error' : 'primary'}
            loading={state.loading}
            onClick={() => {
              return continueShow ? handleClose() : handleAddContact();
            }}
            size={'small'}
            sx={{ width: 208 }}
          >
            {continueShow ? 'Close' : 'Add contact'}
          </StyledButton>
        </Stack>
      </Stack>
    </Drawer>
  );
};
