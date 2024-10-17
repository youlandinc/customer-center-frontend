import { AUTO_HIDE_DURATION } from '@/constant';
import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';
import { enqueueSnackbar } from 'notistack';
import { FC, useRef, useState } from 'react';
import { Drawer, Icon, Stack, Typography } from '@mui/material';
import { useAsyncFn } from 'react-use';

import { StyledButton } from '@/components/atoms';
import { StyledInputByType } from '@/components/molecules/Directory/StyledInputByType';
import { useSwitch } from '@/hooks';

import { AddContactRequestParam, HttpError } from '@/types';
import { _addNewContact } from '@/request/directory';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

import UserIcon from './assets/icon_user.svg';

export const CreateNewContact: FC = () => {
  const { metadataColumns, tableId } = useGridColumnsStore((state) => state);
  const setNewContact = useGridNewContactStore((state) => state.setNewContact);
  const { visible, open, close } = useSwitch();
  const [formData, setFormData] = useState({} as Record<string, any>);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    close();
    setFormData({});
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
      <Drawer
        anchor={'right'}
        onClose={handleClose}
        open={visible}
        PaperProps={{ sx: { px: 3, py: 6, minWidth: 465 } }}
      >
        <Stack gap={3} height={'100%'} padding={3}>
          <Typography variant={'subtitle1'}>Create a contact</Typography>
          <Stack
            autoComplete={'off'}
            component={'form'}
            flex={1}
            gap={3}
            overflow={'auto'}
            ref={formRef}
          >
            {metadataColumns.map((item) => (
              <StyledInputByType
                handleChange={(key, value) => {
                  setFormData((prev) => ({ ...prev, [key]: value }));
                }}
                key={`${item.columnName}|${item.columnId}`}
                label={item.columnLabel}
                name={`${item.columnName}|${item.columnId}`}
                required={item.notNull}
                type={item.columnType}
                value={formData[`${item.columnName}|${item.columnId}`] ?? ''}
              />
            ))}
          </Stack>
          <Stack direction={'row'} gap={6} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={handleClose}
              size={'small'}
              sx={{ width: 208 }}
              variant={'text'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              loading={state.loading}
              onClick={handleAddContact}
              size={'small'}
              sx={{ width: 208 }}
            >
              Add contact
            </StyledButton>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};
