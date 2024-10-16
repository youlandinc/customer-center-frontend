'use client';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { CircularProgress, Icon, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { AUTO_HIDE_DURATION } from '@/constant';

import { StyledButton } from '@/components/atoms';

import ICON_UPLOAD from './assets/icon_upload.svg';
import {
  MRT_ColumnDef,
  MRT_TableContainer,
  useMaterialReactTable,
} from 'material-react-table';

export const XLSXUpload = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [cols, setCols] = useState<Array<string | number>>([]);
  const [fixedCols, setFixedCols] = useState<Array<string | number>>([]);
  const [data, setData] = useState<
    Array<{ [key: string | number]: string | number }>
  >([]);
  const [fileRows, setFileRows] = useState<number>(0);
  const [fileColumns, setFileColumns] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validatorFileSize = useCallback(
    (files: FileList) => {
      let flag = true;
      Array.from(files).some((item) => {
        if (item.size / 1024 / 1024 > 20) {
          enqueueSnackbar('File size cannot exceed 20MB.', {
            header: 'Upload Failed',
            variant: 'error',
            autoHideDuration: AUTO_HIDE_DURATION,
            isSimple: false,
          });
          flag = false;
          return true;
        }
      });
      return flag;
    },
    [enqueueSnackbar],
  );

  const onExtractFile = useCallback((file: File) => {}, []);

  const onChangeEvent = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.target.files && validatorFileSize(event.target.files)) {
        onExtractFile(event.target.files[0]);
        //event.target.value = '';
      }
    },
    [onExtractFile, validatorFileSize],
  );

  const table = useMaterialReactTable({
    columns: genColumns(cols, fixedCols),
    data: data,
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
    getRowId: (row) => row.title, //default
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

  return data.length === 0 ? (
    <Stack
      alignItems={'center'}
      border={'1px dashed #D2D6E1'}
      borderRadius={2}
      flex={1}
      gap={1}
      justifyContent={'center'}
      p={6}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <input
            accept={
              '.csv,.xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,'
            }
            hidden
            onChange={onChangeEvent}
            ref={fileInputRef}
            type="file"
          />
          <StyledButton
            onClick={() => {
              fileInputRef.current?.click();
            }}
            size={'small'}
            sx={{
              width: 144,
            }}
          >
            <Icon
              component={ICON_UPLOAD}
              sx={{
                height: 24,
                width: 24,
                mr: 1,
              }}
            />
            Select file
          </StyledButton>
          <Typography color={'text.secondary'} variant={'body2'}>
            Drag & drop or click &#34;Select file&#34; above to browse your
            computer
          </Typography>
          <Typography color={'text.secondary'} variant={'body2'}>
            .xlsx and .csv files are supported
          </Typography>
        </>
      )}
    </Stack>
  ) : (
    <Stack flex={1}>
      <Typography variant={'h7'}>Preview your file</Typography>
      <Stack alignItems={'center'} flexDirection={'row'}>
        <Typography color={'text.primary'} variant={'body3'}>
          {fileName}: {fileRows} lines and {fileColumns} columns.
        </Typography>
        <Typography
          color={'primary.main'}
          onClick={() => {
            setData([]);
            setCols([]);
            setFixedCols([]);
            setFileRows(0);
            setFileColumns(0);
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

const genColumns = (
  arr: Array<string | number>,
  fixedCols: Array<string | number>,
): MRT_ColumnDef<any>[] => {
  const result = arr.map((item, index) => {
    return {
      header: fixedCols[index],
      accessorKey: `${item}`,
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
          //<Tooltip title={renderedCellValue ? renderedCellValue : '-'}>
          //  <Typography
          //    sx={{
          //      overflow: 'hidden',
          //      textOverflow: 'ellipsis',
          //      whiteSpace: 'nowrap',
          //      width: '100%',
          //    }}
          //    variant={'body3'}
          //  >
          //    {renderedCellValue ? renderedCellValue : '-'}
          //  </Typography>
          //</Tooltip>
        );
      },
    } as MRT_ColumnDef<any>;
  });
  return result || [];
};
