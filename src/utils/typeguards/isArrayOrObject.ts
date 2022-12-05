import isPlainObject from './isPlainObject';
import isArray from './isArray';

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export default isArrayOrObject;
