function isDate(val: unknown): val is Date {
  return val instanceof Date;
}
export default isDate;