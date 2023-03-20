export function isMap(val: unknown): val is Map<unknown, unknown> {
  return val instanceof Map;
}
