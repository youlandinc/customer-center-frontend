import { useCallback, useMemo, useState } from 'react';
import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { MRT_ColumnDef } from 'material-react-table';
import { format } from 'date-fns';
import useSWR from 'swr';

import {
  StyledButton,
  StyledDialog,
  StyledGrid,
  StyledTextField,
} from '@/components/atoms';
import { GridPagination } from '@/components/molecules';

import {
  _deleteExistSegment,
  _fetchSegmentsList,
  _renameExistSegment,
} from '@/request';
import { useSwitch } from '@/hooks';
import { HttpError } from '@/types';
import { AUTO_HIDE_DURATION } from '@/constant';

export const GridSegments = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [pagination, setPagination] = useState({
    page: 0,
    size: 50,
  });

  const { data, isLoading, mutate } = useSWR(
    'GridSegments',
    _fetchSegmentsList,
  );
  const pageCount = data?.data?.pages || 0;
  const total = data?.data?.total || 0;

  const {
    open: deleteOpen,
    close: deleteClose,
    visible: deleteVisible,
  } = useSwitch(false);
  const {
    open: renameOpen,
    close: renameClose,
    visible: renameVisible,
  } = useSwitch(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const [segmentName, setSegmentName] = useState<string>('');
  const [segmentId, setSegmentId] = useState<string | number>('');

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    return [
      {
        accessorKey: 'segmentName',
        header: 'Segment name',
        grow: true,
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
              }}
            >
              {renderedCellValue}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'lastEdit',
        header: 'Last edit',
        grow: true,
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
              }}
            >
              {format(
                new Date(renderedCellValue as string),
                'LLL d, yyyy, h:m aa',
              )}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'action',
        header: '',
        grow: false,
        size: 60,
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        enableHiding: true,
        Cell: ({ row }) => {
          const {
            original: { segmentId, segmentName },
          } = row;
          return (
            <Stack
              alignItems={'center'}
              flex={1}
              height={60}
              justifyContent={'center'}
              mx={-2}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MoreHoriz
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setAnchorEl(e.currentTarget);
                }}
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                MenuListProps={{
                  sx: {
                    width: 160,
                    borderRadius: 2,
                  },
                }}
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                slotProps={{
                  paper: {
                    sx: {
                      boxShadow:
                        '0px 10px 10px 0px rgba(17, 52, 227, 0.10), 0px 0px 2px 0px rgba(17, 52, 227, 0.10)',
                      borderRadius: 2,
                      '& .MuiList-root': {
                        padding: 0,
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiMenu-list': {
                    p: 0,
                  },
                }}
              >
                <MenuItem
                  onClick={async () => {
                    renameOpen();
                    setSegmentName(segmentName);
                    setSegmentId(segmentId);
                    setAnchorEl(null);
                  }}
                  sx={{ p: '14px 24px', fontSize: 14 }}
                >
                  Rename
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    deleteOpen();
                    setSegmentId(segmentId);
                    setAnchorEl(null);
                  }}
                  sx={{ p: '14px 24px', fontSize: 14 }}
                >
                  Delete segment
                </MenuItem>
              </Menu>
            </Stack>
          );
        },
      },
    ];
  }, [anchorEl, deleteOpen, renameOpen]);

  const onClickToRename = useCallback(async () => {
    const postData = {
      segmentsId: segmentId,
      segmentName,
    };
    setRenameLoading(true);
    try {
      await _renameExistSegment(postData);
      await mutate();
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setRenameLoading(false);
      renameClose();
      setSegmentId('');
      setSegmentName('');
    }
  }, [enqueueSnackbar, mutate, segmentId, segmentName]);

  const onClickToDelete = useCallback(async () => {
    if (!segmentId) {
      return;
    }
    setDeleteLoading(true);
    try {
      await _deleteExistSegment(segmentId);
      await mutate();
    } catch (err) {
      const { header, message, variant } = err as HttpError;
      enqueueSnackbar(message, {
        variant: variant || 'error',
        autoHideDuration: AUTO_HIDE_DURATION,
        isSimple: !header,
        header,
      });
    } finally {
      setDeleteLoading(false);
      deleteClose();
      setSegmentId('');
      setSegmentName('');
    }
  }, [deleteClose, enqueueSnackbar, mutate, segmentId]);

  return (
    <Stack bgcolor={'#fff'} border={'1px solid #ccc'} borderRadius={2} gap={3}>
      <StyledGrid
        columns={columns}
        data={data?.data?.records || []}
        enableColumnResizing={false}
        getRowId={(row) => row.segmentId}
        loading={isLoading}
        muiTableHeadSx={{
          '& .MuiTableCell-stickyHeader:not(.MuiTableCell-stickyHeader:last-of-type)::after':
            {
              content: "''",
              position: 'absolute',
              right: 0,
              top: 10,
              width: 2,
              bgcolor: '#D2D6E1',
              height: 20,
            },
        }}
        onRowClick={({ row }) => {
          const { id } = row;
          const params = new URLSearchParams();
          params.set('segmentId', id);
          router.push(`/contacts/directory?${params.toString()}`);
        }}
        style={{
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
        rowCount={total}
        rowsPerPage={pagination.size}
      />

      <StyledDialog
        content={
          <Typography color={'text.secondary'} my={1.5} variant={'body2'}>
            Keep in mind that when you delete a segment, you do not delete the
            contacts in it.
          </Typography>
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={() => {
                deleteClose();
                setSegmentId('');
                setSegmentName('');
              }}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              color={'error'}
              disabled={deleteLoading}
              loading={deleteLoading}
              onClick={onClickToDelete}
              size={'small'}
              sx={{
                width: 72,
              }}
            >
              Delete
            </StyledButton>
          </Stack>
        }
        header={'Delete a segment'}
        open={deleteVisible}
      />
      <StyledDialog
        content={
          <Stack my={1.5}>
            <StyledTextField
              label={'Segment name'}
              onChange={(e) => setSegmentName(e.target.value)}
              value={segmentName}
            />
          </Stack>
        }
        footer={
          <Stack flexDirection={'row'} gap={1.5} justifyContent={'center'}>
            <StyledButton
              color={'info'}
              onClick={() => {
                renameClose();
                setSegmentId('');
                setSegmentName('');
              }}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              disabled={renameLoading}
              loading={renameLoading}
              onClick={onClickToRename}
              size={'small'}
              sx={{ width: 60 }}
            >
              Save
            </StyledButton>
          </Stack>
        }
        header={'Rename segment'}
        open={renameVisible}
      />
    </Stack>
  );
};
