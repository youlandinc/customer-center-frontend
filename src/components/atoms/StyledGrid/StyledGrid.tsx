import {
  MRT_Row,
  MRT_TableContainer,
  MRT_TableInstance,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import * as React from 'react';
import { FC } from 'react';

import CHECKBOX_STATIC from './assets/static.svg';
import CHECKBOX_CHECKED from './assets/checked.svg';
import CHECKBOX_INDETERMINATE from './assets/intermediate.svg';
import { Icon } from '@mui/material';

type StyledGridProps = MRT_TableOptions<any> & {
  loading?: boolean;
  columnOrder?: string[];
  style?: React.CSSProperties;
  rowSelection: Record<string, boolean>;
  onRowClick?: (props: {
    isDetailPanel?: boolean;
    row: MRT_Row<any>;
    staticRowIndex: number;
    table: MRT_TableInstance<any>;
  }) => void;
};

export const StyledGrid: FC<StyledGridProps> = ({
  loading,
  columnOrder,
  columns,
  data,
  rowCount,
  style,
  getRowId,
  rowSelection,
  onRowClick,
  ...rest
}) => {
  // const router = useRouter();

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    rowCount: rowCount,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableBatchRowSelection: true,
    enableSelectAll: true,
    enableExpandAll: false, //hide expand all double arrow in column header
    enableExpanding: false,
    enableBottomToolbar: false, //pipelineType === PipelineDisplayMode.LIST_MODE,
    paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
    enableTopToolbar: false,
    enableColumnActions: false, //pipelineType === PipelineDisplayMode.LIST_MODE,
    enableColumnOrdering: false,
    enableSorting: false,
    enableColumnDragging: false,
    enableGrouping: false,
    enableColumnResizing: true,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
    enableColumnPinning: false,
    manualPagination: true,
    state: {
      columnOrder: columnOrder || [],
      showSkeletons: loading,
      rowSelection,
    },
    initialState: {
      showProgressBars: false,
    },
    getRowId: getRowId || ((row) => row.id), //default
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 5 }, //optionally customize the column virtualizer
    muiSelectCheckboxProps: {
      icon: <Icon component={CHECKBOX_STATIC} sx={{ width: 20, height: 20 }} />,
      checkedIcon: (
        <Icon component={CHECKBOX_CHECKED} sx={{ width: 20, height: 20 }} />
      ),
    },
    muiSelectAllCheckboxProps: {
      icon: <Icon component={CHECKBOX_STATIC} sx={{ width: 20, height: 20 }} />,
      checkedIcon: (
        <Icon component={CHECKBOX_CHECKED} sx={{ width: 20, height: 20 }} />
      ),
      indeterminateIcon: (
        <Icon
          component={CHECKBOX_INDETERMINATE}
          sx={{ width: 20, height: 20 }}
        />
      ),
    },

    muiTableBodyRowProps: (props) => {
      return {
        sx: {
          '& .MuiTableCell-root:last-child': {
            borderColor: '#D2D6E1',
          },
          boxShadow: 'none',
          '&:hover': {
            '& td:after': {
              background: '#F6F6F6',
            },
          },
          '&:hover .MuiTableCell-root[data-pinned="true"]::before': {
            bgcolor: '#F6F6F6',
          },
          '& .MuiTableCell-root[data-pinned="true"]::after': {
            zIndex: -2,
          },
          '& .MuiTableCell-root': {
            px: 1.5,
            py: 2.5,
            height: 32,
            borderRight: '1px solid',
            borderBottom: '1px solid',
            borderColor: '#D2D6E1',
            '&:last-of-type': {
              borderRight: 'none',
            },
          },
          '& .MuiTableCell-root:first-of-type': {
            justifyContent: 'center',
          },
        },
        onClick: () => {
          onRowClick?.(props);
        },
      };
    },
    defaultColumn: {
      muiTableHeadCellProps: () => ({
        sx: {
          opacity: 1,
          minHeight: 36,
          px: 1,
          py: 1.25,
          justifyContent: 'center',
          '& .Mui-TableHeadCell-Content-Labels ': {
            pl: 0,
          },
          '& .Mui-TableHeadCell-Content-Wrapper': {
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            webkitBoxOrient: 'vertical',
            webkitLineClamp: 2,
            display: '-webkit-box',
            whiteSpace: 'normal',
            color: '#636A7C',
          },
          '& .Mui-TableHeadCell-ResizeHandle-Wrapper': {
            mr: '-8px',
          },
          '&[data-pinned="true"]:before': {
            bgcolor: 'transparent',
          },
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#ececec',
          },
          '& .MuiDivider-root': {
            borderWidth: '1px',
            height: 16,
          },
          '&:first-of-type .Mui-TableHeadCell-Content-Labels': {
            width: '100%',
            justifyContent: 'center',
            '& .Mui-TableHeadCell-Content-Wrapper': {
              display: 'flex',
              justifyContent: 'center',
            },
          },
        },
      }),
    },
    muiTableHeadProps: {
      sx: {
        opacity: 1,
        '& .MuiTableRow-head': {
          boxShadow: 'none',
        },
        '& .Mui-TableHeadCell-Content-Wrapper': {
          fontWeight: 400,
          fontSize: 14,
          lineHeight: '20px',
          whiteSpace: 'nowrap',
        },
        '& .MuiTableCell-root': {
          border: 'none',
          bgcolor: '#F8F9FC',
        },
        '& .MuiTableCell-root:last-child': {
          bgcolor: '#F8F9FC',
        },
        '& .MuiDivider-root': {
          borderWidth: '1px',
          height: 16,
          borderColor: '#D2D6E1',
        },
      },
    },
    muiTableContainerProps: {
      style: {
        maxHeight: 'calc(100vh - 402px)',
        borderBottom: '1px solid #ccc',
        ...style,
      },
    },
    ...rest,
  });
  return <MRT_TableContainer table={table} />;
};
