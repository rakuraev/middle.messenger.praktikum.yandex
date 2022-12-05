import isArray from './typeguards/isArray';
import isPlainObject from './typeguards/isPlainObject';
import isMap from './typeguards/isMap';

function queryStringify(data: PlainObject | unknown[]): string {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }
  function parseObject(data: PlainObject | unknown[]): Map<string, unknown> {
    const result = new Map();
    if (isPlainObject(data) || isArray(data)) {
      Object.entries(data).forEach(([key, value]) => {
        if (isPlainObject(value) || isArray(value)) {
          result.set(key, parseObject(value));
        } else {
          result.set(key, value);
        }
      });
    }
    return result;
  }

  const parsedObject = parseObject(data);

  function queryValues(map: Map<string, unknown>, accKey?: string) {
    const result: string[] = [];
    console.log(accKey);
    map.forEach((value, key: string) => {
      if (isMap(value)) {
        if (accKey) {
          const newKey = `${accKey}[${key}]`;
          result.push(...queryValues(value as Map<string, unknown>, newKey));
        } else {
          result.push(...queryValues(value as Map<string, unknown>, key));
        }
      } else {
        if (accKey) {
          result.push(`${accKey}[${key}]=${value}`);
        } else {
          result.push(`${key}=${value}`);
        }
      }
    });
    return result;
  }
  const result: string[] = queryValues(parsedObject);
  return result.join('&');
}

export default queryStringify;
