import { isPlainObject, isArray } from 'shared/lib/typeguards';

export function isArrayOrObject(
  value: unknown
): value is unknown[] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
