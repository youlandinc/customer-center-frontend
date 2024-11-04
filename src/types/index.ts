export * from './enums';
export * from './contacts';
export * from './campaigns';

export enum HttpErrorType {
  tokenExpired = '40001',
}

export enum HttpVariant {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
}

export interface HttpError {
  message: string;
  header: string;
  variant: HttpVariant;
}

export interface AddressData {
  address: string;
  aptNumber: string;
  city: string;
  state: string;
  postcode: string;
  lng?: number;
  lat?: number;
}

export type IAddress = {
  formatAddress: string;
  state?: string;
  street?: string;
  aptNumber?: string;
  city?: string;
  postcode?: string;
  lng?: number;
  lat?: number;
  errors?: Partial<AddressData>;
  isValid?: boolean;
  changeFieldValue: (key: string, value: any) => void;
  reset: () => void;
};
