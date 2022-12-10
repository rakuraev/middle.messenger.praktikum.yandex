import type { State } from '../store';
import cloneDeep from '../utils/cloneDeep';
import isEqual from '../utils/isEqual';
import { EventBus } from './EventBus/EventBus';

export class Store extends EventBus {
  private _state: Nullable<State> = null;
  private static __instance: Store;
  constructor() {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();
    Store.__instance = this;
  }
  public use(state: State) {
    this._state = state as State;
    this.set(state as State);
  }
  public getState() {
    return this._state;
  }
  public set(nextState: Partial<State>) {
    const prevState = cloneDeep(this._state) as State;
    if (!isEqual(prevState, nextState)) {
      this.emit('changed', prevState, nextState);
    }
  }
  dispatch(nextStateOrAction: any, payload?: unknown) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this._state, payload);
    } else {
      this.set({ ...this._state });
    }
  }
}
