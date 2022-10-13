interface IInputProps {
  id: string;
  placeholder: string;
  type: string;
  value?: string;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}
