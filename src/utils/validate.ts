export enum FORM_FIELDS_TYPES {
  LOGIN,
  PASSWORD,
}
const VALIDATORS_REG_EXP: Record<string, RegExp> = {
  LOGIN: new RegExp(
    /^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/
  ),
  PASSWORD: new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/),
};
const VALIDATORS_MESSAGES: Record<string, string> = {
  LOGIN: 'Неверный формат логина',
  PASSWORD: 'Неверный формат пароля',
};

const validateString = (
  value: string,
  type: FORM_FIELDS_TYPES
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value,
    message:'',
  };
  const TYPE_KEY = FORM_FIELDS_TYPES[type];
  if (TYPE_KEY) {
    if (!VALIDATORS_REG_EXP[TYPE_KEY].test(value)) {
      result.isValid = false;
      result.message = VALIDATORS_MESSAGES[TYPE_KEY];
    }
  }
  console.log(result);
  return result;
};

export default validateString;
