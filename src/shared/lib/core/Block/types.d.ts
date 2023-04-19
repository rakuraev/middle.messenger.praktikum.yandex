type BlockMeta<P> = {
  tagName: string;
  props: P;
};

type BlockEvents = Unknowed<Record<string, () => void>>;

type BlockSlot = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlockProps = Record<string, any>;

type BlockRefs = Record<string, BlockClass>;
