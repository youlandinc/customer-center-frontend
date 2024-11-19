import { FC, ReactNode, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import {
  Avatar,
  Icon,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  LayoutProductTypeEnums,
  URL_DOC,
  URL_HOME,
  URL_LOS,
  URL_POS,
  URL_PRICING,
  URL_SERVICING,
} from './index';
import { useSwitch } from '@/hooks';

import { StyledButton, StyledDialog } from '@/components/atoms';

import LOGO_PRODUCT_BOX from './assets/logo_product_box.svg';
import LOGO_PRODUCT_HOME from './assets/logo_product_home.svg';
import LOGO_PRODUCT_POS from './assets/logo_product_pos.svg';
import LOGO_PRODUCT_LOS from './assets/logo_product_los.svg';
import LOGO_PRODUCT_DOC from './assets/logo_product_doc.svg';
import LOGO_PRODUCT_PRICE from './assets/logo_product_price.svg';
import LOGO_PRODUCT_SERVING from './assets/logo_product_serving.svg';
import LOGO_PRODUCT_CUSTOMER from './assets/logo_product_customer.svg';

//import LOGO_HEADER_POS from './assets/logo_header_pos.svg';
//import LOGO_HEADER_LOS from './assets/logo_header_los.svg';
//import LOGO_HEADER_DOC from './assets/logo_header_doc.svg';
//import LOGO_HEADER_PRICE from './assets/logo_header_price.svg';
//import LOGO_HEADER_SERVING from './assets/logo_header_serving.svg';
import LOGO_HEADER_CUSTOMER from './assets/logo_header_customer.svg';
import LOGO_HEADER_SETTING from './assets/logo_header_setting.svg';

import LOGO_SETTING from './assets/logo_auth_setting.svg';
import LOGO_SIGN_OUT from './assets/logo_auth_out.svg';

import { useUserStore } from '@/providers';
import { SystemLogout } from '@/utils';

export interface LayoutHeaderProps {
  isHomepage: boolean;
  actions?: ReactNode;
}

export const StyledLayoutHeader: FC<LayoutHeaderProps> = ({
  isHomepage = false,
  //actions,
}) => {
  const { setting, accessToken, licensedProduct, initialized, domain } =
    useUserStore((state) => state);

  const router = useRouter();
  const pathname = usePathname();

  const { visible, open, close } = useSwitch(false);

  const [anchorElProduct, setAnchorElProduct] = useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const productList = useMemo(() => {
    if (!initialized) {
      return [];
    }

    const productsData: Record<string, any> = {
      [LayoutProductTypeEnums.pos]: {
        label: 'Point of Sale',
        url: `${URL_POS(domain)}/?token=${
          accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_POS} sx={{ width: 32, height: 32 }} />
        ),
      },
      [LayoutProductTypeEnums.los]: {
        label: 'Loan Origination System',
        url: `${URL_LOS(domain)}/?token=${
          accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_LOS} sx={{ width: 32, height: 32 }} />
        ),
      },
      [LayoutProductTypeEnums.pricing]: {
        label: 'Pricing Engine',
        url: `${URL_PRICING(domain)}/?token=${
          accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_PRICE} sx={{ width: 32, height: 32 }} />
        ),
      },
      [LayoutProductTypeEnums.doc]: {
        label: 'Document Engine',
        url: `${URL_DOC(domain)}/?token=${
          accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_DOC} sx={{ width: 32, height: 32 }} />
        ),
      },
      [LayoutProductTypeEnums.servicing]: {
        label: 'Servicing Center',
        url: `${URL_SERVICING(domain)}/?token=${
          accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon
            component={LOGO_PRODUCT_SERVING}
            sx={{ width: 32, height: 32 }}
          />
        ),
      },
      [LayoutProductTypeEnums.customer]: {
        label: 'Customer Center',
        url: '/contacts/directory',
        icon: (
          <Icon
            component={LOGO_PRODUCT_CUSTOMER}
            sx={{ width: 32, height: 32 }}
          />
        ),
      },
    };

    const productsKeys = Object.keys(productsData);
    return licensedProduct.map(
      (item) =>
        productsKeys.includes(item.productType) &&
        productsData[item.productType],
    );
  }, [initialized, domain, accessToken, licensedProduct]);

  const avatarName = useMemo(() => {
    if (!initialized) {
      return '';
    }
    const target =
      setting?.userInfo?.firstName?.[0] + setting?.userInfo?.lastName?.[0] ||
      '';
    const result = target.match(/[a-zA-Z]+/g);
    return result ? result[0] : '';
  }, [initialized, setting?.userInfo?.firstName, setting?.userInfo?.lastName]);

  const avatarUrl = useMemo(() => {
    if (!initialized) {
      return '/images/pos/placeholder_avatar.png';
    }
    if (!setting?.userInfo?.avatar) {
      if (!avatarName) {
        return '/images/pos/placeholder_avatar.png';
      }
      return '';
    }
    return setting?.userInfo?.avatar;
  }, [avatarName, initialized, setting?.userInfo?.avatar]);

  const avatarFullName = useMemo(() => {
    return !initialized
      ? ''
      : `${
          setting?.userInfo?.firstName ? `${setting?.userInfo?.firstName} ` : ''
        }${setting?.userInfo?.lastName}`;
  }, [initialized, setting?.userInfo?.firstName, setting?.userInfo?.lastName]);

  return (
    <>
      <Stack
        alignItems={'center'}
        bgcolor={'background.white'}
        borderBottom={'1px solid'}
        borderColor={'border.normal'}
        flexDirection={'row'}
        height={'60px'}
        justifyContent={'space-between'}
        px={6}
        sx={{
          transition: 'all .3s',
          position: 'sticky',
          top: 0,
          boxShadow: 'none',
          zIndex: 999,
          minWidth: '100%',
        }}
      >
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={6}
          height={'100%'}
        >
          <Icon
            component={LOGO_PRODUCT_BOX}
            onClick={(e: any) => {
              setAnchorElProduct(anchorElProduct ? null : e.currentTarget);
              setAnchorElUser(null);
            }}
            sx={{
              width: 32,
              height: 32,
              maxHeight: 32,
              maxWidth: 32,
              cursor: 'pointer',
              transition: 'all .3s',
            }}
          />
          {/*according to different product replace counterpart icon*/}
          <Icon
            component={isHomepage ? LOGO_HEADER_SETTING : LOGO_HEADER_CUSTOMER}
            sx={{ height: '24px', width: 'auto' }}
          />

          {/*{!isHomepage && (*/}
          {/*  <Stack*/}
          {/*    alignItems={'center'}*/}
          {/*    component={'ul'}*/}
          {/*    flexDirection={'row'}*/}
          {/*    gap={6}*/}
          {/*    height={'100%'}*/}
          {/*  >*/}
          {/*    {LAYOUT_HEADER_TAB.map((item, index) => (*/}
          {/*      <Stack*/}
          {/*        className={*/}
          {/*          pathname === item.url || pathname.includes('loan')*/}
          {/*            ? 'active'*/}
          {/*            : ''*/}
          {/*        }*/}
          {/*        color={'text.primary'}*/}
          {/*        component={'li'}*/}
          {/*        fontSize={14}*/}
          {/*        fontWeight={600}*/}
          {/*        height={'100%'}*/}
          {/*        justifyContent={'center'}*/}
          {/*        key={`${item.label}_${index}`}*/}
          {/*        mx={3}*/}
          {/*        onClick={() => router.push(item.url)}*/}
          {/*        position={'relative'}*/}
          {/*        sx={{*/}
          {/*          cursor: 'pointer',*/}
          {/*          '&:hover': { color: 'primary.main' },*/}
          {/*          '&.active': {*/}
          {/*            color: 'primary.darker',*/}
          {/*            '&::after': {*/}
          {/*              content: '""',*/}
          {/*              display: 'block',*/}
          {/*              position: 'absolute',*/}
          {/*              bottom: 0,*/}
          {/*              left: 0,*/}
          {/*              width: '100%',*/}
          {/*              height: '4px',*/}
          {/*              bgcolor: 'primary.darker',*/}
          {/*              borderRadius: 3,*/}
          {/*            },*/}
          {/*          },*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        {item.label}*/}
          {/*      </Stack>*/}
          {/*    ))}*/}
          {/*    {actions}*/}
          {/*  </Stack>*/}
          {/*)}*/}
        </Stack>

        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={3}
          height={'100%'}
        >
          {pathname !== '/' && (
            <Tooltip
              PopperProps={{
                sx: { zIndex: '99999 !important', maxWidth: 144 },
              }}
              title={'Settings'}
            >
              <Stack
                height={24}
                onClick={() =>
                  router.push(
                    `${URL_HOME(domain)}/settings/organization/general/${
                      accessToken ||
                      localStorage?.getItem('USER_LOGIN_INFORMATION')
                    }`,
                  )
                }
                width={24}
              >
                <Icon
                  component={LOGO_SETTING}
                  sx={{
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                  }}
                />
              </Stack>
            </Tooltip>
          )}

          <Stack
            alignItems={'center'}
            flexBasis={192}
            flexDirection={'row'}
            fontSize={14}
            gap={1.5}
            height={'100%'}
            onClick={(e) => {
              setAnchorElUser(anchorElUser ? null : e.currentTarget);
              setAnchorElProduct(null);
            }}
            px={3}
            sx={{ cursor: 'pointer' }}
          >
            <Avatar
              src={avatarUrl}
              sx={{
                bgcolor: setting?.userInfo?.backgroundColor,
                width: 30,
                height: 30,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {avatarName}
            </Avatar>

            <Tooltip
              placement={'bottom-start'}
              PopperProps={{
                sx: { zIndex: '99999 !important', maxWidth: 144 },
                [`${anchorElUser && 'open'}`]: !anchorElUser,
              }}
              title={`${setting?.userInfo?.name}`}
            >
              <Stack width={144}>
                <Typography
                  color={'text.primary'}
                  fontSize={12}
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  variant={'subtitle1'}
                >
                  {avatarFullName}
                </Typography>
                <Typography color={'info.main'} variant={'body3'}>
                  {setting?.roles?.[0]?.description}
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>

      {/*product box*/}
      <Popover
        anchorEl={anchorElProduct}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        anchorReference={'anchorEl'}
        id={'LAYOUT_HEADER_PRODUCT_POPOVER'}
        onClose={() => setAnchorElProduct(null)}
        open={Boolean(anchorElProduct)}
        slotProps={{
          paper: {
            sx: {
              px: 3,
              pt: 3,
              pb: 6,
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'border.normal',
              borderRadius: 4,
              mt: 5,
            },
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          mb={3}
        >
          <Typography variant={'h7'}>Switch to</Typography>
          <Icon
            component={LOGO_PRODUCT_HOME}
            onClick={() =>
              router.push(
                `${URL_HOME(domain)}/auth/sign_in/${
                  accessToken || localStorage?.getItem('USER_LOGIN_INFORMATION')
                }`,
              )
            }
            sx={{
              cursor: 'pointer',
              '&:hover': {
                path: {
                  stroke: '#5C7CD0',
                },
              },
            }}
          />
        </Stack>
        <Stack gap={3}>
          {productList?.map((item, index) => (
            <Stack
              alignItems={'center'}
              alignSelf={'stretch'}
              border={'2px solid'}
              borderColor={'border.hover'}
              borderRadius={2}
              flexDirection={'row'}
              gap={1.5}
              key={`${item.label}_${index}`}
              onClick={async () => {
                window.open(item.url, '_blank');
                setAnchorElProduct(null);
              }}
              p={1.5}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.light',
                  borderColor: 'primary.contrastBackground',
                },
              }}
              width={352}
            >
              {item.icon}
              <Typography variant={'subtitle1'}>{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>

      {/*user setting*/}
      <Popover
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        //anchorReference={'anchorEl'}
        id={'LAYOUT_HEADER_USER_POPOVER'}
        onClose={() => setAnchorElUser(null)}
        open={Boolean(anchorElUser)}
        slotProps={{
          paper: {
            sx: {
              boxShadow:
                '0px 10px 10px 0px rgba(17, 52, 227, 0.10), 0px 0px 2px 0px rgba(17, 52, 227, 0.10)',
              ml: 3.5,
              mt: 3,
              borderRadius: 2,
            },
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={1.25}
          onClick={open}
          px={0.5}
          py={1.75}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              path: {
                fill: '#5B76BC',
              },
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            },
          }}
          width={180}
        >
          <Icon
            component={LOGO_SIGN_OUT}
            sx={{ height: 24, width: 24, ml: 1.25 }}
          />
          <Typography color={'inherit'} variant={'body2'}>
            Sign out
          </Typography>
        </Stack>
      </Popover>

      <StyledDialog
        content={
          <Typography color={'info.main'} py={3}>
            Sign out of current account?
          </Typography>
        }
        disableEscapeKeyDown={true}
        footer={
          <Stack flexDirection={'row'} gap={1.5}>
            <StyledButton
              color={'info'}
              onClick={close}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              onClick={() => {
                close();
                return SystemLogout();
              }}
              size={'small'}
            >
              Confirm
            </StyledButton>
          </Stack>
        }
        header={'Sign out'}
        onClose={close}
        open={visible}
      />
    </>
  );
};
