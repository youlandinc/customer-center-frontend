import { Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import { format } from 'date-fns';

import { ellipsisStyle, GridPagination } from '@/components/molecules';
import { _fetchSegmentsList } from '@/request/segments';

import { StyledGrid } from '@/components/atoms';

export const GridSegments = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 50,
  });

  const { data, isLoading } = useSWR('GridSegments', _fetchSegmentsList);
  const pageCount = data?.data?.pages || 0;
  const total = data?.data?.total || 0;

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    return [
      {
        accessorKey: 'segmentName',
        header: 'Segment name',
        grow: true,
        muiTableBodyCellProps: {
          align: 'left',
        },
        muiTableHeadCellProps: {
          align: 'left',
        },
        enableHiding: true,
        Cell: ({ renderedCellValue }) => {
          return (
            <Typography
              fontSize={14}
              sx={{
                ...ellipsisStyle,
                width: '100%',
                textDecoration: 'underline',
              }}
            >
              {renderedCellValue}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'lastEdit',
        header: 'Last edit',
        grow: true,
        muiTableBodyCellProps: {
          align: 'left',
        },
        muiTableHeadCellProps: {
          align: 'left',
        },
        enableHiding: true,
        Cell: ({ renderedCellValue }) => {
          return (
            <Typography
              fontSize={14}
              sx={{
                ...ellipsisStyle,
                width: '100%',
              }}
            >
              {format(
                new Date(renderedCellValue as string),
                'LLL d, yyyy, h:m aa',
              )}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'action',
        header: '',
        grow: false,
        size: 60,
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        enableHiding: true,
        Cell: ({ renderedCellValue }) => {
          return (
            <Typography
              fontSize={14}
              sx={{
                ...ellipsisStyle,
                width: '100%',
              }}
            >
              {renderedCellValue}
            </Typography>
          );
        },
      },
    ];
  }, []);

  return (
    <Stack bgcolor={'#fff'} border={'1px solid #ccc'} borderRadius={2} gap={3}>
      <StyledGrid
        columns={columns}
        data={data?.data?.records || []}
        enableColumnResizing={false}
        getRowId={(row) => row.segmentId}
        loading={isLoading}
        muiTableHeadSx={{
          '& .MuiTableCell-stickyHeader:not(.MuiTableCell-stickyHeader:last-of-type)::after':
            {
              content: "''",
              position: 'absolute',
              right: 0,
              top: 10,
              width: 2,
              bgcolor: '#D2D6E1',
              height: 20,
            },
        }}
        style={{
          borderBottom: '1px solid #ccc',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      />
      <GridPagination
        currentPage={pagination.page}
        onPageChange={(page) => {
          setPagination({ ...pagination, page });
        }}
        onRowsPerPageChange={(e) => {
          setPagination({ ...pagination, size: parseInt(e.target.value) });
        }}
        pageCount={pageCount}
        rowCount={total}
        rowsPerPage={pagination.size}
      />
    </Stack>
  );
};
