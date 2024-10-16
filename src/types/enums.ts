export enum ColumnPiningDirectionEnum {
  left = 'LEFT',
  right = 'RIGHT',
  center = 'CENTER',
}

export enum ColumnTypeEnum {
  text = 'Text',
  number = 'Number',
  address = 'Address',
  uuid = 'Uuid',
}

export enum SortDirection {
  ASC = 'Asc',
  DESC = 'Desc',
}

export enum SearchOperationEnum {
  EQUALS = 'EQUALS',
  NOT = 'NOT',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  NOT_STARTS_WITH = 'NOT_STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  NOT_ENDS_WITH = 'NOT_ENDS_WITH',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  BETWEEN = 'BETWEEN',
  NOT_BETWEEN = 'NOT_BETWEEN',
}
