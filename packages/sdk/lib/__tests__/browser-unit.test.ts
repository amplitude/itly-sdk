/**
 * Tests for Browser version of SDK
 * @jest-environment jsdom
 */
/* eslint-disable import/no-unresolved */
import Itly from '../browser';
import {
  Event, Loggers, Plugin, PluginCallOptions, PluginLoadOptions, Validation,
} from '../base';

const createPlugin = jest.fn((id?: string) => ({
  id: id ?? 'mock-plugin',
  validate: () => ({ valid: true }),
  load: jest.fn(),
  alias: jest.fn(),
  identify: jest.fn(),
  postIdentify: jest.fn(),
  group: jest.fn(),
  postGroup: jest.fn(),
  page: jest.fn(),
  postPage: jest.fn(),
  track: jest.fn(),
  postTrack: jest.fn(),
  reset: jest.fn(),
  flush: jest.fn(),
// eslint-disable-next-line no-unused-vars
})) as unknown as ((id?: string) => Plugin);

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function callItlyMethod(itly: Itly, methodName: string, args: any[] = []): jest.Mock {
  return (itly as any)[methodName](...args);
}

function getPluginMethods(plugin: Plugin, methodName: string): [jest.Mock, jest.Mock] {
  return [(plugin as any)[methodName], (plugin as any)[`post${capitalize(methodName)}`]];
}

function hasPostMethod(methodName: string) {
  return ['identify', 'group', 'page', 'track'].some((name) => methodName === name);
}

describe('load', () => {
  test('should succeed with default options', () => {
    const itly = new Itly();

    itly.load();
  });

  test('should throw exception if loaded more than once', () => {
    const itly = new Itly();

    itly.load();
    expect(() => itly.load()).toThrow('Itly is already initialized.');
  });

  test.each(
    ['alias', 'identify', 'group', 'page', 'track'],
  )('should throw exception if %s is called before load', (methodName) => {
    const itly = new Itly();

    expect(() => callItlyMethod(itly, methodName, ['user-1'])).toThrow('Itly is not yet initialized. Have you called `itly.load()` on app start?');
  });

  test.each(
    ['reset', 'flush'],
  )('should not throw exception if %s is called before load', (methodName) => {
    const itly = new Itly();

    callItlyMethod(itly, methodName);
  });

  test('should call plugin.load()', () => {
    const itly = new Itly();
    const plugin = createPlugin();

    itly.load({
      plugins: [plugin],
    });
    expect(plugin.load).toHaveBeenCalledTimes(1);
  });
});

describe('context', () => {
  const properties = { a: 'abc', b: 123 };

  test('context should not be merged on track if context is undefined', () => {
    const itly = new Itly();
    const plugin = createPlugin();
    itly.load({
      plugins: [plugin],
    });

    const event = { name: 'event-1', properties };
    itly.track(event);
    expect(plugin.track).toHaveBeenCalledTimes(1);
    expect((plugin.track as any).mock.calls[0].slice(0, 2)).toEqual([undefined, event]);
  });

  test('context should be merged on track if context is defined', () => {
    const itly = new Itly();
    const plugin = createPlugin();
    itly.load({
      context: {
        b: 'xyz',
        c: 789,
      },
      plugins: [plugin],
    });

    const event = { name: 'event-1', properties };
    itly.track(event);
    expect(plugin.track).toHaveBeenCalledTimes(1);
    expect((plugin.track as any).mock.calls[0].slice(0, 2)).toEqual([undefined, {
      name: 'event-1',
      properties: { a: 'abc', b: 123, c: 789 },
    }]);
  });

  test.each([
    ['identify', [properties]],
    ['group', ['group-1', properties]],
    ['page', ['category', 'page', properties]],
  ])('context should not be merged on %s if context is defined', (methodName, methodArgs) => {
    const plugin = createPlugin();

    const itly = new Itly();
    itly.load({
      context: {
        b: 'xyz',
        c: 789,
      },
      plugins: [plugin],
    });

    callItlyMethod(itly, methodName, methodArgs);

    const [pluginMethod] = getPluginMethods(plugin, methodName);
    expect(pluginMethod).toHaveBeenCalledTimes(1);
    expect(pluginMethod.mock.calls[0].slice(0, -1)).toEqual([undefined, ...methodArgs]);
  });
});

