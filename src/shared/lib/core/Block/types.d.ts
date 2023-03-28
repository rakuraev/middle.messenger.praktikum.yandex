type BlockMeta<P> = {
  tagName: string;
  props: P;
};

type BlockEvents = Unknowed<Record<string, () => void>>;

type BlockSlot = string;

type BlockProps = Record<string, any>;

type BlockRefs = Record<string, BlockClass>;
