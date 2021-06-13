/* eslint-disable import/no-unresolved */
import Itly from '../browser';

describe('required parameters for system events', () => {
  const itly = new Itly();
  itly.load();

  test('alias() should require userId', () => {
    expect(() => itly.alias('user-1')).not.toThrow();
  });

  test('identify() should not require anything', () => {
    expect(() => itly.identify()).not.toThrow();
  });

  test('group() should require groupId', () => {
    expect(() => itly.group('group-1')).not.toThrow();
  });

  test('page() should not require anything', () => {
    expect(() => itly.page()).not.toThrow();
  });
});
