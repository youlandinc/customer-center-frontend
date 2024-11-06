import { FC, useState } from 'react';
import { CircularProgress, Stack } from '@mui/material';

import {
  CampaignMarketingBaseInfo,
  CampaignMarketingPerformance,
  CampaignMarketingTimeline,
  CampaignMarketingToolbar,
} from './index';

import {
  CampaignStatusEnum,
  HttpError,
  MarketingReportBaseInfo,
  MarketingReportClickStatistics,
  MarketingReportDeliveryStatistics,
  MarketingReportOpenStatistics,
  MarketingReportTimeline,
  MarketingReportUnsubscribeStatistics,
} from '@/types';
import { _fetchMarketingReportData } from '@/request/campaigns/marketingReport';
import { AUTO_HIDE_DURATION } from '@/constant';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

interface CampaignMarketingProps {
  campaignId: string | number;
}

export const CampaignMarketing: FC<CampaignMarketingProps> = ({
  campaignId,
}) => {
  const router = useRouter();
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

  const [deliveryStatistics, setDeliveryStatistics] =
    useState<MarketingReportDeliveryStatistics>({
      sentTo: 0,
      deliveredTo: 0,
      deliveryRate: 0,
      softBounces: 0,
      hardBounces: 0,
    });
  const [openStatistics, setOpenStatistics] =
    useState<MarketingReportOpenStatistics>({
      estimatedOpens: 0,
      trackableOpens: 0,
      trackableOpenRate: 0,
      totalOpens: 0,
      averageTimeToOpen: 0,
      unTrackableContacts: 0,
    });
  const [clickStatistics, setClickStatistics] =
    useState<MarketingReportClickStatistics>({
      lastClick: '2024-01-01T00:00:00Z',
      totalClicks: 0,
      uniqueClicks: 0,
      clickThoughRate: 0,
      clickToOpenRate: 0,
      averageTimeToClick: 0,
    });
  const [unsubscribesStatistics, setUnsubscribesStatistics] =
    useState<MarketingReportUnsubscribeStatistics>({
      unsubscribes: 0,
      unsubscribeRate: 0,
      spamComplaints: 0,
      spamComplaintRate: 0,
    });

  const [firstLoad, setFirstLoad] = useState(true);

  const { isLoading, mutate } = useSWR(
    { campaignId },
    async ({ campaignId }) => {
      try {
        const {
          data: {
            campaignName,
            campaignStatus,
            info,
            timeline,
            performance: {
              deliveryStatistics,
              openStatistics,
              clickStatistics,
              unsubscribesStatistics,
            },
          },
        } = await _fetchMarketingReportData(campaignId);
        setCampaignData({
          campaignId,
          campaignName,
          campaignStatus,
        });

        setBaseInfo(info);

        setTimeline(timeline);

        setDeliveryStatistics(deliveryStatistics);
        setOpenStatistics(openStatistics);
        setClickStatistics(clickStatistics);
        setUnsubscribesStatistics(unsubscribesStatistics);
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

  return (
    <Stack
      gap={3}
      height={'100%'}
      overflow={'auto'}
      px={8}
      py={6}
      width={'100%'}
    >
      {isLoading && firstLoad ? (
        <CircularProgress
          sx={{
            background: 'background.white',
            color: 'action.loading',
          }}
        />
      ) : (
        <>
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
              clickStatistics={clickStatistics}
              deliveryStatistics={deliveryStatistics}
              openStatistics={openStatistics}
              unsubscribesStatistics={unsubscribesStatistics}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};
