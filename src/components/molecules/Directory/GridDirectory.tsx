import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';
import { Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { FC, useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { StyledGrid } from '@/components/atoms';
import {
  ellipsisStyle,
  GridPagination,
  GridToolBar,
} from '@/components/molecules';

import { _getGridListById } from '@/request';
import { useGridQueryConditionStore } from '@/stores/directoryStores/useGridQueryConditionStore';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

export const GridDirectory: FC = () => {
  const { metadataColumns, fetchAllColumns, tableId, loading } =
    useGridColumnsStore((state) => state);
  const { keyword } = useGridQueryConditionStore((state) => state);
  const newContact = useGridNewContactStore((state) => state.data);

  const { data: list, isLoading } = useSWR(
    typeof tableId === 'number'
      ? [
          tableId,
          {
            page: 1,
            size: 50,
            searchFilter: {
              keyword,
            },
          },
          metadataColumns,
          { ...newContact },
        ]
      : null,
    async ([tableId, queryCondition]) => {
      return await _getGridListById(tableId, queryCondition);
    },
  );

  const columns = useMemo(() => {
    return metadataColumns.length
      ? (metadataColumns.map((item) => ({
          accessorKey: item.columnName,
          header: item.columnLabel,
          size: 150,
          minSize: 100,
          muiTableBodyCellProps: {
            align: 'left',
          },
          muiTableHeadCellProps: {
            align: 'left',
          },
          Cell: ({ renderedCellValue }) => {
            return (
              <Typography
                fontSize={12}
                sx={{
                  ...ellipsisStyle,
                  width: '100%',
                }}
              >
                {renderedCellValue}
              </Typography>
            );
          },
        })) as MRT_ColumnDef<any>[])
      : [];
  }, [metadataColumns]);

  const data =
    list?.data?.metadataValues?.records?.map((item) => {
      return item.reduce(
        (pre, cur) => {
          pre[cur.columnName] = cur.columnValue;
          return pre;
        },
        {} as Record<string, any>,
      );
    }) || [];
  const totalContacts = list?.data?.metadataValues?.total || 0;

  useEffect(() => {
    fetchAllColumns();
  }, []);

  return (
    <Stack gap={1.5}>
      <GridToolBar totalContacts={totalContacts} />
      <Stack bgcolor={'#fff'} border={'1px solid #ccc'} gap={3}>
        <StyledGrid
          columns={columns}
          data={data || []}
          loading={isLoading || loading}
          rowCount={0}
        />
        <GridPagination currentPage={0} rowCount={10} rowsPerPage={50} />
      </Stack>
    </Stack>
  );
};
