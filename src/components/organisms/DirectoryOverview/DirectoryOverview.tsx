import { AUTO_HIDE_DURATION } from '@/constant';
import { HttpError, RecordItem } from '@/types';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { FC, useRef, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

import { StyledButton } from '@/components/atoms';
import { StyledInputByType } from '@/components/molecules/Directory/StyledInputByType';

import { _fetchContactDetail, _updateContact } from '@/request';

type DirectoryOverviewProps = {
  tableId: number;
  id: string;
};

export const DirectoryOverview: FC<DirectoryOverviewProps> = ({
  tableId,
  id,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState({} as Record<string, any>);
  const formRef = useRef<HTMLFormElement>(null);

  const { value } = useAsync(async () => {
    if (tableId && id) {
      return await _fetchContactDetail(tableId, id).then((res) => {
        if (Array.isArray(res.data?.metadataValues)) {
          const data = res.data.metadataValues.reduce(
            (acc, item) => {
              const key = `${item.columnName}|${item.columnId}`;
              acc[key] = {
                value: item.columnValue,
              };
              return acc;
            },
            {} as Record<string, any>,
          );
          setFormData(data);
        }
        return res;
      });
    }
  }, [tableId, id]);

  const [, updateContact] = useAsyncFn(
    async (record: RecordItem[]) => {
      try {
        await _updateContact({
          tableId,
          recordId: id,
          record,
        });
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
    [tableId, id],
  );

  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Typography variant={'h6'}>
          {value?.data?.metadataValues?.find(
            (item) => item.columnName === 'name',
          )?.columnValue || ''}
        </Typography>
        <StyledButton
          color={'info'}
          onClick={() => {
            router.push('/contacts/directory');
          }}
          size={'small'}
          sx={{
            px: 1.5,
            py: 1,
            fontSize: 14,
            fontWeight: '400 !important',
            borderRadius: '4px !important',
            borderWidth: '1px !important',
            mr: 10,
          }}
          variant={'outlined'}
        >
          Back to lists
        </StyledButton>
      </Stack>
      <Stack flexDirection={'row'}>
        <Stack
          autoComplete={'off'}
          border={'1px solid '}
          borderColor={'border.normal'}
          borderRadius={2}
          component={'form'}
          flex={1}
          gap={2}
          overflow={'auto'}
          p={3}
          ref={formRef}
        >
          {value?.data?.metadataColumns.map((item) => {
            const key = `${item.columnName}|${item.columnId}`;
            return (
              <Stack key={key}>
                <Typography color={'info'} variant={'body2'}>
                  {item.columnLabel}
                </Typography>
                <StyledInputByType
                  handleChange={(key, value) => {
                    setFormData((prev) => ({
                      ...prev,
                      [key]: {
                        value,
                      },
                    }));
                  }}
                  isValidate={item.unique}
                  name={key}
                  onBlur={async () => {
                    await updateContact(
                      Object.entries(formData).map(([key, value]) => ({
                        columnId: parseInt(key.split('|')[1]),
                        columnName: key.split('|')[0],
                        columnValue: value.value,
                      })),
                    );
                  }}
                  required={item.notNull}
                  size={'small'}
                  sx={{
                    '& fieldset': { border: 'none' },
                    '& input': { fontSize: 14, fontWeight: 600, py: 0, px: 0 },
                    '& input:hover': { bgcolor: 'background.faq' },
                    '& .MuiInputBase-root': {
                      p: '0px !important',
                      '& input': { p: '0px !important' },
                    },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                      border: 'none',
                    },
                  }}
                  type={item.columnType}
                  value={formData[key]?.value ?? ''}
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
