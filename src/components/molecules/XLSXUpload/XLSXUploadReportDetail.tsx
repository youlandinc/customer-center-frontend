import { FC, useCallback, useState } from 'react';
import { Fade, Icon, Skeleton, Stack, Typography } from '@mui/material';
import { useAsync } from 'react-use';
import {
  MRT_TableContainer,
  useMaterialReactTable,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { enqueueSnackbar } from 'notistack';
import { uniqueId } from 'lodash';

import { AUTO_HIDE_DURATION } from '@/constant';

import {
  _fetchImportHistoriesDetail,
  _fetchImportHistoryInvalidExcel,
} from '@/request';
import { ExcelContentProps, ExcelHeaderProps, HttpError } from '@/types';

import { StyledButton } from '@/components/atoms';
import { genColumns } from '@/components/molecules';

import ICON_WARNING from './assets/icon_warning.svg';
import ICON_SUCCESS from './assets/icon_success.svg';

export const XLSXUploadReportDetail: FC<{ id: string | number }> = ({ id }) => {
  const router = useRouter();

  const { loading } = useAsync(async () => {
    if (!id) {
      return;
    }
    try {
      const { data } = await _fetchImportHistoriesDetail(id);
      setCardData([
        { label: 'IMPORTED CONTACTS', count: data.importedContacts },
        { label: 'NEW CONTACTS', count: data.newContacts },
        { label: 'UPDATED CONTACTS', count: data.updatedContacts },
        { label: 'UNCHANGED CONTACTS', count: data.unchangedContacts },
      ]);
      setFileName(data.importFileName);
      setUpdateDate(data.importDate);
      setInvalidContacts(data.invalidContacts);
      setTableData(
        data.content?.map((item) => ({ ...item, _id: uniqueId() })) ?? [],
      );
      setTableHeader(data.header ?? []);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    }
  }, [id]);

  const [downloadLoading, setDownloadLoading] = useState(false);

  const onClickToDownload = useCallback(async () => {
    const handler = (data: any, fileName?: string) => {
      // file export
      if (!data) {
        return;
      }
      const fileUrl = window.URL.createObjectURL(
        new Blob([data], {
          type: 'application/vnd.ms-excel;charset=utf-8',
        }),
      );
      const a = document.createElement('a');
      a.style.display = 'none';
      a.download = fileName || 'invalid_contacts_excel.xlsx';
      a.href = fileUrl;
      a.click();
      if (document.body.contains(a)) {
        document.body.removeChild(a);
      }
    };

    try {
      const res = await _fetchImportHistoryInvalidExcel(id);
      handler(res.data);
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setDownloadLoading(false);
    }
  }, [id]);

  const [fileName, setFileName] = useState('123.xlsx');
  const [updateDate, setUpdateDate] = useState(
    format(new Date(), 'MM/dd/yyyy hh:mm'),
  );
  const [invalidContacts, setInvalidContacts] = useState(64);
  const [cardData, setCardData] = useState([
    { label: 'IMPORTED CONTACTS', count: 64 },
    { label: 'NEW CONTACTS', count: 64 },
    { label: 'UPDATED CONTACTS', count: 64 },
    { label: 'UNCHANGED CONTACTS', count: 64 },
  ]);
  const [tableHeader, setTableHeader] = useState<ExcelHeaderProps[]>([
    { columnLabel: 'Column 1', columnName: 'Column1' },
  ]);
  const [tableData, setTableData] = useState<
    Array<ExcelContentProps & { _id: string }>
  >([]);

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
      showSkeletons: loading,
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

  return (
    <Stack gap={3} overflow={'auto'} px={8} py={6}>
      <Stack alignItems={'center'} flexDirection={'row'}>
        <Typography variant={'h6'}>Import report #{id}</Typography>

        <StyledButton
          color={'info'}
          onClick={() => router.back()}
          size={'small'}
          sx={{ ml: 'auto' }}
          variant={'outlined'}
        >
          Back
        </StyledButton>
      </Stack>

      <Stack flexDirection={'row'} gap={6}>
        <Stack gap={0.5} width={282}>
          <Typography fontSize={18}>Date</Typography>
          {loading ? (
            <Skeleton />
          ) : (
            <Typography component={'p'}>
              import Date:&nbsp;
              <Typography component={'span'} variant={'subtitle1'}>
                {format(updateDate, 'MM/dd/yyyy hh:mm')}
              </Typography>
            </Typography>
          )}
        </Stack>
        <Stack gap={0.5} width={282}>
          <Typography fontSize={18}> Source</Typography>
          {loading ? (
            <Skeleton />
          ) : (
            <Typography component={'p'}>
              Imported file:&nbsp;
              <Typography component={'span'} variant={'subtitle1'}>
                {fileName}
              </Typography>
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack flexDirection={'row'} gap={6}>
        {cardData.map((card, index) => (
          <Stack
            bgcolor={'#fff'}
            border={'1px solid #D2D6E1'}
            borderRadius={2}
            key={`card-${card.label}-${index}`}
            p={3}
            sx={{
              '&:first-of-type': {
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  height: '100%',
                  width: 2,
                  right: -25,
                  bgcolor: '#D2D6E1',
                },
              },
            }}
            width={280}
          >
            <Typography fontSize={18}>{card.label}</Typography>
            {loading ? (
              <Skeleton height={27} />
            ) : (
              <Typography variant={'h5'}>{card.count}</Typography>
            )}
          </Stack>
        ))}
      </Stack>

      <Stack alignItems={'center'} flexDirection={'row'} gap={0.5}>
        <Icon
          component={invalidContacts ? ICON_WARNING : ICON_SUCCESS}
          sx={{
            width: 32,
            height: 32,
          }}
        />
        {invalidContacts ? (
          <Typography variant={'body2'}>
            <Typography
              color={'#EEB94D'}
              component={'span'}
              variant={'subtitle2'}
            >
              Non-imported data:
            </Typography>
            &nbsp;We couldn&apos;t import&nbsp;
            <Typography color={'#EEB94D'} component={'span'} variant={'body2'}>
              {invalidContacts} invalid contacts
            </Typography>
            &nbsp;from your file.
          </Typography>
        ) : (
          <Typography variant={'body2'}>
            <Typography
              color={'#69C0A5'}
              component={'span'}
              variant={'subtitle2'}
            >
              All data imported successfully:
            </Typography>
            &nbsp;We successfully imported all contacts from your file.
          </Typography>
        )}
      </Stack>

      {!!invalidContacts && (
        <Fade in={!loading}>
          <Stack bgcolor={'#fff'} borderRadius={2}>
            <MRT_TableContainer
              sx={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                border: '1px solid #D2D6E1',
                borderBottom: 'none',
              }}
              table={table}
            />
            <Stack
              alignItems={'center'}
              border={'1px solid #D2D6E1'}
              justifyContent={'center'}
              py={3}
              sx={{
                borderTop: 'none',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
            >
              <StyledButton
                color={'info'}
                onClick={onClickToDownload}
                size={'small'}
                sx={{ width: 'fit-content' }}
                variant={'outlined'}
              >
                Download invalid contacts
              </StyledButton>
            </Stack>
          </Stack>
        </Fade>
      )}
    </Stack>
  );
};
