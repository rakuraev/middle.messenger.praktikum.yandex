function isSet(val: unknown): val is Set<unknown> {
  return val instanceof Set;
}

export default isSet;
