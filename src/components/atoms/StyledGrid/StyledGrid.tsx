import {
  MRT_TableContainer,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import * as React from 'react';
import { FC } from 'react';

type StyledGridProps = MRT_TableOptions<any> & {
  loading?: boolean;
  columnOrder?: string[];
  style?: React.CSSProperties;
  rowSelection: Record<string, boolean>;
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
    muiTableBodyRowProps: {
      sx: {
        '& .MuiTableCell-root:last-child': {
          // borderBottom: 'none',
          borderColor: '#EDF1FF',
        },
        boxShadow: 'none',
        '& td': {},
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
      },
    },
    defaultColumn: {},
    muiTableBodyCellProps: ({ row: { original } }) => ({
      sx: {
        px: 1,
        py: 0,
        height: 32,
        borderRight: '1px solid',
        borderBottom: '1px solid',
        borderColor: '#EDF1FF',
        '&:last-of-type': {
          borderRight: 'none',
        },
      },
      onClick: async () => {
        const { loanId } = original;
        // await router.push({
        //   pathname: '/loan/overview',
        //   query: { loanId },
        // });
      },
    }),
    muiTableHeadCellProps: (props) => ({
      sx: {
        bgcolor: '#F4F6FA',
        opacity: 1,
        border: 'none',
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
      },
      // onClick: (e) => {
      //     if (
      //         (e.target as HTMLElement).className?.includes(
      //             'Mui-TableHeadCell-ResizeHandle-Wrapper',
      //         ) ||
      //         (e.target as HTMLElement).className?.includes(
      //             'Mui-TableHeadCell-ResizeHandle-Divider',
      //         )
      //     ) {
      //         return;
      //     }
      //     setAnchorEl(e.currentTarget);
      //     setTableHeaderIndex(props.column.getIndex());
      //     setHeaderColumnId(props.column.id);
      //     setHeaderTitle(props.column.columnDef.header);
      // },
    }),
    muiTableHeadProps: {
      sx: {
        opacity: 1,
        '& .MuiTableRow-head': {
          boxShadow: 'none',
        },
        '& .Mui-TableHeadCell-Content-Wrapper': {
          fontWeight: 600,
          fontSize: 12,
          lineHeight: '20px',
          whiteSpace: 'nowrap',
        },
        '& .MuiTableCell-root': {
          border: 'none',
        },
        '& .MuiTableCell-root:last-child': {
          bgcolor: '#F4F6FA',
        },
      },
    },

    muiTableContainerProps: {
      style: {
        maxHeight: 'calc(100vh - 412px)',
        borderBottom: '1px solid #ccc',
        ...style,
      },
    },
    ...rest,
  });
  return <MRT_TableContainer table={table} />;
};
