import { AUTO_HIDE_DURATION } from '@/constant';
import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';
import { HttpError } from '@/types';
import { Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { enqueueSnackbar } from 'notistack';
import { FC, useEffect, useMemo, useState } from 'react';
import { useAsyncFn } from 'react-use';
import useSWR from 'swr';

import { StyledGrid } from '@/components/atoms';
import {
  ellipsisStyle,
  GridActionsCard,
  GridPagination,
  GridToolBar,
} from '@/components/molecules';

import {
  _deleteGridRecords,
  _exportGridRecords,
  _getGridListById,
} from '@/request';
import { useGridQueryConditionStore } from '@/stores/directoryStores/useGridQueryConditionStore';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

export const GridDirectory: FC = () => {
  const { metadataColumns, fetchAllColumns, tableId, loading } =
    useGridColumnsStore((state) => state);
  const { keyword } = useGridQueryConditionStore((state) => state);
  const newContact = useGridNewContactStore((state) => state.data);
  const [rowSelection, setRowSelection] = useState({});

  const {
    data: list,
    isLoading,
    mutate,
  } = useSWR(
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

  const [deleteState, deleteGridRecords] = useAsyncFn(
    async (recordIds: string[]) => {
      try {
        await _deleteGridRecords({
          tableId: tableId as number,
          recordIds,
        });
        await mutate();
        setRowSelection({});
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
    [tableId],
  );

  const [exportState, exportGridRecords] = useAsyncFn(
    async (recordIds: string[]) => {
      try {
        await _exportGridRecords(recordIds);
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
    [],
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
  const page = list?.data?.metadataValues?.current || 1;
  const pageCount = list?.data?.metadataValues?.pages;

  const actionsCardShow = Object.keys(rowSelection).length > 0;
  const rowSelectionIds = Object.entries(rowSelection).map((item) => item[0]);

  useEffect(() => {
    fetchAllColumns();
  }, []);

  return (
    <>
      <Stack gap={1.5}>
        <GridToolBar totalContacts={totalContacts} />
        <Stack bgcolor={'#fff'} border={'1px solid #ccc'} gap={3}>
          <StyledGrid
            columns={columns}
            data={data || []}
            getRowId={(row) => row.id}
            loading={isLoading || loading}
            onRowSelectionChange={setRowSelection}
            rowCount={0}
            rowSelection={rowSelection}
          />
          <GridPagination
            currentPage={0}
            pageCount={pageCount}
            rowCount={totalContacts}
            rowsPerPage={50}
          />
        </Stack>
      </Stack>
      <GridActionsCard
        deleteLoading={deleteState.loading}
        exportLoading={exportState.loading}
        handleDelete={async () => {
          await deleteGridRecords(rowSelectionIds);
        }}
        handleExport={async () => {
          await exportGridRecords(rowSelectionIds);
        }}
        open={actionsCardShow}
      />
    </>
  );
};
