type LinkProps = {
  href?: string;
  class?: string;
  label: string;
  events: BlockEvents;
};
interface ILink {
  href?: string;
  class?: string;
  label: string;
  onClick: () => void;
}
