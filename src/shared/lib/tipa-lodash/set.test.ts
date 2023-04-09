/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import { set } from './set';

describe('set helper', () => {
  let object = {} as any;
  const path = 'a.b';
  const value = 3;

  beforeEach(() => {
    object = {};
  });

  it('it should set a value by keypath', () => {
    const result = set(object, path, value) as any;

    expect(result.a.b).to.eq(value);
  });

  it('should return passed "object" parameter if it is not an object', () => {
    const object = 'not a object';

    const result = set(object, path, value) as any;
    expect(result).to.eq(object);
  });

  it('should throw error if "path" paraments is not string', () => {
    const object = {};
    const path = Symbol('not a string');
    const value = 3;

    const func = () => {
      set(object, path as unknown as string, value);
    };

    expect(func).to.throw(Error);
  });

  it('should mutate passed object, not create a new one', () => {
    set(object, path, value) as any;

    expect(object.a.b).to.eq(value);
  });
});
