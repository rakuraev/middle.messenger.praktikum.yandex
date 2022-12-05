import type { BlockClass } from '../core/Block/Block';
import Router from '../core/Router/Router';

// type WithRouterProps = { router: Router };

export default function withRouter<P extends BlockProps>(
  WrappedBlock: BlockClass<P>
) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class WrappedBlockWithRouter extends WrappedBlock<P> {
    constructor(props: P) {
      super({ ...props, router: new Router() });
    }
  } as BlockClass<Omit<P, 'router'>>;
}