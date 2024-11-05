import { FC } from 'react';
import {
  Icon,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';

import {
  MarketingReportProcessStatusEnum,
  MarketingReportTimeline,
} from '@/types';

import ICON_TIMELINE from './assets/icon_timeline.svg';
import { POSThousandSeparator } from '@/utils/Format';
import { format, parseISO } from 'date-fns';

export interface CampaignMarketingTimelineProps {
  timeline: MarketingReportTimeline[];
  campaignName: string;
}

const TIMELINE_HASH = {
  [MarketingReportProcessStatusEnum.completed]: 'Sending completed',
  [MarketingReportProcessStatusEnum.scheduled]: 'Scheduled',
};

export const CampaignMarketingTimeline: FC<CampaignMarketingTimelineProps> = ({
  timeline = [],
  campaignName = '',
}) => {
  return (
    <Stack
      bgcolor={'#FFFFFF'}
      border={'1px solid #D2D6E1'}
      borderRadius={2}
      flex={1}
      gap={2}
      p={3}
      width={'100%'}
    >
      <Stack alignItems={'center'} flexDirection={'row'} gap={1}>
        <Icon component={ICON_TIMELINE} sx={{ width: 24, height: 24 }} />
        <Typography variant={'subtitle1'}>Timeline</Typography>
      </Stack>

      <Stepper
        connector={null}
        orientation={'vertical'}
        sx={{
          width: '100%',
        }}
      >
        {timeline.map((item, index) => (
          <Step
            active={true}
            expanded={true}
            key={`${campaignName}-${item.endTime}-${index}`}
          >
            <StepLabel
              icon={
                <Stack
                  bgcolor={'#9095A3'}
                  borderRadius={'50%'}
                  height={12}
                  width={12}
                />
              }
            >
              <Stack alignItems={'center'} flexDirection={'row'}>
                <Typography variant={'subtitle1'}>
                  {TIMELINE_HASH[item.status]}
                </Typography>
                <Typography
                  color={'text.secondary'}
                  ml={'auto'}
                  variant={'body3'}
                >
                  {format(parseISO(item.endTime), 'MM/dd/yyyy hh:mm')}
                </Typography>
              </Stack>
            </StepLabel>
            <StepContent
              sx={{
                ml: 0.75,
              }}
            >
              <Stack gap={1} mb={1}>
                {item.status === MarketingReportProcessStatusEnum.scheduled ? (
                  <Typography color={'text.secondary'} variant={'body3'}>
                    The{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {campaignName}
                    </Typography>{' '}
                    campaign is scheduled to start on{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {format(
                        parseISO(item.startTime!),
                        "MMMM dd, yyyy 'at' h:mm a",
                      )}
                    </Typography>
                    . It will send{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {POSThousandSeparator(item.quantity)}
                    </Typography>{' '}
                    emails per day over the course of{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {POSThousandSeparator(item.dayDone)}
                    </Typography>{' '}
                    days.
                  </Typography>
                ) : (
                  <Typography color={'text.secondary'} variant={'body3'}>
                    The{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {campaignName}
                    </Typography>{' '}
                    campaign consists of a total of{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {POSThousandSeparator(item.total)}
                    </Typography>{' '}
                    emails. To date,{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {POSThousandSeparator(item.sent)}
                    </Typography>{' '}
                    emails have been successfully sent, with{' '}
                    <Typography
                      color={'text.primary'}
                      component={'span'}
                      variant={'subtitle3'}
                    >
                      {POSThousandSeparator(item.unsent)}
                    </Typography>{' '}
                    emails failing to deliver.
                  </Typography>
                )}
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};
