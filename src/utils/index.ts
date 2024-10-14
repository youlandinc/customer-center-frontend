import { URL_LOGOUT_REDIRECTION } from '@/components/atoms';

export const GetParamsFromUrl = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const urlObj = new URL(url);
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const TypeOf = (input: unknown): string => {
  return Object.prototype.toString.call(input).slice(8, -1);
};

export const NotUndefined = (value: unknown): boolean => {
  return Object.prototype.toString.call(value).slice(8, -1) !== 'Undefined';
};

export const SystemLogout = () => {
  localStorage.clear();
  window.location.href = URL_LOGOUT_REDIRECTION;
};
