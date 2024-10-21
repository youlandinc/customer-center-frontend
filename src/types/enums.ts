export enum ColumnPiningDirectionEnum {
  left = 'LEFT',
  right = 'RIGHT',
  center = 'CENTER',
}

export enum ColumnTypeEnum {
  text = 'TEXT',
  number = 'NUMBER',
  address = 'ADDRESS',
  uuid = 'UUID',
  email = 'EMAIL',
  phone = 'PHONE',
}

export enum SortDirection {
  asc = 'ASC',
  desc = 'DESC',
}

export enum SearchOperationEnum {
  equals = 'EQUALS',
  not = 'NOT',
  contains = 'CONTAINS',
  not_contains = 'NOT_CONTAINS',
  starts_with = 'STARTS_WITH',
  not_starts_with = 'NOT_STARTS_WITH',
  ends_with = 'ENDS_WITH',
  not_ends_with = 'NOT_ENDS_WITH',
  greater_than = 'GREATER_THAN',
  less_than = 'LESS_THAN',
  greater_than_or_equal = 'GREATER_THAN_OR_EQUAL',
  less_than_or_equal = 'LESS_THAN_OR_EQUAL',
  in = 'IN',
  not_in = 'NOT_IN',
  between = 'BETWEEN',
  not_between = 'NOT_BETWEEN',
}