describe('validation', () => {
  const properties = { a: 'abc', b: 123 };

  const callMethods: [string, any[]][] = [
    ['identify', ['user-1', properties]],
    ['group', ['user-1', 'group-1', properties]],
    ['page', ['user-1', 'category', 'name', properties]],
    ['track', ['user-1', { name: 'event-1', properties }]],
  ];

  test.each(callMethods)('should throw validation error on %s if event is not valid and environment is development',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        environment: 'development',
      });

      expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow(`Validation Error: ${methodName} error`);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(0);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should track invalid event on %s if environment is production',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        environment: 'production',
      });

      callItlyMethod(itly, methodName, methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(1);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should throw validation error on %s if event is not valid and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.ErrorOnInvalid,
      });

      expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow(`Validation Error: ${methodName} error`);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(0);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should track invalid event on %s if options.validation = TrackOnInvalid',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.TrackOnInvalid,
      });

      callItlyMethod(itly, methodName, methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(1);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should skip validation on %s if options.validation = Disabled',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.Disabled,
      });

      callItlyMethod(itly, methodName, methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(0);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(1);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should throw validation error on %s if validate() throws exception and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => {
        throw new Error(`${methodName} exception`);
      });

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.ErrorOnInvalid,
      });

      expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow(`Validation Error: ${methodName} exception`);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(0);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods.filter(([methodName]) => methodName === 'track'))('should throw validation error on %s if context is not valid and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(
        (event: Event) => (event.name === 'context' ? { valid: false, message: 'context error' } : { valid: true }),
      );

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        context: {
          a: 123,
        },
        plugins: [validationPlugin, plugin],
        validation: Validation.ErrorOnInvalid,
      });

      expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow('Validation Error: context error');
      expect(validationPlugin.validate).toHaveBeenCalledTimes(2);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(0);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods.filter(([methodName]) => methodName !== 'track'))('should track valid event on %s if context is not valid and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(
        (event: Event) => (event.name === 'context' ? { valid: false, message: 'context error' } : { valid: true }),
      );

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        context: {
          a: 123,
        },
        plugins: [validationPlugin, plugin],
        validation: Validation.ErrorOnInvalid,
      });

      callItlyMethod(itly, methodName, methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

      const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
      expect(pluginMethod).toHaveBeenCalledTimes(1);
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
    });
});

describe('plugin', () => {
  const properties = { a: 'abc', b: 123 };

  const trackMethods: [string, any[]][] = [
    ['alias', ['user-1', 'user-2']],
    ['identify', [properties]],
    ['group', ['group-1', properties]],
    ['page', ['category', 'name', properties]],
    ['track', [{ name: 'event-1', properties }]],
  ];
  const resetMethod: [string, any[]] = ['reset', []];
  const flushMethod: [string, any[]] = ['flush', []];
  const allMethods = [...trackMethods, resetMethod, flushMethod];

  test.each(trackMethods)('should call %s if itly is not disabled', (methodName, methodArgs) => {
    const plugin = createPlugin();

    const itly = new Itly();
    itly.load({
      plugins: [plugin],
    });

    callItlyMethod(itly, methodName, methodArgs);

    const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
    expect(pluginMethod).toHaveBeenCalledTimes(1);
    if (methodName !== 'alias') {
      expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      expect(pluginMethod.mock.calls[0].slice(0, -1)).toEqual([undefined, ...methodArgs]);
    } else {
      expect(pluginMethod.mock.calls[0].slice(0, -1)).toEqual(methodArgs);
    }
  });

  test.each(trackMethods)('should not call %s if itly is disabled', (methodName, methodArgs) => {
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

  test.each(allMethods)('should call %s for all plugins', (methodName, methodArgs) => {
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

  test.each(allMethods)('should call %s for all plugins if some plugin throws error', (methodName, methodArgs) => {
    const failPlugin = createPlugin('plugin-fail');
    const [failPluginMethod] = getPluginMethods(failPlugin, methodName);
    failPluginMethod.mockImplementation(() => {
      throw new Error(`${methodName} error`);
    });

    const failPostPlugin = createPlugin('plugin-fail-post');
    const [, failPostPluginPostMethod] = getPluginMethods(failPostPlugin, methodName);
    if (hasPostMethod(methodName)) {
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

  test.each(trackMethods)('should filter call options for %s by plugin id', (methodName, methodArgs) => {
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

describe('per event destinations', () => {
  const event = { name: 'event-1', properties: { a: 'abc', b: 123 } };

  test('event is sent to all plugins if event.plugins is undefined', () => {
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    itly.track(event);

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

    itly.track({
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

describe('logging', () => {
  class TestPlugin extends Plugin {
    // eslint-disable-next-line no-useless-constructor
    constructor(id: string) {
      super(id);
    }

    load(options: PluginLoadOptions) {
      super.load(options);
      options.logger.info('test plugin info');
      options.logger.debug('test plugin info');
      options.logger.warn('test plugin info');
      options.logger.error('test plugin info');
    }
  }

  let spyConsoleMethods: jest.SpyInstance[] = [];

  beforeEach(() => {
    spyConsoleMethods = [
      jest.spyOn(console, 'log').mockImplementation(),
      jest.spyOn(console, 'debug').mockImplementation(),
      jest.spyOn(console, 'info').mockImplementation(),
      jest.spyOn(console, 'warn').mockImplementation(),
      jest.spyOn(console, 'error').mockImplementation(),
    ];
  });

  afterEach(() => {
    spyConsoleMethods.forEach((mock) => mock.mockRestore());
  });

  test('should not output to console by default', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    spyConsoleMethods.forEach((mock) => expect(mock).toHaveBeenCalledTimes(0));
  });

  test('should output to console with Loggers.Console', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const itly = new Itly();
    itly.load({
      plugins,
      logger: Loggers.Console,
    });

    spyConsoleMethods.slice(0, 1).forEach((mock) => expect(mock).toHaveBeenCalledTimes(0));
    spyConsoleMethods.slice(1).forEach((mock) => expect(mock).toHaveBeenCalled());
  });

  test('should not output to console with Loggers.None', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const itly = new Itly();
    itly.load({
      plugins,
      logger: Loggers.None,
    });

    spyConsoleMethods.forEach((mock) => expect(mock).toHaveBeenCalledTimes(0));
  });

  test('should output with custom Logger', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    const itly = new Itly();
    itly.load({
      plugins,
      logger,
    });

    expect(logger.debug).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });
});
