import { ChangeEvent, FC } from 'react';
import {
  Pagination,
  Stack,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';

type GridPaginationProps = {
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
  pageCount?: number;
  rowCount: number;
  sx?: SxProps;
} & Pick<TablePaginationProps, 'onRowsPerPageChange' | 'rowsPerPage'>;

export const GridPagination: FC<GridPaginationProps> = ({
  onPageChange,
  onRowsPerPageChange,
  currentPage,
  pageCount,
  rowCount,
  rowsPerPage,
}) => {
  return (
    <Stack
      alignItems={'center'}
      flexDirection={'row'}
      gap={6}
      justifyContent={'flex-end'}
    >
      <TablePagination
        component={'div'}
        count={rowCount}
        onPageChange={() => {
          return;
        }}
        onRowsPerPageChange={onRowsPerPageChange}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[100, 200]}
        slotProps={{
          actions: {
            previousButton: {
              sx: { display: 'none' },
            },
            nextButton: {
              sx: { display: 'none' },
            },
          },
          select: {
            MenuProps: {
              MenuListProps: {
                sx: {
                  p: 0,
                  '& .MuiMenuItem-root': { fontSize: 12 },
                },
              },
            },
          },
        }}
        sx={{
          color: 'text.secondary',
          '& .MuiTablePagination-selectLabel': {
            fontSize: 12,
          },
          '& .MuiSelect-select': {
            fontSize: 12,
            padding: 0,
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: 12,
          },
          '& .MuiInputBase-root': {
            ml: 0,
            mr: 3,
          },
          '& .MuiList-root': {
            p: 0,
          },
        }}
      />

      <Pagination
        count={pageCount}
        onChange={(event: ChangeEvent<unknown>, value: number) => {
          onPageChange?.(value - 1);
        }}
        page={currentPage + 1}
        shape="circular"
        siblingCount={0}
        sx={{
          fontSize: 16,
          '& .MuiPaginationItem-previousNext': {
            color: 'text.primary',
          },
          '& .Mui-disabled svg path': {
            fill: '#cdcdcd',
            '& svg path': {
              fill: 'background.disabled',
            },
          },
          '& .Mui-selected': {
            bgcolor: '#F5F5F5 ',
          },
        }}
        variant="text"
      />
    </Stack>
  );
};
