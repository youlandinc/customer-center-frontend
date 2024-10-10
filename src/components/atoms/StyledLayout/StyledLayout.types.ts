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
