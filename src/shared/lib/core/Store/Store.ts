import { set } from 'shared/lib/tipa-lodash';
import { EventBus } from 'shared/lib/core';

export enum StoreEvents {
  Updated = 'updated',
}

type State = Record<string, any>;
class Store extends EventBus {
  private _state: Nullable<State> = null;
  private static __instance: Store;
  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();
    Store.__instance = this;
  }
  public init(state: State) {
    this._state = state;
  }
  public getState() {
    return this._state;
  }
  public set(keypath: keyof State, data: unknown) {
    set(this._state, keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }
}

export default new Store();
