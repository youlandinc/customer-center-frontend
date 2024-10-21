export const POSTypeOf = (input: unknown): string => {
  return Object.prototype.toString.call(input).slice(8, -1);
};

export const POSNotUndefined = (value: unknown): boolean => {
  return Object.prototype.toString.call(value).slice(8, -1) !== 'Undefined';
};
