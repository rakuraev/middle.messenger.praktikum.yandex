import isArray from './typeguards/isArray';
import isMap from './typeguards/isMap';
import isPlainObject from './typeguards/isPlainObject';
import isPrimitive from './typeguards/isPrimitive';
import isSet from './typeguards/isSet';
import isDate from './typeguards/isDate';

function cloneDeep<T>(copiedValue: T): T {
  // Handle:
  // * null
  // * undefined
  // * boolean
  // * number
  // * string
  // * symbol
  // * function
  if (isPrimitive(copiedValue)) {
    return copiedValue;
  }
  // handle Array
  if (isArray(copiedValue)) {
    const result = copiedValue.map((val) => {
      if (isArray(val) || isPlainObject(val)) {
        return cloneDeep(val);
      } else {
        return val;
      }
    });
    return result as T;
  }

  // Handle Object
  if (isPlainObject(copiedValue)) {
    const result: PlainObject = {};
    Object.entries(copiedValue).forEach(([key, val]) => {
      if (isArray(val) || isPlainObject(val)) {
        result[key] = cloneDeep(val);
      } else {
        result[key] = val;
      }
    });
    return result as T;
  }

  // Handle Set
  if (isSet(copiedValue)) {
    const result = new Set();
    copiedValue.forEach((val) => {
      result.add(val);
    });
    return result as T;
  }

  // Handle Map
  if (isMap(copiedValue)) {
    const result = new Map();
    copiedValue.forEach((value, key) => {
      result.set(key, cloneDeep(value));
    });
    return result as T;
  }

  // handle Date
  if (isDate(copiedValue)) {
    const result = new Date(copiedValue.valueOf());
    return result as T;
  }

  throw new Error(`Unable to copy object: ${copiedValue}`);
}

export default cloneDeep;
