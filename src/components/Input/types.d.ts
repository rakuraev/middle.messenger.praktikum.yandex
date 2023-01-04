interface IInput {
  id: string;
  placeholder: string;
  type: string;
  value: string;
  errorMessage: string;
  validateType?: string;
  isError: boolean;
  onFocus: (e: Event) => void;
  onBlur: (e: Event) => void;
}

type InputProps = {
  id: string;
  placeholder: string;
  type: string;
  validateType?: number;
  value: string;
  errorMessage: string;
  isError: boolean;
  events: BlockEvents;
};
