import { expect } from 'chai';
import sinon from 'sinon';
import { Block } from 'shared/lib/core';
import { Router } from './Router';

describe('Router Class', () => {
  class mockBlock extends Block {}
  class mockBlock2 extends Block {}

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
    const router = new Router();
    router.routes = [];
  });

  it('should create instance of Router', () => {
    new Router();
  });

  it('success add Routes', () => {
    const router = new Router().use([{ path: '/', component: mockBlock }]);

    expect(router.routes.length).to.eq(1);
  });

  it('should return one instance on some instantiation Router', () => {
    const firstInstanceOfRoute = new Router();
    const secondInstanceOfRoute = new Router();

    expect(firstInstanceOfRoute).to.eql(secondInstanceOfRoute);
  });

  it('should find route in by path in passed routes', () => {
    const path = '/some-path';
    const router = new Router().use([
      { path: '/', component: mockBlock },
      { path: path, component: mockBlock2 },
    ]);

    router.go(path);
    const route = router.getRoute(path);
    expect(router.getCurrentRoute()).to.eql(route);
  });

  it('should throw error on finding not exist route in passed routes', () => {
    const notExistedPath = '/404';
    const router = new Router().use([
      { path: '/', component: mockBlock },
      { path: '/some-path', component: mockBlock2 },
    ]);

    const func = () => {
      router.go(notExistedPath);
    };
    expect(func).to.throw(Error);
  });

  it('should render Block by passed path', async () => {
    const callback = sinon.stub();

    class mockBlock extends Block {
      componentDidInited(): void {
        callback();
      }
    }
    const router = new Router().use([{ path: '/', component: mockBlock }]);
    router.go('/');

    expect(callback.calledOnce).to.eq(true);
  });

  it('should hide block on leave block path', () => {
    const callback = sinon.stub();
    class mockBlock extends Block {
      componentBeforeUnmount(_props: any): void {
        callback();
      }
    }

    const router = new Router().use([
      { path: '/', component: mockBlock },
      { path: '/some-path', component: mockBlock2 },
    ]);

    router.go('/');
    router.go('/some-path');

    expect(callback.calledOnce).to.eq(true);
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
