type LoginFields = IInputProps[]

interface IInputProps {
  placeholder: string;
  id: string;
  name?: string;
  type: string;
  value: string;
  isError: boolean;
  errorMessage: string;
  onFocus;
  onBlur;
}

type LoginFieldsId = 'password' | 'login';

