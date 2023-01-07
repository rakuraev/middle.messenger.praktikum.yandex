import { isFunction } from './typeguards/isFunction';

function debounce<T>(this: T, fn: unknown, interval = 200) {
  if (!isFunction(fn)) {
    throw new Error(`expect function got ${fn}`);
  }
  let timeout: number;
  return () => {
    fn.bind(this, ...arguments);
    clearTimeout(timeout);
    timeout = setTimeout(fn, interval);
  };
}

export default debounce;
