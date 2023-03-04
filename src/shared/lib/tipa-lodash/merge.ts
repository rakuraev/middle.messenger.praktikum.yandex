import { isObject } from 'shared/lib/typeguards';

export function merge(lhs: Indexed, rhs: Indexed) {
  if (!isObject(lhs) && !isObject(rhs)) throw new Error('not object Argument');
  Object.keys(rhs).forEach((key) => {
    const rhsVal = rhs[key];
    const lhsVal = lhs[key];
    if (isObject(lhsVal) && isObject(rhsVal)) {
      Object.assign(
        rhsVal as Indexed,
        merge(lhsVal as Indexed, rhsVal as Indexed)
      );
    } else {
      Object.assign(rhs || {}, lhs);
    }
  });
  return Object.assign(lhs || {}, rhs);
}
