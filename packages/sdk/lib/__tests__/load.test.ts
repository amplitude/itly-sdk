/* eslint-disable import/no-unresolved */
import Itly from '../base';
import { callItlyMethod, createPlugin } from './utils';

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('load', () => {
  test('should succeed with default options', () => {
    const itly = new Itly();

    expect(() => itly.load()).not.toThrow();
  });

  test('should throw exception if loaded more than once', () => {
    const itly = new Itly();

    itly.load();
    expect(() => itly.load()).toThrow('Itly is already initialized.');
  });

  describe('should throw exception if a method is called before load', () => {
    test.each(
      ['alias', 'identify', 'group', 'page', 'track', 'reset'],
    )('%s', (methodName) => {
      const itly = new Itly();

      expect(() => callItlyMethod(itly, methodName, ['user-1'])).toThrow('Itly is not yet initialized. Have you called `itly.load()` on app start?');
    });

    test('flush', async () => {
      const itly = new Itly();

      expect.assertions(1);
      try {
        await itly.flush();
      } catch (e) {
        expect(e.message).toEqual('Itly is not yet initialized. Have you called `itly.load()` on app start?');
      }
    });
  });

  test('should call plugin.load() for all plugins', () => {
    const itly = new Itly();
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    itly.load({
      plugins,
    });
    plugins.forEach((plugin) => expect(plugin.load).toHaveBeenCalledTimes(1));
  });
});
