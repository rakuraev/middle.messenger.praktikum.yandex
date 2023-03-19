interface IButton {
  text: string;
  modificator: string;
  tabIndex: number;
  class: string;
  onClick?: () => void;
}

type ButtonProps = {
  text: string;
  modificator: string;
  tabIndex: number;
  events: BlockEvents;
  class: string;
};
