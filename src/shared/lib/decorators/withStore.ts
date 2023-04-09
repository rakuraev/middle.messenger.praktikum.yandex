/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateKeys } from 'shared/config';
import type { Block } from 'shared/lib/core';
import { Store, StoreEvents } from 'shared/lib/core';
import { isEqual } from 'shared/lib/tipa-lodash';

export function withStore<K extends StateKeys>(...stateKeys: K[]) {
  const mapStateToProps = (state: State): Pick<State, K> => {
    return stateKeys.reduce((nextState, stateKey) => {
      return { ...nextState, [stateKey]: state[stateKey] };
    }, {} as State);
  };

  let currentState: Pick<State, K>;

  return function withMapStateStore<B extends new (...args: any[]) => Block>(
    WrappedBlock: B
  ): B {
    return class WrappedBlockWithStore extends WrappedBlock {
      private _onChangeCallback: () => void = () => {};

      constructor(...props: any[]) {
        const state = Store.getState() as State;
        currentState = mapStateToProps(state);
        super({ ...props[0], ...currentState });
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
