type SignupFields = IInputProps[];
type SignupProps = {
  signupFields: SignupFields;
  onSignup: () => void;
};
type SignupFieldsId =
  | 'login'
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'firstName'
  | 'lastName';
