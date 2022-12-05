function isPrimitive(
  val: unknown
): val is
  | null
  | undefined
  | number
  | bigint
  | string
  | symbol
  | Function
  | ((...args: unknown[]) => unknown) {
  return val === null || typeof val !== 'object';
}

export default isPrimitive;
