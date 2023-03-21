/* eslint-disable no-useless-escape */
export enum FormFieldTypes {
  'login',
  'password',
  'phone',
  'firstName',
  'secondName',
  'email',
  'repeatPassword',
  'displayName',
}

const VALIDATORS_REG_EXP: Record<string, RegExp> = {
  login: new RegExp(
    /^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/
  ),
  password: new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/),
  firstName: new RegExp(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/),
  secondName: new RegExp(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/),
  email: new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
  ),
  phone: new RegExp(
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
  ),
};
const VALIDATORS_MESSAGES: Record<string, string> = {
  login: 'Неверный формат логина',
  password: 'Неверный формат пароля',
  firstName: 'Неверный формат Имени',
  secondName: 'Неверный формат Фамилии',
  email: 'Неверный формат email',
  phone: 'Неверный формат телефона',
  repeatPassword: 'Пароли не совпадают',
};

const validateString = (
  value: string,
  type: FormFieldTypes
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value,
    message: '',
  };
  if (!value) {
    value = '';
  }
  const TYPE_KEY = FormFieldTypes[type];
  if (TYPE_KEY) {
    if (VALIDATORS_REG_EXP[TYPE_KEY]) {
      if (!VALIDATORS_REG_EXP[TYPE_KEY].test(value)) {
        result.isValid = false;
        result.message = VALIDATORS_MESSAGES[TYPE_KEY];
      }
    }
  }
  return result;
};
export const validateIsSame = (
  validatedValue: string,
  comparableValue: string,
  type: FormFieldTypes
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value: validatedValue,
    message: '',
  };
  const TYPE_KEY = FormFieldTypes[type];
  if (validatedValue !== comparableValue || validatedValue.length === 0) {
    result.isValid = false;
    result.message = VALIDATORS_MESSAGES[TYPE_KEY];
  }
  return result;
};
export default validateString;
