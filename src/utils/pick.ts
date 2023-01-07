import cloneDeep from './cloneDeep';
import isPlainObject from './typeguards/isPlainObject';

function pick<T extends Record<string, unknown>, K extends keyof T>(
  target: T,
  keys: K[]
): Pick<T, K> | T {
  if (!isPlainObject(target) || !target) {
    return target as T;
  }
  const result: Partial<T> = {};

  keys.forEach((key) => {
    if (key in target) {
      result[key] = cloneDeep(target[key]);
    }
  });
  return result as Pick<T, K>;
}

export default pick;
