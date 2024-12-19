import { FC, useCallback, useMemo, useState } from 'react';
import { Box, Collapse, Icon, Stack, Tooltip, Typography } from '@mui/material';
import { format, isValid } from 'date-fns';

import { POSThousandSeparator } from '@/utils/Format';

import { StyledSelect } from '@/components/atoms';

import { MarketingReportPerformance } from '@/types';

import ICON_PERFORMANCE from './assets/icon_performance.svg';
import ICON_ARROW from './assets/icon_arrow.svg';
import ICON_INFO from './assets/icon_info.svg';

export interface CampaignMarketingPerformance {
  performances?: MarketingReportPerformance[];
  option?: Option[];
}

export const CampaignMarketingPerformance: FC<CampaignMarketingPerformance> = ({
  performances = [],
  option = [],
}) => {
  const [expandedTarget, setExpandedTarget] = useState('');
  const [selectedValue, setSelectedValue] = useState('-1L');

  const onClickToExpand = useCallback(
    (target: string) => {
      if (expandedTarget === target) {
        setExpandedTarget('');
      } else {
        setExpandedTarget(target);
      }
    },
    [expandedTarget],
  );

  const performance = useMemo(() => {
    const result = performances.find(
      (item) => item.subjectId === selectedValue,
    );
    return result;
  }, [performances, selectedValue]);

  return (
    <Stack
      bgcolor={'#FFFFFF'}
      border={'1px solid #D2D6E1'}
      borderRadius={2}
      flex={1}
      gap={2}
      height={'fit-content'}
      p={3}
      width={'100%'}
    >
      <Stack alignItems={'center'} flexDirection={'row'} gap={3}>
        <Stack flexDirection={'row'} gap={1}>
          <Icon component={ICON_PERFORMANCE} sx={{ width: 24, height: 24 }} />
          <Typography variant={'subtitle1'}>Campaign performance</Typography>
        </Stack>
        <StyledSelect
          label={'Subject line'}
          onChange={(e) => setSelectedValue(e.target.value as string)}
          options={option}
          size={'small'}
          sx={{ maxWidth: 600, ml: 'auto' }}
          value={selectedValue}
        />
      </Stack>

      <Stack borderBottom={'1px solid #D2D6E1'} mt={2} pb={2}>
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          onClick={() => {
            onClickToExpand('deliverability');
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Icon
            component={ICON_ARROW}
            sx={{
              width: 18,
              height: 18,
              mr: 1,
              transform: `rotate(${expandedTarget === 'deliverability' ? '0' : '-.25turn'})`,
              transition: 'transform 0.3s',
            }}
          />
          <Typography>Deliverability</Typography>

          <Stack
            alignItems={'center'}
            flexDirection={'row'}
            gap={3}
            ml={'auto'}
          >
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Delivered to
              <Typography variant={'h6'}>
                {POSThousandSeparator(
                  performance?.deliveryStatistics?.deliveredTo,
                )}
              </Typography>
            </Stack>
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Delivery rate
              <Typography variant={'h6'}>
                {performance?.deliveryStatistics?.deliveryRate + '%'}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Collapse in={expandedTarget === 'deliverability'}>
          <Stack
            bgcolor={'#F8F9FC'}
            borderRadius={2}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={3}
            mt={1.5}
            px={3}
            py={1.5}
            width={'100%'}
          >
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Sent to
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(performance?.deliveryStatistics?.sentTo)}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Delivered to
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.deliveryStatistics?.deliveredTo,
                )}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Delivery rate
              </Typography>
              <Typography variant={'subtitle1'}>
                {performance?.deliveryStatistics?.deliveryRate + '%'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Soft bounces
                <Tooltip
                  arrow
                  title={
                    "The term soft bounce is used to describe an email that has bounced back to the sender, undelivered to the intended recipient due to a temporary problem (ex: the recipient's server is unavailable or his inbox is full)."
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.deliveryStatistics?.softBounces,
                )}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Hard bounces
                <Tooltip
                  arrow
                  title={
                    'The term hard bounce is used to describe an email that has bounced back to the sender, undelivered to the intended recipient due to a permanent problem (ex: non-existent address or blocked email address).'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.deliveryStatistics?.hardBounces,
                )}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
      </Stack>

      <Stack borderBottom={'1px solid #D2D6E1'} pb={2}>
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          onClick={() => {
            onClickToExpand('opens');
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Icon
            component={ICON_ARROW}
            sx={{
              width: 18,
              height: 18,
              mr: 1,
              transform: `rotate(${expandedTarget === 'opens' ? '0' : '-.25turn'})`,
              transition: 'transform 0.3s',
            }}
          />
          <Typography>Opens</Typography>

          <Stack
            alignItems={'center'}
            flexDirection={'row'}
            gap={3}
            ml={'auto'}
          >
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Total opens
              <Typography variant={'h6'}>
                {POSThousandSeparator(
                  performance?.openStatistics?.estimatedOpens,
                )}
              </Typography>
            </Stack>
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Unique open rate
              <Typography variant={'h6'}>
                {performance?.openStatistics?.uniqueOpenRate + '%'}
                <Typography component={'span'} variant={'body2'}>
                  (
                  {POSThousandSeparator(
                    performance?.openStatistics?.uniqueOpens,
                  )}
                  )
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Collapse in={expandedTarget === 'opens'}>
          <Stack
            bgcolor={'#F8F9FC'}
            borderRadius={2}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={3}
            mt={1.5}
            px={3}
            py={1.5}
            width={'100%'}
          >
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Unique open rate
                <Tooltip
                  arrow
                  title={
                    'Unique Open Rate refers to the percentage of emails opened by unique recipients out of the total sent.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {performance?.openStatistics?.uniqueOpenRate + '%'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Unique opens
                <Tooltip
                  arrow
                  title={
                    'Unique Opens refers to the number of times an email is opened by different recipients. Even if a recipient opens the same email multiple times, it is counted as a single open. '
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(performance?.openStatistics?.uniqueOpens)}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Total opens
                <Tooltip
                  arrow
                  title={
                    'Total number of email opens. For example, if a recipient opens an email 3 times, this will be counted as 3 opens.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(performance?.openStatistics?.totalOpens)}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Average time to open
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.openStatistics?.averageTimeToOpen,
                ) + 'min'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Untrackable contacts
                <Tooltip
                  arrow
                  title={
                    'Contacts whose email opens cannot be tracked. This may happen if the recipient has disabled image display  or if their email service does not support open tracking.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.openStatistics?.unTrackableContacts,
                )}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
      </Stack>

      <Stack borderBottom={'1px solid #D2D6E1'} pb={2}>
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          onClick={() => {
            onClickToExpand('clicks');
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Icon
            component={ICON_ARROW}
            sx={{
              width: 18,
              height: 18,
              mr: 1,
              transform: `rotate(${expandedTarget === 'clicks' ? '0' : '-.25turn'})`,
              transition: 'transform 0.3s',
            }}
          />
          <Typography>Clicks</Typography>

          <Stack
            alignItems={'center'}
            flexDirection={'row'}
            gap={3}
            ml={'auto'}
          >
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Unique clicks
              <Typography variant={'h6'}>
                {POSThousandSeparator(
                  performance?.clickStatistics?.uniqueClicks,
                )}
              </Typography>
            </Stack>
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Click-through rate
              <Typography variant={'h6'}>
                {performance?.clickStatistics?.clickThoughRate + '%'}
                <Typography component={'span'} variant={'body2'}>
                  (
                  {POSThousandSeparator(
                    performance?.clickStatistics?.uniqueClicks,
                  )}
                  )
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Collapse in={expandedTarget === 'clicks'}>
          <Stack
            bgcolor={'#F8F9FC'}
            borderRadius={2}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={3}
            mt={1.5}
            px={3}
            py={1.5}
            width={'100%'}
          >
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Click-through rate
              </Typography>
              <Typography variant={'subtitle1'}>
                {performance?.clickStatistics?.clickThoughRate + '%'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Total clicks
                <Tooltip
                  arrow
                  title={
                    'Total number of clicks on the links in the email. For example, if a recipient clicks on a link in the email 3 times, it will be counted as 3 clicks.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.clickStatistics?.totalClicks,
                )}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Unique clicks
                <Tooltip
                  arrow
                  title={
                    'Unique number of clicks on the links in the email. For example, if a recipient clicks on a link in the email 3 times, it will be counted as 1 unique click on that link.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.clickStatistics?.uniqueClicks,
                )}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Click-to-open rate
                <Tooltip
                  arrow
                  title={
                    'Number of clicks divided by the number of opens. A high click-to-open rate indicates that the message successfully captured the attention of its recipients.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {performance?.clickStatistics?.clickToOpenRate + '%'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Average time to click
                <Tooltip
                  arrow
                  title={
                    'Average time from when the email is opened to when its links are clicked.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.clickStatistics?.averageTimeToClick,
                ) + 'min'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Last click
                <Tooltip
                  arrow
                  title={
                    "The time of the user's last click on the link after receiving the email."
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {isValid(performance?.clickStatistics?.lastClick)
                  ? format(
                      new Date(
                        performance?.clickStatistics?.lastClick as string,
                      ),
                      'MM/dd/yyyy',
                    )
                  : '-'}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
      </Stack>

      <Stack>
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          onClick={() => {
            onClickToExpand('unsubscribes');
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Icon
            component={ICON_ARROW}
            sx={{
              width: 18,
              height: 18,
              mr: 1,
              transform: `rotate(${expandedTarget === 'unsubscribes' ? '0' : '-.25turn'})`,
              transition: 'transform 0.3s',
            }}
          />
          <Typography>Unsubscribes</Typography>

          <Stack
            alignItems={'center'}
            flexDirection={'row'}
            gap={3}
            ml={'auto'}
          >
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Unsubscribes
              <Typography variant={'h6'}>
                {POSThousandSeparator(
                  performance?.unsubscribesStatistics?.unsubscribes,
                )}
              </Typography>
            </Stack>
            <Stack
              alignItems={'center'}
              color={'text.primary'}
              flexDirection={'row'}
              fontSize={14}
              gap={1}
              justifyContent={'flex-end'}
              minWidth={{ xs: 'auto', xxl: 320 }}
            >
              Unsubscribe rate
              <Typography variant={'h6'}>
                {performance?.unsubscribesStatistics?.unsubscribeRate + '%'}
                <Typography component={'span'} variant={'body2'}>
                  (
                  {POSThousandSeparator(
                    performance?.unsubscribesStatistics?.unsubscribes,
                  )}
                  )
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Collapse in={expandedTarget === 'unsubscribes'}>
          <Stack
            bgcolor={'#F8F9FC'}
            borderRadius={2}
            flexDirection={'row'}
            flexWrap={'wrap'}
            gap={3}
            mt={1.5}
            px={3}
            py={1.5}
            width={'100%'}
          >
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Unsubscribes
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.unsubscribesStatistics?.unsubscribes,
                )}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Unsubscribe rate
              </Typography>
              <Typography variant={'subtitle1'}>
                {performance?.unsubscribesStatistics?.unsubscribeRate + '%'}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Spam complaints
                <Tooltip
                  arrow
                  title={
                    'Number of recipients who mark your emails as spam, affecting your sender reputation and email deliverability. If campaigns have a high complaint rate, action will be recommended for your account.'
                  }
                >
                  <Box component={'span'} height={20} ml={0.5} width={20}>
                    <Icon
                      component={ICON_INFO}
                      sx={{ width: 20, height: 20, verticalAlign: 'middle' }}
                    />
                  </Box>
                </Tooltip>
              </Typography>
              <Typography variant={'subtitle1'}>
                {POSThousandSeparator(
                  performance?.unsubscribesStatistics?.spamComplaints,
                )}
              </Typography>
            </Stack>
            <Stack flex={1} gap={1} minWidth={200} p={1}>
              <Typography color={'text.secondary'} variant={'body2'}>
                Spam complaint rate
              </Typography>
              <Typography variant={'subtitle1'}>
                {performance?.unsubscribesStatistics?.spamComplaintRate + '%'}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
};
