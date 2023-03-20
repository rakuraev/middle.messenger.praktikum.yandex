type LinkProps = {
  href?: string;
  class?: string;
  label?: string;
  slot?: BlockSlot;
  events: BlockEvents;
};
interface ILink {
  href?: string;
  class?: string;
  label?: string;
  slot?: () => BlockSlot;
  onClick?: () => void;
}
