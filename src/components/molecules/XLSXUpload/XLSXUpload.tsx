import { FC, useCallback, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';

import { useTableImportStore } from '@/stores/directoryStores/useTableImportStore';
import { ExcelMergeStrategyProps, HttpError } from '@/types';
import { _startImportExcel } from '@/request';

import { StyledButton } from '@/components/atoms';

export const XLSXUpload: FC<{
  backStep: () => void;
  nextStep?: () => void;
}> = ({ backStep, nextStep }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { columnMappingList, taskId } = useTableImportStore();

  const [mergeStrategy, setMergeStrategy] = useState<
    ExcelMergeStrategyProps | string
  >('');

  const onClickToImport = useCallback(async () => {
    const postData = {
      taskId,
      columnMappingList,
      mergeStrategy: mergeStrategy as ExcelMergeStrategyProps,
    };
    try {
      await _startImportExcel(postData);
      nextStep?.();
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    }
  }, [columnMappingList, enqueueSnackbar, mergeStrategy, nextStep, taskId]);

  return (
    <>
      <Stack>
        <Typography variant={'h7'}>Choose how to handle duplicates</Typography>
        <Typography variant={'body1'}>
          Identical emails will be merged into a single record
        </Typography>
      </Stack>

      <Stack
        alignItems={'center'}
        border={'2px solid'}
        borderColor={
          mergeStrategy === ExcelMergeStrategyProps.overwrite
            ? '#2B52B6'
            : '#D2D6E1'
        }
        borderRadius={2}
        flexDirection={'row'}
        onClick={() => setMergeStrategy(ExcelMergeStrategyProps.overwrite)}
        px={3}
        py={2}
        sx={{
          cursor: 'pointer',
          transition: 'all .3s',
          userSelect: 'none',
        }}
        width={'fit-content'}
      >
        <Typography
          color={
            mergeStrategy === ExcelMergeStrategyProps.overwrite
              ? '#2B52B6'
              : 'text.primary'
          }
          variant={'subtitle2'}
        >
          Overwrite:&nbsp;
        </Typography>
        <Typography
          color={
            mergeStrategy === ExcelMergeStrategyProps.overwrite
              ? '#2B52B6'
              : 'text.primary'
          }
          variant={'body2'}
        >
          Replace all matching columns.
        </Typography>
      </Stack>

      <Stack
        alignItems={'center'}
        border={'2px solid'}
        borderColor={
          mergeStrategy === ExcelMergeStrategyProps.update
            ? '#2B52B6'
            : '#D2D6E1'
        }
        borderRadius={2}
        flexDirection={'row'}
        onClick={() => setMergeStrategy(ExcelMergeStrategyProps.update)}
        px={3}
        py={2}
        sx={{
          cursor: 'pointer',
          transition: 'all .3s',
          userSelect: 'none',
        }}
        width={'fit-content'}
      >
        <Typography
          color={
            mergeStrategy === ExcelMergeStrategyProps.update
              ? '#2B52B6'
              : 'text.primary'
          }
          variant={'subtitle2'}
        >
          Update:&nbsp;
        </Typography>
        <Typography
          color={
            mergeStrategy === ExcelMergeStrategyProps.update
              ? '#2B52B6'
              : 'text.primary'
          }
          variant={'body2'}
        >
          Only update newly added columns.
        </Typography>
      </Stack>

      <Stack flexDirection={'row'} gap={3}>
        <StyledButton
          color={'info'}
          onClick={backStep}
          size={'small'}
          variant={'text'}
        >
          Back
        </StyledButton>
        <StyledButton
          disabled={!mergeStrategy}
          onClick={onClickToImport}
          size={'small'}
        >
          Start import
        </StyledButton>
      </Stack>
    </>
  );
};
