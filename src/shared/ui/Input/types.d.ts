interface IInput {
  id?: string;
  placeholder: string;
  type: string;
  value: string;
  errorMessage: string;
  validateType?: ValidateTypes;
  isError: boolean;
  disableError?: boolean;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onInput?: (e: Event) => void;
}

type InputProps = {
  id: string;
  placeholder: string;
  type: string;
  validateType?: ValidateTypes;
  value: string;
  errorMessage: string;
  isError: boolean;
  events: BlockEvents;
};

type ValidateTypes =
  | 'login'
  | 'password'
  | 'phone'
  | 'firstName'
  | 'secondName'
  | 'email'
  | 'repeatPassword'
  | 'displayName'
  | number;
