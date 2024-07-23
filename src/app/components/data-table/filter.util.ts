import { ColumnFilter, Predicate } from "./column.model";

export interface DatasourceFilter {
  field: string,
  predicate: Predicate;
}

export function datasourceFilterPredicate(record: any, filter: any) {
  return !filter || filter.every((f: DatasourceFilter) => f.predicate(record[f.field]));
}

// removes keys with values = {null, undefined, ''}, converts string values to lower case
export function toDatasourceFilter(obj: object): DatasourceFilter[] {
  return Object.entries(obj)
      .filter(([_, value]) => value != null && value !== '')
      .map(([key, value]) => ({
        field: key,
        predicate: filterPredicateFactory(value)
      }));
}

function filterPredicateFactory(filterFormValue: ColumnFilter | unknown): Predicate {
  if (isColumnFilter(filterFormValue)) {
    return filterFormValue.predicate;
  }
  const coercedFilterFormValue = typeof filterFormValue === 'string' ? filterFormValue.toLowerCase() : filterFormValue;
  return value => matches(value, coercedFilterFormValue);
}

function isColumnFilter(value: unknown): value is ColumnFilter {
  return typeof value === 'object' && 'predicate' in value;
}

// filter cannot be undefined / null / empty string or contain uppercase characters
function matches(value: any, filter: unknown) {
  if (value == null || value === '') {
    return false;
  }

  if (typeof filter === 'string') {
    switch (typeof value) {
      case "string":
        return value.toLowerCase().includes(filter);
      default:
        return value.toString().includes(filter);
    }
  }
  if (typeof filter === 'boolean') {
    return value === filter;
  }
  return false;
}

export const isTrue = (value: unknown) => typeof value === 'boolean' && value;
export const isFalse = (value: unknown) => typeof value === 'boolean' && !value;