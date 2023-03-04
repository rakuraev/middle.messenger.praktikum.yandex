import type { BlockConstructor } from 'shared/lib/core';
import { Router } from 'shared/lib/core';

const router = new Router();

export function withRouter<P>(
  WrappedBlock: BlockConstructor
): BlockConstructor {
  return class WrappedBlockWithRouter extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, router });
    }
  };
}
