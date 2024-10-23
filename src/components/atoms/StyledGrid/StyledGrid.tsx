import { CSSProperties, FC } from 'react';
import { Icon, SxProps } from '@mui/material';
import {
  MRT_Row,
  MRT_TableContainer,
  MRT_TableInstance,
  MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';

import ICON_CHECKBOX_STATIC from './assets/icon_static.svg';
import ICON_CHECKBOX_CHECKED from './assets/icon_checked.svg';
import ICON_CHECKBOX_INDETERMINATE from './assets/icon_intermediate.svg';

type StyledGridProps = MRT_TableOptions<any> & {
  loading?: boolean;
  columnOrder?: string[];
  style?: CSSProperties;
  rowSelection?: Record<string, boolean>;
  onRowClick?: (props: {
    isDetailPanel?: boolean;
    row: MRT_Row<any>;
    staticRowIndex: number;
    table: MRT_TableInstance<any>;
  }) => void;
  muiTableBodyRowSx?: SxProps;
  muiTableHeadSx?: SxProps;
};

export const StyledGrid: FC<StyledGridProps> = ({
  loading,
  columnOrder,
  columns,
  data,
  rowCount,
  style,
  getRowId,
  rowSelection = {},
  onRowClick,
  muiTableBodyRowSx,
  muiTableHeadSx,
  ...rest
}) => {
  // const router = useRouter();

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    rowCount: rowCount,
    enableColumnActions: false, //pipelineType === PipelineDisplayMode.LIST_MODE,
    enableSorting: false,
    enableRowVirtualization: true,
    enableColumnVirtualization: true,
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
      icon: (
        <Icon component={ICON_CHECKBOX_STATIC} sx={{ width: 20, height: 20 }} />
      ),
      checkedIcon: (
        <Icon
          component={ICON_CHECKBOX_CHECKED}
          sx={{ width: 20, height: 20 }}
        />
      ),
      sx: {
        padding: 0,
        height: 20,
        m: 0,
        width: 'fit-content',
      },
      title: '',
    },
    muiSelectAllCheckboxProps: {
      icon: (
        <Icon component={ICON_CHECKBOX_STATIC} sx={{ width: 20, height: 20 }} />
      ),
      checkedIcon: (
        <Icon
          component={ICON_CHECKBOX_CHECKED}
          sx={{ width: 20, height: 20 }}
        />
      ),
      indeterminateIcon: (
        <Icon
          component={ICON_CHECKBOX_INDETERMINATE}
          sx={{ width: 20, height: 20 }}
        />
      ),
      sx: {
        padding: 0,
        height: 20,
        m: 0,
        width: 'fit-content',
      },
      title: '',
    },
    muiTableBodyRowProps: (props) => {
      return {
        sx: {
          p: 0,
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
            height: 60,
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
          '&:last-of-type .MuiTableCell-root': {
            borderBottom: 'none',
          },
          ...muiTableBodyRowSx,
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
          // minHeight: 36,
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
            height: 20,
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
          pl: 1.5,
          py: 1.25,
        },
        '& .MuiTableCell-root:last-child': {
          bgcolor: '#F8F9FC',
        },
        '& .MuiTableCell-root:first-of-type::after': {
          content: "''",
          position: 'absolute',
          right: 0,
          top: 10,
          width: 2,
          bgcolor: '#D2D6E1',
          height: 20,
        },
        '& .MuiDivider-root': {
          borderWidth: '1px',
          height: 16,
          borderColor: '#D2D6E1',
        },
        ...muiTableHeadSx,
      },
    },
    muiTableContainerProps: {
      style: {
        ...style,
      },
    },
    ...rest,
  });
  return <MRT_TableContainer table={table} />;
};
