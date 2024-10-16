import { StyledGrid } from '@/components/atoms';
import {
  ellipsisStyle,
  GridPagination,
  GridToolBar,
} from '@/components/molecules';

import { _getGridListById } from '@/request/directory';
import { useDirectoryColumnsStore } from '@/stores';
import { Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { FC, useEffect, useMemo } from 'react';
import useSWR from 'swr';

export const GridDirectory: FC = () => {
  const { metadataColumns, getALlColumns, tableId } = useDirectoryColumnsStore(
    (state) => state,
  );

  const { data: list } = useSWR(
    typeof tableId === 'number' ? [tableId] : null,
    async ([tablId]) => {
      return await _getGridListById(tablId, {});
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
            align: 'center',
          },
          muiTableHeadCellProps: {
            align: 'center',
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
    list?.data?.metadataValues?.records?.map((item) => ({
      [item.columnName]: item.columnValue,
    })) || [];

  console.log(list?.data?.metadataValues?.records);

  useEffect(() => {
    getALlColumns();
  }, []);

  return (
    <Stack gap={1.5}>
      {typeof tableId === 'number' && <GridToolBar tableId={tableId} />}
      <Stack bgcolor={'#fff'} border={'1px solid #ccc'} gap={3}>
        <StyledGrid columns={columns} data={data || []} rowCount={0} />
        <GridPagination currentPage={0} rowCount={10} rowsPerPage={50} />
      </Stack>
    </Stack>
  );
};
