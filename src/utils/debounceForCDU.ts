import { isFunction } from './typeguards/isFunction';

function debounceForCDU<T, P>(this: T, fn: unknown, interval = 200) {
  if (!isFunction(fn)) {
    throw new Error(`expect function got ${typeof fn}`);
  }
  let timeout: number;
  let firstOldProps: Nullable<P> = null;

  return (oldProps: P, newProps: P) => {
    if (!firstOldProps) {
      firstOldProps = oldProps;
    }
    clearTimeout(timeout);
    timeout = setTimeout(fn.bind(this, firstOldProps, newProps), interval);
  };
}

export default debounceForCDU;
