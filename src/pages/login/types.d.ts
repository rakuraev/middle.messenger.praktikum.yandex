type LoginFields = IInputProps[];

interface IInputProps {
  placeholder: string;
  id: string;
  name?: string;
  type: string;
  value: string;
  isError: boolean;
  errorMessage: string;
  validateType?: number;
  autocomplete?: 'on' | 'off' | 'new-password' | 'current-password';
  onFocus;
  onBlur;
}

type LoginFieldsId = 'password' | 'login';
