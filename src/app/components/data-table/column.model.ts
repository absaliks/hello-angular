import { isFalse, isTrue } from "./filter.util";

export type DataType = 'string' | 'number' | 'bool' | 'date';

export interface Column {
  field: string;
  title?: string;
  type?: DataType;
  isHidden?: boolean;
  disableInputFilter?: boolean;
  filters?: ColumnFilter[];
}

export interface ColumnFilter {
  label: string;
  predicate: (value: unknown) => boolean;
}

export function coerceColumn(col: Column): Column {
  col.type = col.type == null ? 'string' : col.type;
  col.title = col.title == null ? col.field : col.title;
  if (col.type == 'bool') {
    if (typeof col.disableInputFilter === 'undefined') {
      col.disableInputFilter = true;
    }
    if (typeof col.filters === 'undefined') {
      col.filters = [
        {label: "= true", predicate: isTrue },
        {label: "= false", predicate: isFalse }
      ];
    }
  }
  return col;
}

export type Predicate = (value: unknown) => boolean;