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
