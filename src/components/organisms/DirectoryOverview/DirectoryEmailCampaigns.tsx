import { useSwitch } from '@/hooks';
import { Collapse, Icon, Pagination, Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useAsync } from 'react-use';

import { StyledGrid } from '@/components/atoms';

import { _getCampaignInfo } from '@/request';
import { CampaignSentTypeEnum } from '@/types';
import { POSFormatDollar, POSFormatPercent } from '@/utils/Format';

import ICON_ARROW from './assets/icon_arrow.svg';
import ICON_EMAIL from './assets/icon_email.svg';
import ICON_YES from './assets/icon_yes.svg';
import ICON_NO from './assets/icon_no.svg';

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
  const { visible, open, close } = useSwitch(true);

  const { value } = useAsync(async () => {
    return await _getCampaignInfo({ contactId, page: page, size: 10 });
  }, [contactId, page]);

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
      <Stack component={'ul'} flexDirection={'row'} flexWrap={'wrap'} gap={3}>
        <Stack component={'li'} flex={1} p={3}>
          <Typography>Sent</Typography>
          <Typography component={'div'} variant={'h5'}>
            {value?.data?.sent ?? 0}
          </Typography>
        </Stack>
        <Stack component={'li'} flex={1} minWidth={130} p={3}>
          <Typography>Clicks</Typography>
          <Typography component={'div'} variant={'h5'}>
            {typeof value?.data?.sent === 'number' && !!value?.data?.sent
              ? POSFormatPercent(
                  (value?.data?.clicks ?? 0) / value?.data?.sent,
                  0,
                )
              : 0}{' '}
            <Typography component={'span'} fontSize={14}>
              ({value?.data?.clicks ?? 0})
            </Typography>
          </Typography>
        </Stack>
        <Stack component={'li'} flex={1} p={3}>
          <Typography>Opens</Typography>
          <Typography component={'div'} variant={'h5'}>
            {value?.data?.opens ?? 0}
          </Typography>
        </Stack>
        <Stack component={'li'} flex={1} p={3}>
          <Typography>Undelivered</Typography>
          <Typography component={'div'} variant={'h5'}>
            {typeof value?.data?.opens === 'number' && !!value?.data?.opens
              ? POSFormatPercent(
                  (value?.data?.undelivered ?? 0) / value?.data?.opens,
                  0,
                )
              : 0}{' '}
            <Typography component={'span'} fontSize={14}>
              ({value?.data?.undelivered ?? 0})
            </Typography>
          </Typography>
        </Stack>
        <Stack component={'li'} minWidth={270} p={3}>
          <Typography textAlign={'right'}>Customer acquisition cost</Typography>
          <Typography component={'div'} textAlign={'right'} variant={'h5'}>
            {POSFormatDollar(value?.data?.acquisitionCost ?? 2)}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        alignItems={'center'}
        flexDirection={'row'}
        gap={1}
        onClick={() => {
          visible ? close() : open();
        }}
        sx={{ cursor: 'pointer' }}
      >
        <Icon
          component={ICON_ARROW}
          sx={{
            width: 18,
            height: 18,
            transform: visible ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'all .3s',
          }}
        />
        <Typography variant={'body3'}>Campaign information</Typography>
      </Stack>
      <Collapse in={visible}>
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
            style={{
              borderBottom: '1px solid #ccc',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          />
          <Pagination
            count={value?.data?.campaignInfo?.pages}
            onChange={(_event: ChangeEvent<unknown>, value: number) => {
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
      </Collapse>
    </Stack>
  );
};
