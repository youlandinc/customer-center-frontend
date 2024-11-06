import { FC, useMemo, useRef, useState } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { MRT_ColumnDef } from 'material-react-table';

import {
  StyledButton,
  StyledGrid,
  StyledProgressCircle,
  StyledTextFieldSearch,
} from '@/components/atoms';
import { CampaignStatus, GridPagination } from '@/components/molecules';

import {
  CampaignData,
  CampaignGridItemData,
  CampaignStatusEnum,
} from '@/types';
import { _fetchCampaignsGirdData } from '@/request';

import ICON_CREATE from './assets/icon_create.svg';
import { POSThousandSeparator } from '@/utils/Format';
import { POSTypeOf } from '@/utils/TypeOf';
import { format, parseISO } from 'date-fns';

export const EmailPage: FC = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 50,
  });

  const { data, isLoading, mutate } = useSWR(
    {
      page: pagination.page,
      size: pagination.size,
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
            onChange={(e) => {}}
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
            columns={genColumns()}
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
            pageCount={0}
            rowCount={0}
            rowsPerPage={pagination.size}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const genColumns = (): MRT_ColumnDef<CampaignGridItemData>[] => {
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
  ];
};
