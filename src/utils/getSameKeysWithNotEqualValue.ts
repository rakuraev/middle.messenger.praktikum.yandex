import isEqual from './isEqual';
import isArrayOrObject from './typeguards/isArrayOrObject';
import isPlainObject from './typeguards/isPlainObject';

export function getSameKeysWithNotEqualValue(
  lhs: Record<string, unknown>,
  rhs: Record<string, unknown>
): string[] {
  if (!isPlainObject(lhs) || !isPlainObject(rhs)) {
    throw new Error('one of arguments is not object');
  }
  const res: string[] = [];
  Object.keys(lhs).forEach((lhsKey) => {
    if (Object.keys(rhs).includes(lhsKey)) {
      const lhsVal = lhs[lhsKey];
      const rhsVal = rhs[lhsKey];
      if (isArrayOrObject(lhsVal) && isArrayOrObject(rhsVal)) {
        if (!isEqual(lhsVal, rhsVal)) {
          res.push(lhsKey);
        } else if (isArrayOrObject(lhsVal) || isArrayOrObject(rhsVal)) {
          res.push(lhsKey);
        } else {
          if (lhs !== rhs) {
            res.push(lhsKey);
          }
        }
      }
    }
  });

  return res;
}
