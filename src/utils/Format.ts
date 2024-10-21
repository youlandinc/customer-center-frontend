import { POSTypeOf } from './TypeOf';
import { format } from 'date-fns';

export const POSFormatDollar = (
  amount: number | undefined | string | null,
  radix = 0,
): string => {
  if (!amount) {
    return '$0';
  }
  let target = amount;
  if (POSTypeOf(target) === 'String') {
    target = parseFloat(target as string);
  }
  return target.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(target) ? radix : 2,
  });
};

export const POSFormatPercent = (
  percentageValue: number | undefined | string,
  radix = 3,
): string => {
  if (!percentageValue) {
    if (radix <= 0) {
      return '0%';
    }
    return '0%';
  }
  let target = percentageValue;
  if (POSTypeOf(target) === 'String') {
    target = parseFloat(target as string);
  }
  return (
    ((Math.floor((target as number) * 10000000) / 10000000) * 100).toFixed(
      radix >= 3 ? 3 : radix,
    ) + '%'
  );
};

export const POSFormatDate = (
  date: string | Date,
  timeFormat = 'yyyy-MM-dd HH:mm:ss O',
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  },
): string => {
  return format(new Date(date), timeFormat, options);
};

export const POSFormatUSPhoneToText = (entry = '') => {
  if (POSTypeOf(entry) === 'Null') {
    return '';
  }
  const cleaned: string = ('' + entry).replace(/\D/g, '');
  const match: RegExpMatchArray | null = cleaned.match(
    /^(\d{3})?(\d{3})(\d{4})$/,
  );
  if (match) {
    const areaCode: string = match[1] ? `(${match[1]}) ` : '';
    const formattedNumber = `${areaCode}${match[2]}-${match[3]}`;
    return formattedNumber;
  }
  return cleaned;
};

export const POSFormatUrl = (url: string): string => {
  if (!url) {
    return '';
  }
  if (/^https?:\/\//.test(url)) {
    return url;
  } else if (url.startsWith('https')) {
    return 'https://' + url.substring(5);
  }
  return 'https://' + url;
};

export const POSGetDecimalPlaces = (
  value: number | undefined | null,
): number => {
  if (!value) {
    return 0;
  }
  const target = value + '';
  if (target.endsWith('.')) {
    return 0;
  }
  const decimalIndex = target.indexOf('.');

  if (decimalIndex === -1) {
    return 0;
  }

  return target.substring(target.indexOf('.') + 1).length >= 5
    ? 3
    : target.substring(target.indexOf('.') + 1).length - 2 <= 0
      ? 0
      : target.substring(target.indexOf('.') + 1).length - 2;
};
