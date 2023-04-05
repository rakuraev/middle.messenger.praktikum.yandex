import { isObject } from 'shared/lib/typeguards';

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('mast be string');
  }
  if (!isObject(object)) {
    return object;
  }
  const pathKeysArray = path.split('.');
  pathKeysArray.reduce((acc, key, idx) => {
    if (pathKeysArray.length - 1 === idx) {
      acc[key] = value;
      return acc[key] as Indexed;
    }
    acc[key] = {};
    return acc[key] as Indexed;
  }, object as Indexed);
  return object;
}
