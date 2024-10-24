import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import { useTableImportStore } from '@/stores/directoryStores/useTableImportStore';

import { StyledButton, StyledSelectPopup } from '@/components/atoms';

import { ExcelColumnMappingProps } from '@/types';
import { useGridStore } from '@/stores/directoryStores/useGridStore';

const hasDuplicateId = (arr: ExcelColumnMappingProps[]) => {
  const seenIds = new Set();
  for (const item of arr) {
    if (item.executeColumnId != -1 && seenIds.has(item.executeColumnId)) {
      return true;
    }
    seenIds.add(item.executeColumnId);
  }
  return false;
};

export const XLSXMatchColumn: FC<{
  backStep: () => void;
  nextStep: () => void;
}> = ({ backStep, nextStep }) => {
  const { columnOptions } = useGridStore();
  const {
    fileColumns,
    fileContent,
    columnMappingList,
    setColumnMappingList,
    reset,
  } = useTableImportStore();

  return (
    <>
      <Typography variant={'h7'}>
        Here is a preview of columns that will be imported
      </Typography>
      <Stack
        border={'1px solid #D2D6E1'}
        borderRadius={2}
        maxWidth={1200}
        overflow={'hidden'}
      >
        <Stack
          alignItems={'center'}
          bgcolor={'#F8F9FC'}
          borderBottom={'1px solid #D2D6E1'}
          flexDirection={'row'}
          height={40}
          pl={4}
          width={'100%'}
        >
          <Typography sx={{ flex: 1 }} variant={'subtitle2'}>
            File column
          </Typography>
          <Typography sx={{ flex: 1 }} variant={'subtitle2'}>
            Data field
          </Typography>
        </Stack>
        <Stack bgcolor={'#ffffff'} width={'100%'}>
          {fileColumns.map((column, index) => (
            <Stack
              alignItems={'center'}
              borderBottom={'1px solid #D2D6E1'}
              flexDirection={'row'}
              key={`table-hash-${column.columnLabel}-${index}`}
              pl={4}
              py={1.5}
              sx={{
                '&:last-of-type': {
                  borderBottom: 'none',
                },
              }}
              width={'100%'}
            >
              <Stack flex={1} gap={1}>
                <Typography
                  color={
                    columnMappingList[index].executeColumnId === '-1'
                      ? '#BABCBE'
                      : 'text.primary'
                  }
                  variant={'subtitle2'}
                >
                  {column.columnLabel}
                </Typography>
                {fileContent.map((row, rowIndex) => (
                  <Typography
                    color={'text.secondary'}
                    key={`table-hash-${column.columnLabel}-${index}-${row[column.columnName]}-${rowIndex}`}
                    variant={'body2'}
                  >
                    {row[column.columnName] ? row[column.columnName] : '-'}
                  </Typography>
                ))}
              </Stack>
              <Stack flex={1}>
                <StyledSelectPopup
                  id={`match-select-column-${index}`}
                  onChange={(e: any) => {
                    const list = JSON.parse(JSON.stringify(columnMappingList));
                    list[index].executeColumnId = e.target.value;
                    setColumnMappingList(list);
                  }}
                  options={columnOptions}
                  sx={{ flex: 1, maxWidth: 300 }}
                  value={columnMappingList[index].executeColumnId}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack flexDirection={'row'} gap={3}>
        <StyledButton
          color={'info'}
          onClick={() => {
            backStep();
            reset();
          }}
          size={'small'}
          variant={'text'}
        >
          Back
        </StyledButton>
        <StyledButton
          disabled={
            columnMappingList.some((item) => !item.executeColumnId) ||
            hasDuplicateId(columnMappingList)
          }
          onClick={nextStep}
          size={'small'}
        >
          Continue
        </StyledButton>
      </Stack>
    </>
  );
};
