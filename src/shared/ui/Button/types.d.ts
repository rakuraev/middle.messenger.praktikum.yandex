interface IButton {
  text: string;
  modificator: string;
  tabIndex: number;
  onClick?: () => void;
}

type ButtonProps = {
  text: string;
  modificator: string;
  tabIndex: number;
  events: BlockEvents;
};
