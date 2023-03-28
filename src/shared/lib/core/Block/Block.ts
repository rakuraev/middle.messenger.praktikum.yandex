import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { EventBus } from 'shared/lib/core';
import { isEqual, cloneDeep } from 'shared/lib/tipa-lodash';
import { debounceForCDU } from './lib';

const enum BLOCK_EVENTS {
  INIT = 'init',
  FLOW_CDI = 'flow:component-did-inited',
  FLOW_CBM = 'flow:component-before-mount',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_UPDATE = 'flow:component-did-update',
  FLOW_CHILD_UPDATE = 'flow:component-did-child-update',
  FLOW_CBU = 'flow:component-before-unmount',
  FLOW_CDU = 'flow:component-did-unmounted',
}

export interface BlockClass<P extends BlockProps = any> extends Function {
  new (props: P): Block<P>;
  componentName?: string;
}

export type BlockConstructor<
  P extends BlockProps = any,
  R extends BlockRefs = any
> = { new (props: P): Block<P, R>; _name: string };

export abstract class Block<
  P extends BlockProps = any,
  R extends BlockRefs = any
> {
  private _element: Nullable<HTMLElement>;

  isDestroyed = false;

  readonly _meta: BlockMeta<P>;

  readonly props: P;

  state = {} as P;

  readonly eventBus: IEventBus;

  refs: R;

  children: { [id: string]: Block<Partial<P>> } = {};

  id: string;

  constructor(props = {} as P) {
    this._meta = {
      props,
      tagName: 'div',
    };
    this.eventBus = new EventBus();
    this.id = nanoid(6);
    this.getStateFromProps(props);
    this.refs = {} as R;
    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state);
    this._element = null;
    this._registerEvents();
    this.eventBus.emit(BLOCK_EVENTS.INIT);
  }

  getStateFromProps(props?: P): void {
    if (props) {
      this.state = props;
    }
  }

  private _registerEvents() {
    const debouncedCDU = debounceForCDU.bind(this)(
      this._componentDidUpdate.bind(this),
      50
    );
    this.eventBus.on(BLOCK_EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_CDI,
      this._componentDidInited.bind(this)
    );
    this.eventBus.on(
      BLOCK_EVENTS.FLOW_CBM,
      this._componentBeforeMount.bind(this)
    );
    this.eventBus.on(BLOCK_EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(BLOCK_EVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(BLOCK_EVENTS.FLOW_UPDATE, debouncedCDU);
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

  private _componentBeforeMount() {
    this.componentBeforeMount(this.props);
  }

  componentBeforeMount(props: P) {}

  private _componentDidMount() {
    this.componentDidMount(this.props);
  }

  componentDidMount(props?: P) {}

  private _componentDidUnmount() {
    this.componentDidUnmount(this.props);
  }

  componentDidUnmount(props: P) {}

  private _componentBeforeUnmount() {
    this.componentBeforeUnmount(this.props);
  }

  public componentBeforeUnmount(props: P) {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (!isEqual(oldProps, newProps)) {
      const resplaceMark = new Comment('UPDATE-TARGET 🩼');
      const content = this.getContent();

      if (content) {
        const contentParentNode = content.parentNode;
        if (contentParentNode) {
          contentParentNode.insertBefore(resplaceMark, content);
        }
      }
      this._destroyAllChildrens();
      this._render();
      const newContent = this.getContent();
      if (newContent) {
        resplaceMark.replaceWith(newContent);
      }
      this.componentDidUpdate(this.props);
    }
  }

  componentDidUpdate(props: P) {}

  render(): string {
    return '';
  }

  setState = (nextState: unknown) => {
    if (!nextState) {
      return;
    }
    Object.assign(this.state, nextState);
  };

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }
    if (!isEqual(this.props, nextProps)) {
      Object.assign(this.props, nextProps);
    }
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

    const htmlString = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });
    fragment.innerHTML = htmlString;
    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);
      if (!stub) {
        return;
      }

      const content = component.getContent();

      if (content) {
        // Cлоты
        const slot = content.hasAttribute('slot')
          ? content
          : content.querySelector('[slot]');
        const slotNodes = stub.childNodes.length ? stub.childNodes : [];
        if (slotNodes.length && slot) {
          slot.removeAttribute('slot');
          slot.append(...slotNodes);
        }
        // Телепорт (Багованый 🥲 не работает если атрибут телепорт на родительском элементе)
        const elementToTeleport = content.querySelector('[teleport]');
        if (elementToTeleport) {
          const teleportQuery = elementToTeleport.getAttribute('teleport');
          if (teleportQuery) {
            const teleportTarget = document.querySelector(
              teleportQuery
            ) as Nullable<HTMLElement>;
            if (teleportTarget) {
              elementToTeleport.remove();
              teleportTarget.append(elementToTeleport);
            }
          }
        }
        stub.replaceWith(content);
      }
    });

    return fragment.content;
  }

  private _addEvents() {
    if ('events' in this.props) {
      const events: BlockEvents = this.props.events;

      if (!events || !this._element) {
        return;
      }
      Object.entries(events).forEach(([event, listener]) => {
        this._element?.addEventListener(event, listener);
      });
    }
  }

  private _removeEvents() {
    if ('events' in this.props) {
      const events: BlockEvents = this.props.events;

      if (!events || !this._element) {
        return;
      }

      Object.entries(events).forEach(([event, listener]) => {
        this._element?.removeEventListener(event, listener);
      });
    }
  }

  private _makePropsProxy(props: P) {
    return new Proxy(props, {
      get(target: P, name: string) {
        const value = target[name as keyof P];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: P, name: string, value: P[keyof P]) => {
        const oldTarget = cloneDeep(target);
        target[name as keyof P] = value;
        this.eventBus.emit(
          BLOCK_EVENTS.FLOW_UPDATE,
          oldTarget,
          cloneDeep(target)
        );
        return true;
      },
      deleteProperty() {
        throw new Error('access denied');
      },
    });
  }

  get element() {
    return this._element;
  }

  getContent(): Nullable<HTMLElement> {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      this.eventBus.emit(BLOCK_EVENTS.FLOW_CBM);
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

  hide() {
    const content = this.getContent();
    this.isDestroyed = true;
    this.eventBus.emit(BLOCK_EVENTS.FLOW_CBU);
    if (content) {
      content.remove();
      this.eventBus.emit(BLOCK_EVENTS.FLOW_CDU);
    }
    this._destroyAllChildrens();
  }

  destroySelf() {
    this.eventBus.destroy();
    this._removeEvents();
  }

  // Скрытие дочерних блоков для того, чтобы у них была отработка хуков жизненого цикла
  private _destroyAllChildrens() {
    Object.entries(this.children).forEach(([componentId, component]) => {
      component.hide();
      delete this.children[componentId];
    });
  }
}
