import { expect } from 'chai';
import sinon from 'sinon';
import { Block } from 'shared/lib/core';
import { Router } from './Router';

describe('Router Class', () => {
  const hideCallback = sinon.stub();
  const getContentCallback = sinon.stub();
  class mockBlock extends Block {
    hide() {
      hideCallback();
    }

    getContent() {
      getContentCallback();
      return null;
    }
  }

  class mockBlock2 extends Block {}

  const path1 = '/';
  const path2 = '/some-path';

  const createRouter = () => {
    return new Router().use([
      { path: path1, component: mockBlock },
      { path: path2, component: mockBlock2 },
    ]);
  };

  window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    hideCallback.resetHistory();
    getContentCallback.resetHistory();
    const router = new Router();
    router.routes = [];
    router._currentRoute = null;
  });

  it('should create instance of Router', () => {
    new Router();
  });

  it('success add Routes', () => {
    const router = createRouter();

    expect(router.routes.length).to.eq(2);
  });

  it('should return one instance on some instantiation Router', () => {
    const firstInstanceOfRoute = new Router();
    const secondInstanceOfRoute = new Router();

    expect(firstInstanceOfRoute).to.eql(secondInstanceOfRoute);
  });

  it('should find route in by path in passed routes', () => {
    const router = createRouter();

    router.go(path1);
    const route = router.getRoute(path1);
    expect(router.getCurrentRoute()).to.eql(route);
  });

  it('should throw error on finding not exist route in passed routes', () => {
    const notExistedPath = '/404';
    const router = createRouter();

    const func = () => {
      router.go(notExistedPath);
    };

    expect(func).to.throw(Error);
  });

  it('should render Block by passed path', () => {
    const router = new Router().use([{ path: '/', component: mockBlock }]);

    router.go('/');

    expect(getContentCallback.calledOnce).to.eq(true);
  });

  it('should hide block on leave block path', () => {
    const router = createRouter();

    router.go('/');
    router.go('/some-path');

    expect(hideCallback.calledOnce).to.eq(true);
  });

  it('should add event onpopstate', () => {
    new Router();

    expect(window.onpopstate).to.not.eq(null);
  });

  it('should call _onPopState onpopstate event', () => {
    const callback = sinon.stub();

    class mockRouter extends Router {
      _onPopState(): void {
        callback();
      }
    }
    const router = new mockRouter().use([{ path: '/', component: mockBlock }]);

    router.go('/');
    router.back();

    expect(callback.calledOnce).to.eq(true);
  });
});
