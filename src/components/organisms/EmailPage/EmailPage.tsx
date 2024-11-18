import { FC, useCallback, useRef, useState } from 'react';
import { Icon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'nextjs-toploader/app';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

import { POSThousandSeparator } from '@/utils/Format';
import { POSTypeOf } from '@/utils/TypeOf';

import { useSwitch } from '@/hooks';

import {
  StyledButton,
  StyledDialog,
  StyledGrid,
  StyledProgressCircle,
  StyledTextField,
  StyledTextFieldSearch,
} from '@/components/atoms';
import { CampaignStatus, GridPagination } from '@/components/molecules';

import { CampaignGridItemData, CampaignStatusEnum, HttpError } from '@/types';
import {
  _deleteCampaign,
  _fetchCampaignsGirdData,
  _renameCampaign,
} from '@/request';

import ICON_CREATE from './assets/icon_create.svg';
import { AUTO_HIDE_DURATION } from '@/constant';
import { MoreHoriz } from '@mui/icons-material';

export const EmailPage: FC = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 100,
  });
  const [searchWord, setSearchWord] = useState('');

  const { data, isLoading, mutate } = useSWR(
    {
      page: pagination.page,
      size: pagination.size,
      searchWord,
    },
    _fetchCampaignsGirdData,
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <Stack gap={3} height={'100%'} overflow={'auto'} px={8} py={6}>
      <Stack gap={3}>
        <Stack alignItems={'center'} flexDirection={'row'} gap={3} ml={'auto'}>
          <StyledTextFieldSearch
            handleClear={() => {
              ref.current!.value = '';
            }}
            inputRef={ref}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            variant={'outlined'}
          />
          <StyledButton
            onClick={() => {
              router.push('/campaigns/email/edit');
            }}
            sx={{
              height: '36px !important',
              p: '0 !important',
              px: '8px !important',
              fontSize: '14px !important',
              fontWeight: '400 !important',
            }}
          >
            <Icon
              component={ICON_CREATE}
              sx={{ width: 20, height: 20, mr: 0.5 }}
            />
            Create new campaign
          </StyledButton>
        </Stack>

        <Stack
          bgcolor={'#fff'}
          border={'1px solid #ccc'}
          borderRadius={2}
          gap={3}
          overflow={'hidden'}
        >
          <StyledGrid
            columns={genColumns(mutate)}
            data={data?.data?.records || []}
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
              if (
                [
                  CampaignStatusEnum.sending,
                  CampaignStatusEnum.sent,
                  CampaignStatusEnum.suspended,
                ].includes(row.original.campaignStatus)
              ) {
                router.push(
                  `/campaigns/email/report/${row.original.campaignId}`,
                );
                router.refresh();
                return;
              }
              router.push(`/campaigns/email/edit/${row.original.campaignId}`);
              router.refresh();
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
            pageCount={data?.data?.pages || 0}
            rowCount={data?.data?.total || 0}
            rowsPerPage={pagination.size}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const genColumns = (mutate: any): MRT_ColumnDef<CampaignGridItemData>[] => {
  return [
    {
      header: 'Campaign name',
      accessorKey: 'campaignName',
      muiTableBodyCellProps: { align: 'left' },
      muiTableHeadCellProps: { align: 'left' },
      size: 600,
      minSize: 300,
      maxSize: 800,
      Cell: ({ renderedCellValue, row }) => {
        return (
          <Stack
            alignItems={'center'}
            flexDirection={'row'}
            gap={1}
            width={'100%'}
          >
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 'fit-content',
              }}
              variant={'body2'}
            >
              {renderedCellValue}
            </Typography>
            <CampaignStatus campaignStatus={row.original.campaignStatus} />
          </Stack>
        );
      },
    },
    {
      header: 'Recipients',
      accessorKey: 'recipients',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 120,
      minSize: 120,
      Cell: ({ row }) => {
        const { recipients } = row.original;
        return (
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
            variant={'body2'}
          >
            {POSTypeOf(recipients) !== 'Null'
              ? POSThousandSeparator(recipients)
              : '-'}
          </Typography>
        );
      },
    },
    {
      header: 'Sent',
      accessorKey: 'sentRate',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 160,
      minSize: 160,
      Cell: ({ row }) => {
        const { sentDate, sentRate, campaignStatus } = row.original;
        const date =
          POSTypeOf(sentDate) === 'Null'
            ? '-'
            : format(parseISO(sentDate!), 'MM/dd/yyyy');
        const rate: number = POSTypeOf(sentRate) === 'Null' ? 0 : sentRate!;

        const renderNode = () => {
          switch (campaignStatus) {
            case CampaignStatusEnum.draft:
            case CampaignStatusEnum.scheduled:
              return (
                <Typography variant={'body3'} width={'100%'}>
                  -
                </Typography>
              );
            case CampaignStatusEnum.sending:
              return (
                <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
                  <StyledProgressCircle value={rate} />
                  <Typography variant={'body3'} width={'100%'}>
                    {rate}%
                  </Typography>
                </Stack>
              );
            case CampaignStatusEnum.sent: {
              return (
                <Typography variant={'body3'} width={'100%'}>
                  {date}
                </Typography>
              );
            }
            case CampaignStatusEnum.suspended:
              if (sentRate === 1) {
                return (
                  <Typography variant={'body3'} width={'100%'}>
                    {date}
                  </Typography>
                );
              }
              return (
                <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
                  <StyledProgressCircle value={rate} />
                  <Typography variant={'body3'} width={'100%'}>
                    {rate}%
                  </Typography>
                </Stack>
              );
            default:
              return (
                <Typography variant={'body3'} width={'100%'}>
                  -
                </Typography>
              );
          }
        };

        return <>{renderNode()}</>;
      },
    },
    {
      header: 'Unique opens',
      accessorKey: 'openRate',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 220,
      minSize: 220,
      Cell: ({ row }) => {
        const { openCount, openRate, campaignStatus } = row.original;
        const count: number = POSTypeOf(openCount) === 'Null' ? 0 : openCount!;
        const rate: number = POSTypeOf(openRate) === 'Null' ? 0 : openRate!;

        const renderNode = () => {
          switch (campaignStatus) {
            case CampaignStatusEnum.draft:
            case CampaignStatusEnum.scheduled:
              return (
                <Typography variant={'body3'} width={'100%'}>
                  -
                </Typography>
              );
            case CampaignStatusEnum.sending:
            case CampaignStatusEnum.sent:
            case CampaignStatusEnum.suspended:
              return (
                <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
                  <Typography
                    bgcolor={'rgba(67, 167, 136, 0.20)'}
                    borderRadius={1}
                    color={'#43A788'}
                    px={1}
                    py={0.5}
                    variant={'subtitle3'}
                  >
                    {rate}%
                  </Typography>
                  <Typography variant={'body3'}>{count} opened</Typography>
                </Stack>
              );
            default:
              return (
                <Typography variant={'body2'} width={'100%'}>
                  -
                </Typography>
              );
          }
        };

        return <>{renderNode()}</>;
      },
    },
    {
      header: 'Unique clicks',
      accessorKey: 'clickRate',
      muiTableBodyCellProps: { align: 'center' },
      muiTableHeadCellProps: { align: 'center' },
      size: 220,
      minSize: 220,
      Cell: ({ row }) => {
        const { clickCount, clickRate, campaignStatus } = row.original;
        const count: number =
          POSTypeOf(clickCount) === 'Null' ? 0 : clickCount!;
        const rate: number = POSTypeOf(clickRate) === 'Null' ? 0 : clickRate!;

        const renderNode = () => {
          switch (campaignStatus) {
            case CampaignStatusEnum.draft:
            case CampaignStatusEnum.scheduled:
              return (
                <Typography variant={'body3'} width={'100%'}>
                  -
                </Typography>
              );
            case CampaignStatusEnum.sending:
            case CampaignStatusEnum.sent:
            case CampaignStatusEnum.suspended:
              return (
                <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
                  <Typography
                    bgcolor={'rgba(91, 118, 188, 0.20)'}
                    borderRadius={1}
                    color={'#2F416A'}
                    px={1}
                    py={0.5}
                    variant={'subtitle3'}
                  >
                    {rate}%
                  </Typography>
                  <Typography variant={'body3'}>{count} clicked</Typography>
                </Stack>
              );
            default:
              return (
                <Typography variant={'body2'} width={'100%'}>
                  -
                </Typography>
              );
          }
        };

        return <>{renderNode()}</>;
      },
    },
    {
      header: '',
      accessorKey: 'action',
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
          original: { campaignId },
        } = row;
        const { enqueueSnackbar } = useSnackbar();

        const [campaignName, setCampaignName] = useState(
          row.original.campaignName || '',
        );
        const [deleteLoading, setDeleteLoading] = useState(false);
        const [renameLoading, setRenameLoading] = useState(false);
        const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);

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

        const onClickToRename = useCallback(async () => {
          const postData = {
            campaignId,
            campaignName,
          };
          setRenameLoading(true);
          try {
            await _renameCampaign(postData);
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
          }
        }, [campaignId, campaignName, enqueueSnackbar, renameClose]);

        const onClickToDelete = useCallback(async () => {
          if (!campaignId) {
            return;
          }
          setDeleteLoading(true);
          try {
            await _deleteCampaign(campaignId);
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
          }
        }, [campaignId, deleteClose, enqueueSnackbar]);

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
                  width: 180,
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
                onClick={() => {
                  renameOpen();
                  setAnchorEl(null);
                }}
                sx={{ p: '14px 24px', fontSize: 14 }}
              >
                Rename campaign
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteOpen();
                  setAnchorEl(null);
                }}
                sx={{ p: '14px 24px', fontSize: 14 }}
              >
                Delete campaign
              </MenuItem>
            </Menu>

            <StyledDialog
              content={
                <Typography color={'text.secondary'} my={1.5} variant={'body2'}>
                  This action cannot be undone, and all data will be permanently
                  deleted.
                </Typography>
              }
              footer={
                <Stack
                  flexDirection={'row'}
                  gap={1.5}
                  justifyContent={'center'}
                >
                  <StyledButton
                    color={'info'}
                    onClick={() => {
                      deleteClose();
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
              header={'Do you want to delete this campaign?'}
              open={deleteVisible}
            />
            <StyledDialog
              content={
                <Stack my={1.5}>
                  <StyledTextField
                    label={'Campaign name'}
                    onChange={(e) => setCampaignName(e.target.value)}
                    value={campaignName}
                  />
                </Stack>
              }
              footer={
                <Stack
                  flexDirection={'row'}
                  gap={1.5}
                  justifyContent={'center'}
                >
                  <StyledButton
                    color={'info'}
                    onClick={() => {
                      renameClose();
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
              header={'Rename campaign'}
              open={renameVisible}
            />
          </Stack>
        );
      },
    },
  ];
};
