/**
 * Tests for Browser version of SDK
 * @jest-environment jsdom
 */
/* eslint-disable import/no-unresolved */
import Itly, { Event, Plugin, Validation } from '../base';

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
    expect(() => (itly as any)[methodName]('user-1')).toThrow('Itly is not yet initialized. Have you called `itly.load()` on app start?');
  });

  test.each(
    ['reset', 'flush'],
  )('should not throw exception if %s is called before load', (methodName) => {
    const itly = new Itly();
    (itly as any)[methodName]();
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
  test('context should not be merged on track if context is undefined', () => {
    const itly = new Itly();
    const plugin = createPlugin();
    itly.load({
      plugins: [plugin],
    });

    const event = { name: 'event-1', properties: { a: 'abc', b: 123 } };
    itly.track('user-1', event);
    expect(plugin.track).toHaveBeenCalledTimes(1);
    expect((plugin.track as any).mock.calls[0].slice(0, 2)).toEqual(['user-1', event]);
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

    const event = { name: 'event-1', properties: { a: 'abc', b: 123 } };
    itly.track('user-1', event);
    expect(plugin.track).toHaveBeenCalledTimes(1);
    expect((plugin.track as any).mock.calls[0].slice(0, 2)).toEqual(['user-1', {
      name: 'event-1',
      properties: { a: 'abc', b: 123, c: 789 },
    }]);
  });

  test.each([
    ['identify', ['user-1']],
    ['group', ['user-1', 'group-1']],
    ['page', ['user-1', 'category', 'name']],
  ])('context should not be merged on %s if context is defined', (methodName, methodArgs) => {
    const itly = new Itly();
    const plugin = createPlugin();
    itly.load({
      context: {
        b: 'xyz',
        c: 789,
      },
      plugins: [plugin],
    });

    const properties = { a: 'abc', b: 123 };
    const args = [...methodArgs, properties];
    (itly as any)[methodName](...args);
    expect((plugin as any)[methodName]).toHaveBeenCalledTimes(1);
    expect((plugin as any)[methodName].mock.calls[0].slice(0, -1)).toEqual(args);
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
      const postMethodName = `post${capitalize(methodName)}`;

      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        environment: 'development',
      });

      expect(() => (itly as any)[methodName](...methodArgs)).toThrow(`Validation Error: ${methodName} error`);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(0);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should track invalid event on %s if environment is production',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        environment: 'production',
      });

      (itly as any)[methodName](...methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(1);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should throw validation error on %s if event is not valid and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.ErrorOnInvalid,
      });

      expect(() => (itly as any)[methodName](...methodArgs)).toThrow(`Validation Error: ${methodName} error`);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(0);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should track invalid event on %s if options.validation = TrackOnInvalid',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.TrackOnInvalid,
      });

      (itly as any)[methodName](...methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(1);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should skip validation on %s if options.validation = Disabled',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

      const validationPlugin = createPlugin();
      validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

      const plugin = createPlugin();

      const itly = new Itly();
      itly.load({
        plugins: [validationPlugin, plugin],
        validation: Validation.Disabled,
      });

      (itly as any)[methodName](...methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(0);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(1);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods)('should throw validation error on %s if validate() throws exception and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

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

      expect(() => (itly as any)[methodName](...methodArgs)).toThrow(`Validation Error: ${methodName} exception`);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(0);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods.filter(([methodName]) => methodName === 'track'))('should throw validation error on %s if context is not valid and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

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

      expect(() => (itly as any)[methodName](...methodArgs)).toThrow('Validation Error: context error');
      expect(validationPlugin.validate).toHaveBeenCalledTimes(2);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(0);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });

  test.each(callMethods.filter(([methodName]) => methodName !== 'track'))('should track valid event on %s if context is not valid and options.validation = ErrorOnInvalid',
    (methodName, methodArgs) => {
      const postMethodName = `post${capitalize(methodName)}`;

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

      (itly as any)[methodName](...methodArgs);
      expect(validationPlugin.validate).toHaveBeenCalledTimes(1);
      expect((plugin as any)[methodName]).toHaveBeenCalledTimes(1);
      expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    });
});

describe('plugin', () => {
  const properties = { a: 'abc', b: 123 };

  const callMethods: [string, any[]][] = [
    ['identify', ['user-1', properties]],
    ['group', ['user-1', 'group-1', properties]],
    ['page', ['user-1', 'category', 'name', properties]],
    ['track', ['user-1', { name: 'event-1', properties }]],
  ];
  test.each(callMethods)('should call %s if itly is not disabled', (methodName, methodArgs) => {
    const postMethodName = `post${capitalize(methodName)}`;
    const plugin = createPlugin();

    const itly = new Itly();
    itly.load({
      plugins: [plugin],
    });

    (itly as any)[methodName](...methodArgs);
    expect((plugin as any)[methodName]).toHaveBeenCalledTimes(1);
    expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(1);
    expect((plugin as any)[methodName].mock.calls[0].slice(0, -1)).toEqual(methodArgs);
  });

  test.each(callMethods)('should not call %s if itly is disabled', (methodName, methodArgs) => {
    const postMethodName = `post${capitalize(methodName)}`;
    const plugin = createPlugin();

    const itly = new Itly();
    itly.load({
      plugins: [plugin],
      disabled: true,
    });

    (itly as any)[methodName](...methodArgs);
    expect((plugin as any)[methodName]).toHaveBeenCalledTimes(0);
    expect((plugin as any)[postMethodName]).toHaveBeenCalledTimes(0);
  });

  test.each(callMethods)('should call %s for all plugins', (methodName, methodArgs) => {
    const postMethodName = `post${capitalize(methodName)}`;
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    (itly as any)[methodName](...methodArgs);
    plugins.forEach((plugin: any) => {
      expect(plugin[methodName]).toHaveBeenCalledTimes(1);
      expect(plugin[postMethodName]).toHaveBeenCalledTimes(1);
    });
  });

  test('should call all methods for all plugins', () => {
    const plugins = [createPlugin('plugin-1'), createPlugin('plugin-2'), createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    callMethods.forEach(([methodName, methodArgs]) => (itly as any)[methodName](...methodArgs));
    plugins.forEach((plugin: any) => {
      callMethods.forEach(([methodName]) => {
        const postMethodName = `post${capitalize(methodName)}`;
        expect(plugin[methodName]).toHaveBeenCalledTimes(1);
        expect(plugin[postMethodName]).toHaveBeenCalledTimes(1);
      });
    });
  });

  test.each(callMethods)('should call %s for all plugins if some plugin throws error', (methodName, methodArgs) => {
    const postMethodName = `post${capitalize(methodName)}`;

    const failPlugin = createPlugin('plugin-fail');
    (failPlugin as any)[methodName] = jest.fn(() => {
      throw new Error(`${methodName} error`);
    });

    const failPostPlugin = createPlugin('plugin-fail-post');
    (failPostPlugin as any)[postMethodName] = jest.fn(() => {
      throw new Error(`${postMethodName} error`);
    });

    const plugins = [createPlugin('plugin-1'), failPlugin, createPlugin('plugin-2'), failPostPlugin, createPlugin('plugin-3')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    (itly as any)[methodName](...methodArgs);
    plugins.forEach((plugin: any) => {
      expect(plugin[methodName]).toHaveBeenCalledTimes(1);
      expect(plugin[postMethodName]).toHaveBeenCalledTimes(1);
    });
  });
});
