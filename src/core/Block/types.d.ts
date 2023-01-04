type BlockMeta<P> = {
  tagName: string;
  props: P;
};

type BlockEvents = Unknowed<Record<string, () => void>>;

type BlockProps = Record<string, unknown>;

type BlockSlot = string;
