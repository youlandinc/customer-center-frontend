import { FC } from 'react';
import { Stack, Typography } from '@mui/material';

import { MarketingReportBaseInfo } from '@/types';
import { format, parseISO } from 'date-fns';

type CampaignMarketingBaseInfoProps = MarketingReportBaseInfo;

export const CampaignMarketingBaseInfo: FC<CampaignMarketingBaseInfoProps> = ({
  sentOn,
  subject,
  from,
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
      <Stack>
        <Typography color={'text.secondary'} variant={'body3'}>
          Sent on
        </Typography>
        <Typography variant={'subtitle2'}>
          {format(parseISO(sentOn as string), "MMMM dd, yyyy 'at' h:mm a")}
        </Typography>
      </Stack>

      <Stack>
        <Typography color={'text.secondary'} variant={'body3'}>
          Subject
        </Typography>
        <Typography variant={'subtitle2'}>{subject}</Typography>
      </Stack>

      <Stack>
        <Typography color={'text.secondary'} variant={'body3'}>
          From
        </Typography>
        <Typography variant={'subtitle2'}>{from}</Typography>
      </Stack>
    </Stack>
  );
};
