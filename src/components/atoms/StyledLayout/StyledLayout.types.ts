export enum ServiceType {
  SAAS = 'SAAS',
  WHITE_LABEL = 'WHITE_LABEL',
}

export interface LayoutSideMenuItem {
  label: string;
  url: string;
  key: string;
  children?: LayoutSideMenuItem[];
}

export enum LayoutProductTypeEnums {
  pos = 'POS',
  los = 'LOS',
  doc = 'DOC_ENGINE',
  pricing = 'PRICING_ENGINE',
  servicing = 'SERVICING_CENTER',
  customer = 'CUSTOMER_CENTER',
}
