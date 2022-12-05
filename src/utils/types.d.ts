type ValidateOutput = {
  isValid: boolean;
  value: string;
  message: string;
};

type Indexed<T = unknown> = {
  [key in string]: T;
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};
