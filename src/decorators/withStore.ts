import type { BlockConstructor, BlockProps } from '../core/Block/Block';
import Store, { StoreEvents } from '../core/Store';
import { StateKeys } from '../store';
import isEqual from '../utils/isEqual';

export default function withStore<K extends StateKeys>(...stateKeys: K[]) {
  const mapStateToProps = (state: State): Pick<State, K> => {
    return stateKeys.reduce((nextState, stateKey) => {
      return { ...nextState, [stateKey]: state[stateKey] };
    }, {} as State);
  };

  let currentState: Pick<State, K>;

  return function withMapStateStore<P extends BlockProps = any>(
    WrappedBlock: BlockConstructor<any>
  ): BlockConstructor<any> {
    return class WrappedBlockWithStore extends WrappedBlock {
      private _onChangeCallback: () => void = () => {};

      constructor(props: P) {
        const state = Store.getState() as State;
        currentState = mapStateToProps(state);
        super({ ...props, ...currentState });
      }

      private _onChangeStoreCallback() {
        const state = Store.getState() as State;
        const nextState = mapStateToProps(state);

        if (isEqual(currentState, nextState)) {
          return;
        }
        this.setProps({ ...this.state, ...nextState });
      }

      componentDidInited() {
        this._onChangeCallback = this._onChangeStoreCallback.bind(this);
        Store.on(StoreEvents.Updated, this._onChangeCallback);
      }

      componentBeforeUnmount() {
        Store.off(StoreEvents.Updated, this._onChangeCallback);
      }
    };
  };
}
