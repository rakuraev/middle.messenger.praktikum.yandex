/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from 'shared/lib/core';
import { Link } from './link';

describe('Link Component', () => {
  const href = '/';
  const label = 'Home Page';
  const router = {} as Router;

  it('should render', () => {
    new Link({ href, label, router });
  });

  it('should render passed label', () => {
    const link = new Link({
      href,
      label,
      router: {} as Router,
    });

    expect(link.element?.textContent).to.eq(label);
  });

  it('should call Router.go with passed href on click', () => {
    const callback = sinon.stub();

    const link = new Link({
      href,
      label,
    });

    link.props.router = { go: callback } as unknown as Router;

    link.element?.click();

    expect(callback.calledWith(href)).to.eq(true);
  });
});
