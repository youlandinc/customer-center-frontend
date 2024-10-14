import { FC } from 'react';
import {
  Pagination,
  Stack,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';

type GridPaginationProps = {
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  sx,
  rowsPerPage,
}) => {
  return (
    <Stack alignItems={'center'} direction={'row'} spacing={6}>
      <TablePagination
        component={'div'}
        count={rowCount}
        onPageChange={() => {
          return;
        }}
        onRowsPerPageChange={onRowsPerPageChange}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[50, 100]}
        slotProps={{
          actions: {
            previousButton: {
              sx: { display: 'none' },
            },
            nextButton: {
              sx: { display: 'none' },
            },
          },
        }}
        sx={{
          // '& .MuiTablePagination-selectLabel,& .MuiTablePagination-displayedRows':
          //   {
          //     fontSize: {
          //       xs: '14px !important',
          //       lg: '16px !important',
          //     },
          //   },
          color: 'text.secondary',
          '& .MuiTablePagination-input': {
            fontSize: 12,
            ml: 0,
          },
        }}
      />

      <Pagination
        count={pageCount}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => {
          onPageChange?.(value - 1);
        }}
        page={currentPage + 1}
        shape="circular"
        siblingCount={0}
        sx={{
          fontSize: 14,
          '& .MuiPaginationItem-previousNext': {
            color: 'text.primary',
          },
          '& .Mui-disabled svg path': {
            fill: '#cdcdcd',
            '& svg path': {
              fill: 'background.disabled',
            },
          },
        }}
        variant="text"
      />
    </Stack>
  );
};
