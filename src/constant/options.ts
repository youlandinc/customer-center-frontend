import { FilterOperationEnum } from '@/types';

export const FILTER_OPERATIONS: TOption[] = [
  {
    label: 'Is equal to',
    value: FilterOperationEnum.equals,
    key: FilterOperationEnum.equals,
  },
  {
    label: 'Is not equal to',
    value: FilterOperationEnum.not,
    key: FilterOperationEnum.not,
  },
  {
    label: 'Contains',
    value: FilterOperationEnum.contains,
    key: FilterOperationEnum.contains,
  },
  {
    label: 'Does not contain',
    value: FilterOperationEnum.not_contains,
    key: FilterOperationEnum.not_contains,
  },
  {
    label: 'Starts with',
    value: FilterOperationEnum.starts_with,
    key: FilterOperationEnum.starts_with,
  },
  {
    label: 'Does not start with',
    value: FilterOperationEnum.not_starts_with,
    key: FilterOperationEnum.not_starts_with,
  },
  {
    label: 'Ends with',
    value: FilterOperationEnum.ends_with,
    key: FilterOperationEnum.ends_with,
  },
  {
    label: 'Does not end with',
    value: FilterOperationEnum.not_ends_with,
    key: FilterOperationEnum.not_ends_with,
  },
];

export const RATE_PROPERTY_STATE: TOption[] = [
  { label: 'Alabama', value: 'AL', key: 'AL' },
  {
    label: 'Alaska',
    value: 'AK',
    key: 'AK',
  },
  { label: 'American Samoa', value: 'AS', key: 'AS' },
  {
    label: 'Arizona',
    value: 'AZ',
    key: 'AZ',
  },
  { label: 'Arkansas', value: 'AR', key: 'AR' },
  {
    label: 'California',
    value: 'CA',
    key: 'CA',
  },
  { label: 'Colorado', value: 'CO', key: 'CO' },
  {
    label: 'Connecticut',
    value: 'CT',
    key: 'CT',
  },
  { label: 'Delaware', value: 'DE', key: 'DE' },
  {
    label: 'District Of Columbia',
    value: 'DC',
    key: 'DC',
  },
  { label: 'Federated States Of Micronesia', value: 'FM', key: 'FM' },
  {
    label: 'Florida',
    value: 'FL',
    key: 'FL',
  },
  { label: 'Georgia', value: 'GA', key: 'GA' },
  {
    label: 'Guam',
    value: 'GU',
    key: 'GU',
  },
  { label: 'Hawaii', value: 'HI', key: 'HI' },
  {
    label: 'Idaho',
    value: 'ID',
    key: 'ID',
  },
  { label: 'Illinois', value: 'IL', key: 'IL' },
  {
    label: 'Indiana',
    value: 'IN',
    key: 'IN',
  },
  { label: 'Iowa', value: 'IA', key: 'IA' },
  {
    label: 'Kansas',
    value: 'KS',
    key: 'KS',
  },
  { label: 'Kentucky', value: 'KY', key: 'KY' },
  {
    label: 'Louisiana',
    value: 'LA',
    key: 'LA',
  },
  { label: 'Maine', value: 'ME', key: 'ME' },
  {
    label: 'Marshall Islands',
    value: 'MH',
    key: 'MH',
  },
  { label: 'Maryland', value: 'MD', key: 'MD' },
  {
    label: 'Massachusetts',
    value: 'MA',
    key: 'MA',
  },
  { label: 'Michigan', value: 'MI', key: 'MI' },
  {
    label: 'Minnesota',
    value: 'MN',
    key: 'MN',
  },
  { label: 'Mississippi', value: 'MS', key: 'MS' },
  {
    label: 'Missouri',
    value: 'MO',
    key: 'MO',
  },
  { label: 'Montana', value: 'MT', key: 'MT' },
  {
    label: 'Nebraska',
    value: 'NE',
    key: 'NE',
  },
  { label: 'Nevada', value: 'NV', key: 'NV' },
  {
    label: 'New Hampshire',
    value: 'NH',
    key: 'NH',
  },
  { label: 'New Jersey', value: 'NJ', key: 'NJ' },
  {
    label: 'New Mexico',
    value: 'NM',
    key: 'NM',
  },
  { label: 'New York', value: 'NY', key: 'NY' },
  {
    label: 'North Carolina',
    value: 'NC',
    key: 'NC',
  },
  { label: 'North Dakota', value: 'ND', key: 'ND' },
  {
    label: 'Northern Mariana Islands',
    value: 'MP',
    key: 'MP',
  },
  { label: 'Ohio', value: 'OH', key: 'OH' },
  {
    label: 'Oklahoma',
    value: 'OK',
    key: 'OK',
  },
  { label: 'Oregon', value: 'OR', key: 'OR' },
  {
    label: 'Palau',
    value: 'PW',
    key: 'PW',
  },
  { label: 'Pennsylvania', value: 'PA', key: 'PA' },
  {
    label: 'Puerto Rico',
    value: 'PR',
    key: 'PR',
  },
  { label: 'Rhode Island', value: 'RI', key: 'RI' },
  {
    label: 'South Carolina',
    value: 'SC',
    key: 'SC',
  },
  { label: 'South Dakota', value: 'SD', key: 'SD' },
  {
    label: 'Tennessee',
    value: 'TN',
    key: 'TN',
  },
  { label: 'Texas', value: 'TX', key: 'TX' },
  {
    label: 'Utah',
    value: 'UT',
    key: 'UT',
  },
  { label: 'Vermont', value: 'VT', key: 'VT' },
  {
    label: 'Virgin Islands',
    value: 'VI',
    key: 'VI',
  },
  { label: 'Virginia', value: 'VA', key: 'VA' },
  {
    label: 'Washington',
    value: 'WA',
    key: 'WA',
  },
  { label: 'West Virginia', value: 'WV', key: 'WV' },
  {
    label: 'Wisconsin',
    value: 'WI',
    key: 'WI',
  },
  { label: 'Wyoming', value: 'WY', key: 'WY' },
];
