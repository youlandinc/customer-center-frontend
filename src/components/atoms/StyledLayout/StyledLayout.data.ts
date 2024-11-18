import { LayoutSideMenuItem, ServiceType } from './index';

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
  `https://${process.env.PREFIX_URL}dashboard.${domain || 'youland'}.com/`;

export const URL_POS = (domain: string) =>
  `https://${process.env.PREFIX_URL}dashboard.${domain || 'youland'}.com/pos/customers`;
export const URL_LOS = (domain: string) =>
  `https://${process.env.PREFIX_URL}los.${domain || 'youland'}.com/auth/sign_in`;
export const URL_DOC = (domain: string) =>
  `https://${process.env.PREFIX_URL}doc.${domain || 'youland'}.com/auth/sign_in`;
export const URL_PRICING = (domain: string) =>
  `https://${process.env.PREFIX_URL}pricing.${domain || 'youland'}.com`;
export const URL_SERVICING = (domain: string) =>
  `https://${process.env.PREFIX_URL}servicing.${domain || 'youland'}.com`;
export const URL_CUSTOMER = (domain: string) =>
  `https://${process.env.PREFIX_URL}customers.${domain || 'youland'}.com`;

export const URL_LOGOUT_REDIRECTION = (domain: string) =>
  domain === 'alamedacapital'
    ? `https://${process.env.PREFIX_ALAMEDA_URL}.alamedacapital.com/`
    : `https://${process.env.PREFIX_URL}software.${domain || 'youland'}.com/auth/login/?reload=true&origin=pricing`;
