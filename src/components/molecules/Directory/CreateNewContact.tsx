import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';
import { ColumnTypeEnum } from '@/types';
import { FC, useState } from 'react';
import { Drawer, Icon, Stack, Typography } from '@mui/material';

import {
  StyledButton,
  StyledGoogleAutoComplete,
  StyledTextField,
} from '@/components/atoms';
import { useSwitch } from '@/hooks';

import UserIcon from './assets/icon_user.svg';

type RenderInputByTypeProps = {
  type: ColumnTypeEnum;
  label: string;
  name: string;

  handleChange: (key: string, value: unknown) => void;
  value: string;
};

export const RenderInputByType: FC<RenderInputByTypeProps> = ({
  type,
  label,
  name,
  handleChange,
  value,
}) => {
  switch (type) {
    case ColumnTypeEnum.text:
      return (
        <StyledTextField
          label={label}
          onChange={(e) => {
            handleChange(name, e.target.value);
          }}
          value={value}
        />
      );
    case ColumnTypeEnum.address:
      return (
        <StyledGoogleAutoComplete
          address={{
            formatAddress: value,
            reset: () => {
              handleChange(name, '');
            },
            changeFieldValue: (key, value) => {
              handleChange(name, value);
            },
          }}
          fullAddress={false}
        />
      );
    default:
      return <StyledTextField />;
  }
};

export const CreateNewContact: FC = () => {
  const { metadataColumns } = useGridColumnsStore((state) => state);
  const { visible, open, close } = useSwitch();

  return (
    <>
      {metadataColumns.length && (
        <StyledButton
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
      )}
      <Drawer
        anchor={'right'}
        onClose={close}
        open={visible}
        PaperProps={{ sx: { px: 3, py: 6, minWidth: 465 } }}
      >
        <Stack gap={3} height={'100%'} padding={3}>
          <Typography variant={'subtitle1'}>Create a contact</Typography>
          <Stack component={'form'} flex={1} gap={3} overflow={'auto'}>
            {metadataColumns.map((item, index) => (
              <StyledTextField key={index} label={item.columnLabel} />
            ))}
          </Stack>
          <Stack direction={'row'} gap={6} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              size={'small'}
              sx={{ width: 208 }}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton size={'small'} sx={{ width: 208 }}>
              Add contact
            </StyledButton>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};
