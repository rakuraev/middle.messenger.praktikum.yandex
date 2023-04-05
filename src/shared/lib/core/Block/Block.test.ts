import { expect } from 'chai';
import Handlebars from 'handlebars';
import sinon from 'sinon';
import registerComponent from 'shared/lib/registerComponents';
import { omit, sleep } from 'shared/lib/tipa-lodash';
import { Block } from './Block';

type Props = {
  text: string;
  events?: { click: (e: Event) => void };
};

describe('Block class', () => {
  const template = '<div>{{text}}</div>';
  const props: Props = { text: 'Hello i`m Block' };

  const createComponentClass = (template: string, name = 'Component') => {
    return class Component extends Block<Props> {
      static _name = name;

      render(): string {
        return template;
      }
    };
  };
  const defaultHelpers = { ...Handlebars.helpers };

  beforeEach(() => {
    const customHelpersKeys = omit(
      Handlebars.helpers,
      Object.keys(defaultHelpers)
    );
    Object.keys(customHelpersKeys).forEach((helperName) =>
      Handlebars.unregisterHelper(helperName)
    );
  });

  it('should render', () => {
    const Component = createComponentClass(template);
    new Component(props);
  });

  it('should render text from passed props', () => {
    const Component = createComponentClass(template);
    const component = new Component(props);

    const element = component.element;

    expect(element?.textContent).to.eq(props.text);
  });

  it('should set state from passed props', () => {
    const Component = createComponentClass(template);
    const component = new Component(props);

    const state = component.state;

    expect(state).to.deep.eq(props);
  });

  it('should add eventListenets on element', () => {
    const onClick = sinon.stub();
    const propsWithEvents: Props = { ...props, events: { click: onClick } };
    const Component = createComponentClass(template);
    const component = new Component(propsWithEvents);

    component.element?.click();

    expect(onClick.calledOnce).to.eq(true);
  });

  it('should update on set value to state', async () => {
    const onUpdate = sinon.stub();

    const Component = createComponentClass(template);

    const component = new Component(props);

    component.componentDidUpdate = onUpdate;

    component.setState({ ...component.state, text: 'NEW TEXT' });

    await sleep(50);

    expect(onUpdate.calledOnce).to.eq(true);
  });

  it('should hide children on hide or update component', () => {
    const parentTemplate = '<div>{{{Child ref="Child"}}}</div>';
    const childTemplate = '<div>Hello i`m child</div>';
    const parentComponentClass = createComponentClass(parentTemplate, 'Parent');
    const childComponentClass = createComponentClass(childTemplate, 'Child');
    registerComponent(childComponentClass);

    const parentComponent = new parentComponentClass();
    const childComponent = parentComponent.refs.Child as Block;
    parentComponent.hide();

    expect(childComponent.isDestroyed).to.eq(true);
  });

  it('should render content in slot target', () => {
    const parentTemplate =
      '<div>{{#Child ref="Child"}}{{text}}{{/Child}}</div>';
    const childTemplate = '<div slot></div>';
    const parentComponentClass = createComponentClass(parentTemplate, 'Parent');
    const childComponentClass = createComponentClass(childTemplate, 'Child');
    registerComponent(childComponentClass);

    const parentComponent = new parentComponentClass(props);
    const childComponent = parentComponent.refs.Child as Block;

    expect(childComponent.element?.textContent).to.eq(props.text);
  });
});
