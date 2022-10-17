type LoginFields = IInputProps[];
type LoginPageProps = {
  loginFields: LoginFields;
  onLogin: () => void;
};
type LoginFieldsId = 'password' | 'login';
