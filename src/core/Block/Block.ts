import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from '../EventBus/EventBus';

const enum BLOCK_EVENTS {
  INIT = 'init',
  FLOW_CDI = 'flow:component-did-inited',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_UPDATE = 'flow:component-did-update',
  FLOW_CBU = 'flow:component-before-unmount',
  FLOW_CDU = 'flow:component-did-unmounted',
}
export interface BlockClass<P> extends Function {
  new (props: P): Block<any, any>;
  componentName?: string;
}

export type BlockConstructor<P extends BlockProps, R> = new (props: P) => Block<
  P,
  R
>;

export default abstract class Block<P extends BlockProps, R = {}> {
  private _element: Nullable<HTMLElement>;
  readonly _meta: BlockMeta<P>;

  readonly props: P;

  private _initialState: P = {} as P;

  state: P = {} as P;

  readonly eventBus: IEventBus;

  refs: R;

  children: { [id: string]: Block<P> } = {};

  id: string;

  constructor(props = {} as P) {
    this._meta = {
      props,
      tagName: 'div',
    };
    this.eventBus = new EventBus();
    this.getStateFromProps(props);
    this.refs = {} as R;
    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state);
    this._element = null;
    this.id = nanoid(6);
    this._registerEvents();
    this.eventBus.emit(BLOCK_EVENTS.INIT);
  }

  getStateFromProps(props?: P): void {
    if (props) {
      this.state = props;
    }
  }

  private _registerEvents() {
    this.eventBus.on(BLOCK_EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_CDI,
      this._componentDidInited.bind(this)
    );
    this.eventBus.on(BLOCK_EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(BLOCK_EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_UPDATE,
      this._componentDidUpdate.bind(this)
    );
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_CBU,
      this._componentBeforeUnmount.bind(this)
    );
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_CDU,
      this._componentDidUnmount.bind(this)
    );
  }

  init() {
    this._element = document.createElement(this._meta.tagName);
    this.eventBus.emit(BLOCK_EVENTS.FLOW_CDI);
    this.eventBus.emit(BLOCK_EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidInited() {
    this.componentDidInited();
  }

  componentDidInited() {}

  private _componentDidMount() {
    this.componentDidMount(this.props);
  }

  componentDidMount(props: P) {}

  private _componentDidUnmount() {
    this.getStateFromProps();
    this.componentDidUnmount(this.props);
  }

  componentDidUnmount(props: P) {}

  private _componentBeforeUnmount() {
    this.componentBeforeUnmount(this.props);
  }

  componentBeforeUnmount(props: P) {}

  private _componentDidUpdate() {
    this._render();
  }

  render(): string {
    return '';
  }

  setState = (nextState: unknown) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  private _render() {
    const fragment = this._compile();
    this._removeEvents();
    const newElement = fragment.firstElementChild;
    if (newElement instanceof HTMLElement) {
      this._element?.replaceWith(newElement);
    }
    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });
    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }
      const content = component.getContent();
      if (content) {
        stub.replaceWith(content);
      }
    });

    return fragment.content;
  }

  private _addEvents() {
    const events: BlockEvents = this.props?.events;

    if (!events || !this._element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _removeEvents() {
    const events = this.props?.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private _makePropsProxy(props: P) {
    return new Proxy(props, {
      get(target: P, name: string) {
        const value = target[name as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      // Так вообще нормально указывать тип для value или есть какой-то более правильный способ?
      set: (target: P, name: string, value: P[keyof P]) => {
        target[name as keyof P] = value;
        this.eventBus.emit(BLOCK_EVENTS.FLOW_UPDATE);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
  }

  get element() {
    return this._element;
  }

  getContent(): Nullable<HTMLElement> {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus.emit(BLOCK_EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element;
  }

  // show() {
  //   const content = this.getContent();
  //   if (content) {
  //     content.style.removeProperty("display")
  //   }
  // }

  hide() {
    const content = this.getContent();
    this.eventBus.emit(BLOCK_EVENTS.FLOW_CBU);
    if (content) {
      content.remove();
      this.eventBus.emit(BLOCK_EVENTS.FLOW_CDU);
    }
  }
}
