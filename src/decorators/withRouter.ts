import type { BlockConstructor } from '../core/Block/Block';
import Router from '../core/Router/Router';

const router = new Router();

// type RouterProps = {
//   router?: Router;
// };

export default function withRouter<P extends {}>(
  WrappedBlock: BlockConstructor<any, any>
): BlockConstructor<any, any> {
  return class WrappedBlockWithRouter extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, router });
    }
  };
}
