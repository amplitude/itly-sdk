/* eslint-disable import/no-unresolved */
import Itly from '../node';

describe('required parameters for system events', () => {
  const itly = new Itly();
  itly.load();

  test('alias() should require userId', () => {
    expect(() => itly.alias('user-1')).not.toThrow();
  });

  test('identify() should require userId', () => {
    expect(() => itly.identify('user-1')).not.toThrow();
  });

  test('group() should require userId and groupId', () => {
    expect(() => itly.group('user-1', 'group-1')).not.toThrow();
  });

  test('page() should require userId', () => {
    expect(() => itly.page('user-1')).not.toThrow();
  });
});
