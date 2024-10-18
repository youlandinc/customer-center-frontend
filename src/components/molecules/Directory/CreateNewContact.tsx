import { DrawerNewContact } from '@/components/molecules/Directory/DrawerNewContact';
import { AUTO_HIDE_DURATION } from '@/constant';
import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';
import { enqueueSnackbar } from 'notistack';
import { FC, useRef, useState } from 'react';
import { Drawer, Icon, Stack, Typography } from '@mui/material';
import { useAsyncFn } from 'react-use';

import { StyledButton } from '@/components/atoms';
import { StyledInputByType } from '@/components/molecules/Directory/StyledInputByType';
import { useDebounceFn, useSwitch } from '@/hooks';

import { AddContactRequestParam, HttpError, ValidateColumnData } from '@/types';
import { _addNewContact, _validateColumnData } from '@/request/directory';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

import UserIcon from './assets/icon_user.svg';

export const CreateNewContact: FC = () => {
  const { metadataColumns, tableId } = useGridColumnsStore((state) => state);
  const setNewContact = useGridNewContactStore((state) => state.setNewContact);
  const { visible, open, close } = useSwitch();
  const [formData, setFormData] = useState({} as Record<string, any>);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    visible: continueShow,
    open: continueOpen,
    close: continueClose,
  } = useSwitch();

  const handleClose = () => {
    close();
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
    <>
      <StyledButton
        disabled={!metadataColumns.length}
        onClick={open}
        size={'small'}
        sx={{ px: 1.5, height: 'auto !important', py: '6px' }}
        variant={'text'}
      >
        <Stack alignItems={'center'} direction={'row'} gap={'6px'}>
          <Icon component={UserIcon} sx={{ width: 24, height: 24 }} />
          <Typography color={'text.primary'} variant={'body2'}>
            Create a contact
          </Typography>
        </Stack>
      </StyledButton>
      <DrawerNewContact onClose={close} open={visible} />
    </>
  );
};
