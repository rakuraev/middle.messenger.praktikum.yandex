type BlockMeta<P> = {
  tagName: string;
  props: P;
};

type BlockEvents = Unknowed<Record<string, () => void>>;

interface IBlock {
  getContent: () => HTMLElement;
}

type BlockProps = Record<string, unknown>;
