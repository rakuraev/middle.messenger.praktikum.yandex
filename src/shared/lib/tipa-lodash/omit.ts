import { cloneDeep } from 'shared/lib/tipa-lodash';

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  target: T,
  keys: K[]
): Omit<T, K> {
  if (typeof target !== 'object' || !target || !Array.isArray(keys)) {
    return target;
  }
  const result = cloneDeep(target);
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
