import { StyledGrid } from '@/components/atoms';
import { _getCampaignInfo } from '@/request';
import { CampaignSentTypeEnum } from '@/types';
import { POSFormatDollar, POSFormatPercent } from '@/utils/Format';
import { Icon, Pagination, Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useAsync } from 'react-use';

import ICON_ARROW from './assets/icon_arrow.svg';
import ICON_EMAIL from './assets/icon_email.svg';
import ICON_YES from './assets/icon_yes.svg';
import ICON_NO from './assets/icon_no.svg';
import ICON_COINS from './assets/icon_coins.svg';

type DirectoryEmailCampaignsProps = {
  contactId: string;
};

const SentLabel = {
  [CampaignSentTypeEnum.delivered]: 'Delivered',
  [CampaignSentTypeEnum.undelivered]: 'Undelivered',
};
const SentLabelBgcolor = {
  [CampaignSentTypeEnum.delivered]: 'success.main',
  [CampaignSentTypeEnum.undelivered]: 'text.disabled',
};

export const DirectoryEmailCampaigns: FC<DirectoryEmailCampaignsProps> = ({
  contactId,
}) => {
  const [page, setPage] = useState(0);

  const { value } = useAsync(async () => {
    return await _getCampaignInfo(contactId);
  }, [contactId]);
  const statistical = [
    {
      name: 'Sent',
      value: value?.data?.sent ?? 0,
    },
    {
      name: 'Clicks',
      value: (
        <>
          {typeof value?.data?.sent === 'number' && !!value?.data?.sent
            ? POSFormatPercent(
                (value?.data?.clicks ?? 0) / value?.data?.sent,
                0,
              )
            : 0}{' '}
          <Typography component={'span'} fontSize={14}>
            ({value?.data?.clicks ?? 0})
          </Typography>
        </>
      ),
    },
    {
      name: 'Opens',
      value: value?.data?.opens ?? 0,
    },
    {
      name: 'Undelivered',
      value: (
        <>
          {typeof value?.data?.opens === 'number' && !!value?.data?.opens
            ? POSFormatPercent(
                (value?.data?.undelivered ?? 0) / value?.data?.opens,
                0,
              )
            : 0}{' '}
          <Typography component={'span'} fontSize={14}>
            ({value?.data?.undelivered ?? 0})
          </Typography>
        </>
      ),
    },
    {
      name: 'Customer acquisition cost',
      value: (
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={1}
          justifyContent={'flex-end'}
        >
          <Icon component={ICON_COINS} sx={{ width: 32, height: 32 }} />
          {POSFormatDollar(value?.data?.acquisitionCost ?? 0)}
        </Stack>
      ),
    },
  ];

  const columns: MRT_ColumnDef<Record<string, any>, any>[] = useMemo(() => {
    return [
      {
        accessorKey: 'campaignName',
        header: 'Campaign name',
        // grow: true,
        muiTableBodyCellProps: {
          align: 'left',
        },
        muiTableHeadCellProps: {
          align: 'left',
        },
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
        accessorKey: 'sent',
        header: 'Sent',
        // grow: true,
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ renderedCellValue }) => {
          return (
            <Typography
              bgcolor={
                SentLabelBgcolor[renderedCellValue as CampaignSentTypeEnum]
              }
              borderRadius={1}
              color={'text.white'}
              px={0.5}
              py={'3px'}
              textAlign={'center'}
              variant={'body3'}
              width={81}
            >
              {SentLabel[renderedCellValue as CampaignSentTypeEnum]}
            </Typography>
          );
        },
      },
      {
        accessorKey: 'hasClick',
        header: 'Clicks',
        // grow: true,
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ renderedCellValue }) => {
          return (
            <Icon
              component={renderedCellValue === true ? ICON_YES : ICON_NO}
              sx={{ width: 24, height: 24 }}
            />
          );
        },
      },
      {
        accessorKey: 'hasOpen',
        header: 'Open',
        // grow: true,
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableHeadCellProps: {
          align: 'center',
        },
        Cell: ({ renderedCellValue }) => {
          return (
            <Icon
              component={renderedCellValue === true ? ICON_YES : ICON_NO}
              sx={{ width: 24, height: 24 }}
            />
          );
        },
      },
    ];
  }, []);

  return (
    <Stack gap={2}>
      <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
        <Icon component={ICON_EMAIL} sx={{ width: 20, height: 20 }} />
        <Typography variant={'subtitle1'}>Email campaigns</Typography>
      </Stack>
      <Stack flexDirection={'row'} flexWrap={'wrap'} gap={3}>
        {statistical.map((item, index) => (
          <Stack
            border={'1px solid transparent'}
            flex={index === statistical.length - 1 ? 2 : 1}
            key={index}
            p={3}
            sx={{
              '&:hover': {
                bgcolor: '#FFF7E6',
                borderColor: '#EEB94D',
                borderRadius: 2,
              },
            }}
          >
            <Typography
              textAlign={index === statistical.length - 1 ? 'right' : 'left'}
            >
              {item.name}
            </Typography>
            <Typography component={'div'} variant={'h5'}>
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
        <Icon component={ICON_ARROW} sx={{ width: 18, height: 18 }} />
        <Typography variant={'body3'}>Campaign information</Typography>
      </Stack>
      <Stack alignItems={'flex-end'} border={'1px solid #D2D6E1'}>
        <StyledGrid
          columns={columns}
          data={value?.data?.campaignInfo?.records || []}
          defaultColumn={{
            muiTableBodyCellProps: {
              sx: {
                bgcolor: 'red',
                height: 40,
              },
            },
          }}
          enableColumnResizing={false}
          getRowId={(row) => row.segmentId}
          loading={false}
          muiTableBodyProps={{
            sx: {
              '& .MuiTableCell-root': {
                height: 40,
              },
            },
          }}
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
          onRowClick={async ({ row }) => {
            const { id } = row;
            // await onClickToRedirectToDirectory(id);
          }}
          style={{
            borderBottom: '1px solid #ccc',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        />
        <Pagination
          count={value?.data?.campaignInfo?.pages}
          onChange={(event: ChangeEvent<unknown>, value: number) => {
            // onPageChange?.(value - 1);
            setPage(value - 1);
          }}
          page={page + 1}
          shape="circular"
          siblingCount={0}
          sx={{
            my: 1,
            fontSize: 16,
            '& .MuiPaginationItem-previousNext': {
              color: 'text.primary',
            },
            '& .Mui-disabled svg path': {
              fill: '#cdcdcd',
              '& svg path': {
                fill: 'background.disabled',
              },
            },
            '& .Mui-selected': {
              bgcolor: '#F5F5F5 ',
            },
          }}
          variant="text"
        />
      </Stack>
    </Stack>
  );
};
