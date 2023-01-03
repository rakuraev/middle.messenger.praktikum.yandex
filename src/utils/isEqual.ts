import isArray from './typeguards/isArray';
import isPlainObject from './typeguards/isPlainObject';

function isEqual(
  lhs: PlainObject | unknown[],
  rhs: PlainObject | unknown[]
): boolean {
  function compareValues(leftValue: unknown, rightValue: unknown) {
    if (
      (isArray(leftValue) && isArray(rightValue)) ||
      (isPlainObject(leftValue) && isPlainObject(rightValue))
    ) {
      return isEqual(leftValue, rightValue);
    } else {
      return leftValue === rightValue;
    }
  }
  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    if (!compareValues(Object.keys(lhs), Object.keys(rhs))) {
      return false;
    }
    return Object.entries(lhs).every(([key, leftValue]) => {
      const rightValue = rhs[key];
      return compareValues(leftValue, rightValue);
    });
  } else if (isArray(lhs) && isArray(rhs)) {
    return lhs.every((leftValue, idx) => {
      const rightValue = rhs[idx];
      return compareValues(leftValue, rightValue);
    });
  }

  return false;
}

export default isEqual;