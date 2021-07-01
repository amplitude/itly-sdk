/* eslint-disable import/no-unresolved */
import Itly, { PluginCallOptions } from '../base';
import {
  callItlyMethod,
  createPlugin,
  getPluginMethods,
  hasPostMethod,
} from './utils';

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('plugins', () => {
  const properties = { a: 'abc', b: 123 };
  const event = { name: 'event-1', properties };

  const trackMethods: [string, any[]][] = [
    ['alias', ['user-1', 'user-2']],
    ['identify', ['user-1', properties]],
    ['group', ['user-1', 'group-1', properties]],
    ['page', ['user-1', 'category', 'name', properties]],
    ['track', ['user-1', event]],
  ];
  const resetMethod: [string, any[]] = ['reset', []];
  const flushMethod: [string, any[]] = ['flush', []];
  const allMethods = [...trackMethods, resetMethod, flushMethod];

  describe('should call method if itly is not disabled', () => {
    test.each(allMethods)('%s', (methodName, methodArgs) => {
      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [plugin],
      });

      callItlyMethod(itly, methodName, methodArgs);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(1);
      if (hasPostMethod(methodName)) {
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      }
      expect(pluginMethod.mock.calls[0].slice(0, -1)).toEqual(methodArgs);
    });
  });

  describe('should not call method if itly is disabled', () => {
    test.each(allMethods)('%s', (methodName, methodArgs) => {
      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [plugin],
        disabled: true,
      });

      callItlyMethod(itly, methodName, methodArgs);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(0);
      if (hasPostMethod(methodName)) {
        expect(pluginPostMethod).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('should call method for all plugins', () => {
    test.each(allMethods)('%s', (methodName, methodArgs) => {
      const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

      const itly = new Itly();
      itly.load({
        plugins,
      });

      callItlyMethod(itly, methodName, methodArgs);

      plugins.forEach((plugin) => {
        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        if (hasPostMethod(methodName)) {
          expect(pluginPostMethod).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  test('should call all methods for all plugins', () => {
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    allMethods.forEach(([methodName, methodArgs]) => callItlyMethod(itly, methodName, methodArgs));

    plugins.forEach((plugin: any) => {
      allMethods.forEach(([methodName]) => {
        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        if (hasPostMethod(methodName)) {
          expect(pluginPostMethod).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  describe('should call method for all plugins if some plugin throws error', () => {
    test.each(allMethods)('%s', (methodName, methodArgs) => {
      const failPlugin = createPlugin('plugin-fail');
      const [failPluginMethod] = getPluginMethods(failPlugin, methodName);
      failPluginMethod.mockImplementation(() => {
        throw new Error(`${methodName} error`);
      });

      const failPostPlugin = createPlugin('plugin-fail-post');
      if (hasPostMethod(methodName)) {
        const [, failPostPluginPostMethod] = getPluginMethods(failPostPlugin, methodName);
        failPostPluginPostMethod.mockImplementation(() => {
          throw new Error(`post ${methodName} error`);
        });
      }

      const plugins = [createPlugin('plugin-1'), failPlugin, createPlugin('plugin-2'), failPostPlugin, createPlugin('plugin-3')];

      const itly = new Itly();
      itly.load({
        plugins,
      });

      callItlyMethod(itly, methodName, methodArgs);

      plugins.forEach((plugin) => {
        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        if (hasPostMethod(methodName)) {
          expect(pluginPostMethod).toHaveBeenCalledTimes(1);
        }
      });
    });
  });

  describe('should filter call options by plugin id', () => {
    test.each(trackMethods)('%s', (methodName, methodArgs) => {
      const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3'), createPlugin('plugin-4')];

      const itly = new Itly();
      itly.load({
        plugins,
      });

      const callOptions: Record<string, PluginCallOptions> = {
        'plugin-1': {
          a: 123,
        },
        'plugin-3': {
          a: 'abc',
        },
        'plugin-4': {
          b: 'abc',
        },
      };

      callItlyMethod(itly, methodName, [...methodArgs, callOptions]);

      plugins.forEach((plugin) => {
        const [pluginMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        expect(pluginMethod.mock.calls[0].slice(-1)).toEqual([callOptions[plugin.id]]);
      });
    });
  });

  test('event is sent to all plugins if event.plugins is undefined', () => {
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    itly.track('user-1', event);

    plugins.forEach((plugin: any) => {
      const [trackMethod, pluginTrackMethod] = getPluginMethods(plugin, 'track');
      expect(trackMethod).toHaveBeenCalledTimes(1);
      expect(pluginTrackMethod).toHaveBeenCalledTimes(1);
    });
  });

  test('event is sent to a plugin if event.plugins[plugin.id] is true or undefined', () => {
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    itly.track('user-1', {
      ...event,
      plugins: { 'plugin-1': false, 'plugin-3': true },
    });

    plugins.forEach((plugin: any) => {
      const [trackMethod, postTrackMethod] = getPluginMethods(plugin, 'track');
      expect(trackMethod).toHaveBeenCalledTimes(plugin.id === 'plugin-1' ? 0 : 1);
      expect(postTrackMethod).toHaveBeenCalledTimes(plugin.id === 'plugin-1' ? 0 : 1);
    });
  });
});
