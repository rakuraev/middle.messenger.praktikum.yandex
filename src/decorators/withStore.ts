import type { BlockConstructor } from '../core/Block/Block';
import Store, { StoreEvents } from '../core/Store';
import { StateKeys } from '../store';
import isEqual from '../utils/isEqual';

export default function withStore(...stateKeys: StateKeys[]) {
  const mapStateToProps = (state: State): Omit<State, StateKeys> => {
    console.log(stateKeys);
    return stateKeys.reduce((nextState, stateKey) => {
      return { ...nextState, [stateKey]: state[stateKey] };
    }, {} as State);
  };

  let currentState: Nullable<State> = null;

  return function withMapStateStore(
    WrappedBlock: BlockConstructor<any, any>
  ): BlockConstructor<any, any> {
    return class WrappedBlockWithStore<P> extends WrappedBlock {
      constructor(props: P) {
        const state = Store.getState() as State;
        currentState = mapStateToProps(state);
        super({ ...props, ...currentState });
      }
      __onChangeStoreCallback() {
        const state = Store.getState() as State;
        const nextState = mapStateToProps(state);

        if (isEqual(currentState as State, nextState)) {
          return;
        }
        //@ts-expect-error
        this.setProps({ ...this.props, ...nextState });
      }

      componentDidInited() {
        Store.on(StoreEvents.Updated, this.__onChangeStoreCallback);
      }

      componentBeforeUnmount() {
        Store.off(StoreEvents.Updated, this.__onChangeStoreCallback);
      }
    };
  };
}
