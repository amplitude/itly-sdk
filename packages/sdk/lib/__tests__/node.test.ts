/* eslint-disable import/no-unresolved */
import Itly from '../node';

describe('required parameters for system events', () => {
  const itly = new Itly();
  itly.load();

  test('alias() should require userId', () => {
    expect(() => itly.alias('user-1')).not.toThrow();
  });

  test('identify() should require userId (can be undefined)', () => {
    expect(() => itly.identify('user-1')).not.toThrow();
    expect(() => itly.identify(undefined)).not.toThrow();
  });

  test('group() should require userId (can be undefined) and groupId', () => {
    expect(() => itly.group('user-1', 'group-1')).not.toThrow();
    expect(() => itly.group(undefined, 'group-1')).not.toThrow();
  });

  test('page() should require userId (can be undefined)', () => {
    expect(() => itly.page('user-1')).not.toThrow();
    expect(() => itly.page(undefined)).not.toThrow();
  });
});
