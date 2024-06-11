export type DataType = 'string' | 'number' | 'bool' | 'date';

export interface Column {
  field: string;
  title?: string;
  type?: DataType;
  isHidden?: boolean;
}