// filter cannot be undefined / null / empty string or contain uppercase characters
export function matches(value: any, filter: unknown) {
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

// removes keys with values = {null, undefined, ''}, converts string values to lower case
export function toFieldFilters(obj: object): FieldFilter[] {
  return Object.entries(obj)
      .filter(([_, value]) => value != null && value !== '')
      .map(([key, value]) => ({
        field: key,
        filter: typeof value === 'string' ? value.toLowerCase() : value
      }));
}

export interface FieldFilter {
  field: string,
  filter: unknown
}