import { FC, useRef, useState } from 'react';
import { Icon, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { MRT_ColumnDef } from 'material-react-table';

import {
  StyledButton,
  StyledGrid,
  StyledTextFieldSearch,
} from '@/components/atoms';
import { CampaignStatus, GridPagination } from '@/components/molecules';

import { CampaignStatusEnum } from '@/types';
import { _fetchCampaignsGirdData } from '@/request';

import ICON_CREATE from './assets/icon_create.svg';

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
            onRowClick={({ row }) => {
              if (
                [CampaignStatusEnum.sending, CampaignStatusEnum.sent].includes(
                  row.original.campaignStatus,
                )
              ) {
                console.log(123);
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

const genColumns = (): MRT_ColumnDef<any>[] => {
  return [
    {
      header: 'Campaign name',
      accessorKey: 'campaignName',
      muiTableBodyCellProps: { align: 'left' },
      muiTableHeadCellProps: { align: 'left' },
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
              variant={'body3'}
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
            {renderedCellValue}
          </Typography>
        );
      },
    },
    {
      header: 'Sent',
      accessorKey: 'sentRate',
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
            {renderedCellValue}
          </Typography>
        );
      },
    },
    {
      header: 'Unique opens',
      accessorKey: 'openRate',
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
            {renderedCellValue}
          </Typography>
        );
      },
    },
    {
      header: 'Unique clicks',
      accessorKey: 'clickRate',
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
            {renderedCellValue}
          </Typography>
        );
      },
    },
  ];
};
