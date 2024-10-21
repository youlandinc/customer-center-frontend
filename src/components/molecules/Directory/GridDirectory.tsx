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
  GridNoData,
  GridPagination,
  GridToolBar,
} from '@/components/molecules';

import { AUTO_HIDE_DURATION } from '@/constant';
import { HttpError } from '@/types';
import {
  _deleteGridRecords,
  _exportGridRecords,
  _getGridListById,
} from '@/request';
import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';
import { useGridStore } from '@/stores/directoryStores/useGridStore';
import { useGridQueryConditionStore } from '@/stores/directoryStores/useGridQueryConditionStore';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

export const GridDirectory: FC = () => {
  const { metadataColumns, fetchAllColumns, tableId, loading } =
    useGridColumnsStore((state) => state);
  const { keyword } = useGridQueryConditionStore((state) => state);
  const newContact = useGridNewContactStore((state) => state.data);
  const { totalRecords, setTotalRecords } = useGridStore((state) => state);

  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    page: 0,
    size: 50,
  });

  const {
    data: list,
    isLoading,
    mutate,
  } = useSWR(
    typeof tableId === 'number'
      ? [
          tableId,
          {
            page: pagination.page + 1,
            size: pagination.size,
            searchFilter: {
              keyword,
            },
          },
          metadataColumns,
          { ...newContact },
        ]
      : null,
    async ([tableId, queryCondition]) => {
      return await _getGridListById(tableId, queryCondition).then((res) => {
        setTotalRecords(res.data.totalRecords);
        return res;
      });
    },
    {},
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
      ? (metadataColumns
          .filter((item) => item.columnName !== 'id')
          .filter((item) => item.active)
          .map((item) => ({
            accessorKey: item.columnName || ' ',
            header: item.columnLabel,
            size: 150,
            minSize: 100,
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
  const pageCount = list?.data?.metadataValues?.pages;

  const actionsCardShow = Object.keys(rowSelection).length > 0;
  const rowSelectionIds = Object.entries(rowSelection).map((item) => item[0]);

  useEffect(() => {
    fetchAllColumns();
  }, []);

  if (!totalRecords) {
    return <GridNoData />;
  }

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
            //TODO
            onRowClick={() => {
              return;
            }}
            onRowSelectionChange={setRowSelection}
            rowCount={0}
            rowSelection={rowSelection}
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
            rowCount={totalContacts}
            rowsPerPage={pagination.size}
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
