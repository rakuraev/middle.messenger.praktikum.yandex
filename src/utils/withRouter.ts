import type { BlockConstructor } from '../core/Block/Block';
import Router from '../core/Router/Router';

const router = new Router();
export default function withRouter(
  WrappedBlock: BlockConstructor<any>
): BlockConstructor<any> {
  return class WrappedBlockWithRouter<P> extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, router });
    }
  };
}
