import { LayoutSideMenuItem, ServiceType } from './index';
import { RoleTypeEnum } from '@/types';

export const LAYOUT_SIDE_MENU: { [key in ServiceType]: LayoutSideMenuItem[] } =
  {
    [ServiceType.SAAS]: [
      {
        label: 'Organization',
        url: '',
        key: 'Organization',
        children: [
          {
            label: 'General',
            url: '/settings/organization/general',
            key: 'General',
          },
          {
            label: 'Users',
            url: '/settings/organization/team_user',
            key: 'Users',
          },
          {
            label: 'Roles',
            url: '/settings/organization/roles',
            key: 'Roles',
          },
          {
            label: 'Notifications',
            url: '/notifications',
            key: 'Notifications',
          },
          {
            label: 'Plan & Billing',
            url: '/settings/billing',
            key: 'billing',
          },
        ],
      },
      {
        label: 'Account settings',
        url: '/settings/account_settings',
        key: 'Account settings',
      },
    ],
    [ServiceType.WHITE_LABEL]: [
      {
        label: 'Organization',
        url: '',
        key: 'Organization',
        children: [
          {
            label: 'General',
            url: '/settings/organization/general',
            key: 'General',
          },
          {
            label: 'Users',
            url: '/settings/organization/team_user',
            key: 'Users',
          },
        ],
      },
      {
        label: 'Account settings',
        url: '/settings/account_settings',
        key: 'Account settings',
      },
    ],
  };

export const URL_HOME = (domain: string) =>
  `https://${process.env.PREFIX_URL}app.${domain || 'corepass'}.com/`;

export const URL_SETTINGS = (
  domain: string,
  role: RoleTypeEnum | undefined,
) => {
  return role === RoleTypeEnum.ADMIN
    ? `https://${process.env.PREFIX_URL}app.${domain || 'corepass'}.com/settings/organization/general`
    : `https://${process.env.PREFIX_URL}app.${domain || 'corepass'}.com/settings/account_settings`;
};

export const URL_POS = (domain: string) =>
  `https://${process.env.PREFIX_URL}app.${domain || 'corepass'}.com/pos/customers`;
export const URL_LOS = (domain: string) =>
  `https://${process.env.PREFIX_URL}los.${domain || 'corepass'}.com/auth/sign_in`;
export const URL_DOC = (domain: string) =>
  `https://${process.env.PREFIX_URL}doc.${domain || 'corepass'}.com/auth/sign_in`;
export const URL_PRICING = (domain: string) =>
  `https://${process.env.PREFIX_URL}pricing.${domain || 'corepass'}.com`;
export const URL_SERVICING = (domain: string) =>
  `https://${process.env.PREFIX_URL}servicing.${domain || 'corepass'}.com`;
export const URL_CUSTOMER = (domain: string) =>
  `https://${process.env.PREFIX_URL}customers.${domain || 'corepass'}.com`;

export const URL_LOGOUT_REDIRECTION = (domain: string) =>
  domain === 'alamedacapital'
    ? `https://${process.env.PREFIX_ALAMEDA_URL}alamedacapital.com`
    : `https://${process.env.PREFIX_URL}app.${domain || 'corepass'}.com/auth/login/?reload=true&origin=customer`;
