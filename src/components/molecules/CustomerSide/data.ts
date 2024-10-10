import ICON_CONTACTS from './assets/icon_contacts.svg';
import ICON_CAMPAIGNS from './assets/icon_campaigns.svg';

export const MENU_CONFIG = [
  {
    label: 'CONTACTS',
    icon: ICON_CONTACTS,
    children: [
      {
        label: 'Directory',
        url: '/contacts/directory',
      },
      {
        label: 'Segments',
        url: '/contacts/segments',
      },
    ],
  },
  {
    label: 'CAMPAIGNS',
    icon: ICON_CAMPAIGNS,
    children: [
      {
        label: 'Email',
        url: '/campaigns/email',
      },
    ],
  },
];
