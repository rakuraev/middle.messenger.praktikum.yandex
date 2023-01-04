import type { BlockConstructor } from '../core/Block/Block';
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

  return function withMapStateStore<P extends {}>(
    WrappedBlock: BlockConstructor<any, any>
  ): BlockConstructor<any, any> {
    return class WrappedBlockWithStore extends WrappedBlock {
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
        this.setState({ ...this.state, ...nextState });
      }

      componentDidInited() {
        Store.on(StoreEvents.Updated, this._onChangeStoreCallback.bind(this));
      }

      componentBeforeUnmount() {
        Store.off(StoreEvents.Updated, this._onChangeStoreCallback.bind(this));
      }
    };
  };
}
