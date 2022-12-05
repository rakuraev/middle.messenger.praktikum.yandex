const isObject = (val: unknown) => {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
};

export default isObject;
