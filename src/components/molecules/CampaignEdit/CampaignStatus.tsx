import { FC, useMemo } from 'react';
import { Typography } from '@mui/material';

import { CampaignStatusEnum } from '@/types';

interface CampaignStatusProps {
  campaignStatus: CampaignStatusEnum;
}

export const CampaignStatus: FC<CampaignStatusProps> = ({ campaignStatus }) => {
  const renderContent = useMemo(() => {
    switch (campaignStatus) {
      case CampaignStatusEnum.draft:
        return {
          content: 'Draft',
          color: 'text.secondary',
          bgcolor: '#F0F4FF',
        };
      case CampaignStatusEnum.scheduled:
        return {
          content: 'Scheduled',
          color: '#F4AB18',
          bgcolor: '#FFF3D9',
        };
      case CampaignStatusEnum.sending:
        return {
          content: 'Sending',
          color: '#7849D7',
          bgcolor: 'rgba(120, 73, 215, 0.20)',
        };
      case CampaignStatusEnum.sent:
        return {
          content: 'Sent',
          color: '#43A788',
          bgcolor: 'rgba(105, 192, 165, 0.10)',
        };
      case CampaignStatusEnum.suspended:
        return {
          content: 'Suspended',
          color: '#DE6449',
          bgcolor: '#FFEEEA',
        };
      default:
        return {
          content: '',
          color: 'transparent',
          bgcolor: 'transparent',
        };
    }
  }, [campaignStatus]);

  return (
    <Typography
      bgcolor={renderContent.bgcolor}
      borderRadius={1}
      color={renderContent.color}
      fontSize={12}
      px={1.25}
      py={0.5}
      width={'fit-content'}
    >
      {renderContent.content}
    </Typography>
  );
};
