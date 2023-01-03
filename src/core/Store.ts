import { state } from '../store';
import set from '../utils/set';
import { EventBus } from './EventBus/EventBus';

export enum StoreEvents {
  Updated = 'updated',
}
export class Store extends EventBus {
  private _state: Nullable<State> = null;
  private static __instance: Store;
  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();
    Store.__instance = this;
    this._state = state;
  }
  public getState() {
    return this._state;
  }
  public set(keypath: string, data: unknown) {
    set(this._state, keypath, data);
    console.log(this);
    this.emit(StoreEvents.Updated, this.getState());
  }
}

export default new Store();
