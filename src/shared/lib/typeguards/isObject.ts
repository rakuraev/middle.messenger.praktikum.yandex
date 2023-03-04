export const isObject = (val: unknown) => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
};
