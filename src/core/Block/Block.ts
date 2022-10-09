import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from '../EventBus/EventBus';

const enum BLOCK_EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_UPDATE = 'flow:componentd-did-update',
}

export default class Block {
  protected _element: Nullable<HTMLElement>;

  protected readonly _meta: BlockMeta;

  protected readonly props: BlockProps;

  protected state: BlockProps = {};

  readonly eventBus: IEventBus;

  protected refs: Record<string, HTMLElement> = {};

  protected children: { [id: string]: Block } = {};

  id: string;

  constructor(props = {}) {
    this._meta = {
      props,
      tagName: 'div',
    };
    this.eventBus = new EventBus();

    this.getStateFromProps(props);
    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state);
    this._element = null;
    this.id = nanoid(6);
    this._registerEvents();
    this.eventBus.emit(BLOCK_EVENTS.INIT);
  }

  protected getStateFromProps(props?: BlockProps): void {
    if (props) {
      this.state = props;
    }
  }

  private _registerEvents() {
    this.eventBus.on(BLOCK_EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(BLOCK_EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(BLOCK_EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_UPDATE,
      this._componentDidUpdate.bind(this)
    );
  }

  init() {
    this._element = document.createElement(this._meta.tagName);
    this.eventBus.emit(BLOCK_EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount() {
    this.componentDidMount(this.props);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(props: BlockProps) {}

  _componentDidUpdate() {
    this._render();
  }

  protected render(): string {
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
    console.log(this._element);
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
    const events: Unknowed<Record<string, EventBusListener>> =
      this.props?.events;

    if (!events || !this._element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _removeEvents() {
    const events: Unknowed<Record<string, EventBusListener>> =
      this.props.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private _makePropsProxy(props: BlockProps) {
    const eventBus = this.eventBus;
    return new Proxy(props, {
      get(tagret: BlockProps, name: string) {
        const value = tagret[name];
        return typeof value === 'function' ? value.bind(tagret) : value;
      },
      set(tagret: BlockProps, name: string, value: unknown) {
        tagret[name] = value;
        eventBus.emit(BLOCK_EVENTS.FLOW_UPDATE);
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

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
