import type { BlockConstructor } from '../core/Block/Block';
import { Store } from '../core/Store';

const store = new Store();

export default function withStore(
  WrappedBlock: BlockConstructor<any>
): BlockConstructor<any> {
  return class WrappedBlockWithStore<P> extends WrappedBlock {
    constructor(props: P) {
      super({ ...props, store });
    }
    __onChangeStoreCallback = () => {
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error this is not type
      this.setProps({ ...this.props, store });
    };
    componentDidMount(props: P) {
      super.componentDidMount(props);
      store.on('store-changed', this.__onChangeStoreCallback);
    }

    componentBeforeUnmount() {
      store.off('store-changed', this.__onChangeStoreCallback);
    }
  };
}
