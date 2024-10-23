import { FC, useEffect, useMemo, useState } from 'react';
import { Box, Fade, Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { useRouter } from 'next/navigation';
import { useAsyncFn } from 'react-use';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

import { AUTO_HIDE_DURATION } from '@/constant';
import { HttpError } from '@/types';
import { useDebounceFn } from '@/hooks';

import { useGridNewContactStore } from '@/stores/directoryStores/useGridNewContactStore';
import { useGridStore } from '@/stores/directoryStores/useGridStore';
import { useGridQueryConditionStore } from '@/stores/directoryStores/useGridQueryConditionStore';
import { useGridColumnsStore } from '@/stores/directoryStores/useGridColumnsStore';

import { StyledGrid } from '@/components/atoms';
import {
  GridActionsCard,
  GridNoData,
  GridPagination,
  GridToolBar,
} from '@/components/molecules';

import {
  _deleteGridRecords,
  _exportGridRecords,
  _getGridListById,
} from '@/request';

export const GridDirectory: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { metadataColumns, fetchAllColumns, tableId, loading } =
    useGridColumnsStore((state) => state);
  const { keyword, segmentsFilters, segmentId } = useGridQueryConditionStore(
    (state) => state,
  );
  const newContact = useGridNewContactStore((state) => state.data);
  const { totalRecords, setTotalRecords } = useGridStore((state) => state);

  const router = useRouter();

  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    page: 0,
    size: 50,
  });

  const [querySegmentsFilters, setQuerySegmentsFilters] = useState({});

  const [, , updateQueryDebounce] = useDebounceFn(
    () => setQuerySegmentsFilters(segmentsFilters!),
    500,
  );

  useEffect(
    () => {
      if (Object.keys(segmentsFilters!).length === 0) {
        return;
      }
      for (const [, v] of Object.entries(segmentsFilters!)) {
        if (v.length === 0) {
          return;
        }
        if (
          v.some(
            (item) =>
              !item.columnName || !item.operation || !item.operationText,
          )
        ) {
          return;
        }
      }
      updateQueryDebounce();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [segmentsFilters],
  );

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
              querySegmentsFilters,
              segmentId,
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
    {
      revalidateOnFocus: false,
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
      ? (metadataColumns
          .filter((item) => item.columnName !== 'id')
          .filter((item) => item.active)
          .map((item) => ({
            accessorKey: item.columnName || ' ',
            header: item.columnLabel,
            size: 250,
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
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    textDecoration:
                      item.columnName === 'name' ? 'underline' : 'none',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!totalRecords) {
    return (
      <>
        {!isLoading && !loading && (
          <Fade in={!isLoading && !loading}>
            <Box>
              <GridNoData />
            </Box>
          </Fade>
        )}
      </>
    );
  }

  return (
    <>
      <Stack gap={1.5}>
        <GridToolBar totalContacts={totalContacts} />
        <Stack
          bgcolor={'#fff'}
          border={'1px solid #ccc'}
          borderRadius={2}
          gap={3}
        >
          <StyledGrid
            columns={columns}
            data={data || []}
            enableBatchRowSelection={true}
            enableColumnResizing={true}
            enableMultiRowSelection={true}
            enableRowSelection={true}
            enableSelectAll={true}
            getRowId={(row) => row.id}
            loading={isLoading || loading}
            onRowClick={({ row }) => {
              router.push(`/contacts/directory/detail/${tableId}/${row.id}`);
            }}
            onRowSelectionChange={setRowSelection}
            rowCount={0}
            rowSelection={rowSelection}
            style={{
              maxHeight: 'calc(100vh - 430px)',
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
