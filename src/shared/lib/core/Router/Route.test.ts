import { expect } from 'chai';
import sinon from 'sinon';
import { Block } from '../Block';
import { Route } from './Route';

describe('Route Class', () => {
  const hideCallback = sinon.stub();
  const initCallback = sinon.stub();

  const path = '/';

  class mockBlock extends Block {
    hide() {
      hideCallback();
    }

    componentDidInited() {
      initCallback();
      return null;
    }
  }

  let instance: Route;

  beforeEach(() => {
    instance = new Route({ path, component: mockBlock }, {});
    hideCallback.resetHistory();
    initCallback.resetHistory();
  });

  it('should init', () => {
    new Route({ path, component: mockBlock }, {});
  });

  it('should init passed block', () => {
    instance.render();

    expect(initCallback.calledOnce).to.eq(true);
  });

  it('should leave', () => {
    instance.render();

    instance.leave();

    expect(hideCallback.calledOnce).to.eq(true);
  });

  it('should match by passed path', () => {
    const isMatched = instance.match(path);

    expect(isMatched).to.eq(true);
  });
});
