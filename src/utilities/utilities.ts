export function filterNullValues<T>(obj: T): T {
  const filteredObj = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== "") {
        filteredObj[key] = value;
      }
    }
  }

  return filteredObj;
}

export function filterQueryObjectForProductApiSlice<T>(obj: T): T {
  const filteredObj = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value || value === 0) {
        filteredObj[key] = value;
      }
    }
  }

  return filteredObj;
}

export type PickFields<T, K extends keyof T> = Pick<T, K>;

export function pickFieldsFromObject<T extends object, K extends keyof T>(
  source: T,
  keys: K[]
): PickFields<T, K> {
  const result: Partial<PickFields<T, K>> = {};
  for (const key of keys) {
    if (key in source) {
      result[key] = source[key];
    }
  }
  return result as PickFields<T, K>;
}
