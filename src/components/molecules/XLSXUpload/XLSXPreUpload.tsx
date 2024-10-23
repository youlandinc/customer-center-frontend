import { FC, useCallback, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import {
  MRT_ColumnDef,
  MRT_TableContainer,
  useMaterialReactTable,
} from 'material-react-table';
import { useSnackbar } from 'notistack';
import { uniqueId } from 'lodash';

import { AUTO_HIDE_DURATION } from '@/constant';

import { useTableImportStore } from '@/stores/directoryStores/useTableImportStore';

import { StyledButton, StyledUploadBox } from '@/components/atoms';

import { _preUploadExcel } from '@/request';
import { ExcelContentProps, ExcelHeaderProps, HttpError } from '@/types';

export const XLSXPreUpload: FC<{ nextStep: () => void }> = ({ nextStep }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    setFileColumns,
    setTaskId,
    setFileName,
    reset,
    setFileContent,
    setColumnMappingList,
    fileName,
  } = useTableImportStore();

  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState<ExcelHeaderProps[]>([]);
  const [tableData, setTableData] = useState<
    Array<ExcelContentProps & { _id: string }>
  >([]);

  const onExtractFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      try {
        const { data } = await _preUploadExcel(formData);
        const result = data.content.map((item) => ({
          ...item,
          _id: uniqueId(),
        }));
        setTableData(result);

        setFileContent(
          data.content.length > 2 ? data.content.slice(0, 2) : data.content,
        );
        setFileName(data.fileName);
        setTableHeader(data.header);
        setFileColumns(data.header);
        setTaskId(data.taskId);

        const mappingList = data.header.map((column) => ({
          columnName: column.columnName,
          executeColumnId: '',
        }));

        setColumnMappingList(mappingList);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enqueueSnackbar],
  );

  const table = useMaterialReactTable({
    columns: genColumns(tableHeader),
    data: tableData,
    enableExpandAll: false,
    enableExpanding: false,
    enableSorting: false,
    enableBottomToolbar: false,
    paginateExpandedRows: true,
    enableTopToolbar: false,
    enableGrouping: false,

    enableRowVirtualization: false,
    enableRowActions: false,
    enableColumnActions: false,
    enableColumnOrdering: false,
    enableColumnDragging: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableColumnPinning: false,

    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: 140,
      size: 250,
    },

    manualPagination: true,
    state: {
      showSkeletons: false,
    },
    initialState: {
      showProgressBars: false,
    },
    getRowId: (row) => row._id, //default
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 5 }, //optionally customize the column virtualizer

    renderEmptyRowsFallback: () => {
      return (
        <Stack pl={8} pt={4} width={'100%'}>
          <Typography color={'text.secondary'} mt={1.5} variant={'subtitle2'}>
            No recorded transactions
          </Typography>
        </Stack>
      );
    },
    muiTableContainerProps: {
      style: {
        maxHeight: 'calc(100vh - 236px)',
      },
    },
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
    muiTableHeadCellProps: () => ({
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
      onClick: () => {
        return;
      },
    }),
    muiTableBodyCellProps: () => {
      return {
        async onClick() {
          return;
        },
      };
    },
    muiTableBodyRowProps: {
      sx: {
        boxShadow: 'none',
        '& td': {
          height: 32,
          py: 0,
          px: 1.5,
          borderRight: '1px solid',
          borderBottom: '1px solid',
          borderColor: '#EDF1FF',
          '&:last-of-type': {
            borderRight: 'none',
          },
        },
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
  });

  return tableData.length === 0 ? (
    <StyledUploadBox
      loading={loading}
      onUpload={onExtractFile}
      sx={{
        gap: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        p: 6,
      }}
    />
  ) : (
    <Stack flex={1}>
      <Typography variant={'h7'}>Preview your file</Typography>
      <Stack alignItems={'center'} flexDirection={'row'}>
        <Typography color={'text.primary'} variant={'body3'}>
          {fileName}
        </Typography>
        <Typography
          color={'primary.main'}
          onClick={() => {
            setTableData([]);
            setTableHeader([]);
            reset();
          }}
          sx={{
            textDecoration: 'underline',
            ml: 'auto',
            cursor: 'pointer',
          }}
          variant={'body2'}
        >
          Delete file
        </Typography>
      </Stack>
      <MRT_TableContainer
        sx={{ borderRadius: 2, border: '1px solid #D2D6E1', mt: 3 }}
        table={table}
      />

      <StyledButton
        onClick={nextStep}
        size={'small'}
        sx={{
          mt: 6,
          width: 90,
        }}
      >
        Continue
      </StyledButton>
    </Stack>
  );
};

export const genColumns = (
  arr: Array<{ columnName: string; columnLabel: string }>,
): MRT_ColumnDef<any>[] => {
  const result = arr.map((item) => {
    return {
      header: item.columnLabel,
      accessorKey: item.columnName,
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      Cell: ({ renderedCellValue }) => {
        return (
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
            variant={'body3'}
          >
            {renderedCellValue ? renderedCellValue : '-'}
          </Typography>
        );
      },
    } as MRT_ColumnDef<any>;
  });
  return result || [];
};
