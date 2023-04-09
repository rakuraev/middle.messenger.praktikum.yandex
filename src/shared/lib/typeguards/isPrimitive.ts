export function isPrimitive(
  val: unknown
): val is
  | null
  | undefined
  | number
  | bigint
  | string
  | symbol
  | ((...args: unknown[]) => unknown) {
  return val === null || typeof val !== 'object';
}
