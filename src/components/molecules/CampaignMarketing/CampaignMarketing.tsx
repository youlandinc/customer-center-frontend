import { FC, useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

import { AUTO_HIDE_DURATION } from '@/constant';

import {
  CampaignMarketingBaseInfo,
  CampaignMarketingPerformance,
  CampaignMarketingTimeline,
  CampaignMarketingToolbar,
} from './index';

import { _fetchMarketingReportData } from '@/request/campaigns/marketingReport';
import {
  CampaignStatusEnum,
  HttpError,
  MarketingReportBaseInfo,
  MarketingReportPerformance,
  MarketingReportTimeline,
} from '@/types';

interface CampaignMarketingProps {
  campaignId: string | number;
}

export const CampaignMarketing: FC<CampaignMarketingProps> = ({
  campaignId,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [campaignData, setCampaignData] = useState<any>({
    campaignId: campaignId,
    campaignName: 'Campaign Name',
    campaignStatus: CampaignStatusEnum.sending,
  });

  const [baseInfo, setBaseInfo] = useState<MarketingReportBaseInfo>({
    sentOn: '2024-01-01T00:00:00Z',
    subject: '',
    from: '',
  });

  const [timeline, setTimeline] = useState<MarketingReportTimeline[]>([]);

  const [subjectOpt, setSubjectOpt] = useState<Option[]>();

  const [performances, setPerformances] =
    useState<MarketingReportPerformance[]>();

  const [firstLoad, setFirstLoad] = useState(true);

  const { isLoading, mutate } = useSWR(
    { campaignId },
    async ({ campaignId }) => {
      try {
        const {
          data: { campaignName, campaignStatus, info, timeline, performances },
        } = await _fetchMarketingReportData(campaignId);
        setCampaignData({
          campaignId,
          campaignName,
          campaignStatus,
        });

        setBaseInfo(info);

        setTimeline(timeline);

        const opt = performances.map((performance) => ({
          label: performance.subjectName,
          value: performance.subjectId,
          key: performance.subjectId,
        }));

        setSubjectOpt(opt);

        setPerformances(performances);

        //
        //setDeliveryStatistics(deliveryStatistics);
        //setOpenStatistics(openStatistics);
        //setClickStatistics(clickStatistics);
        //setUnsubscribesStatistics(unsubscribesStatistics);
      } catch (err) {
        const { header, message, variant } = err as HttpError;
        enqueueSnackbar(message, {
          variant: variant || 'error',
          autoHideDuration: AUTO_HIDE_DURATION,
          isSimple: !header,
          header,
        });
      } finally {
        setFirstLoad(false);
      }
    },
    { revalidateOnFocus: false },
  );

  return isLoading && firstLoad ? (
    <Stack
      alignItems={'center'}
      height={'calc(100% - 60px)'}
      justifyContent={'center'}
      width={'calc(100% - 245px)'}
    >
      <CircularProgress
        sx={{
          background: 'background.white',
          color: 'action.loading',
        }}
      />
    </Stack>
  ) : (
    <Stack
      gap={3}
      height={'100%'}
      overflow={'auto'}
      px={8}
      py={6}
      width={'100%'}
    >
      <CampaignMarketingToolbar cb={mutate} {...campaignData} />

      <Stack flexDirection={'row'} gap={3} minWidth={1025} width={'100%'}>
        <Stack flexShrink={0} gap={3} height={'fit-content'} width={400}>
          <CampaignMarketingBaseInfo {...baseInfo} />
          <CampaignMarketingTimeline
            campaignName={campaignData.campaignName}
            timeline={timeline}
          />
        </Stack>

        <CampaignMarketingPerformance
          option={subjectOpt}
          performances={performances}
        />
      </Stack>
    </Stack>
  );
};
