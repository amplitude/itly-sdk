/* eslint-disable import/no-unresolved */
import Itly from '../node';
import { callItlyMethod, createPlugin, getPluginMethods } from './utils';

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
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
    itly.track('user-1', event);
    expect(plugin.track).toHaveBeenCalledTimes(1);
    expect((plugin.track as any).mock.calls[0].slice(0, 2)).toEqual(['user-1', event]);
  });

  test('context should be merged on track if context is defined', () => {
    const itly = new Itly();
    const plugin = createPlugin();
    const context = { b: 'xyz', c: 789 };
    itly.load({
      context,
      plugins: [plugin],
    });

    const event = { name: 'event-1', properties };
    itly.track('user-1', event);
    expect(plugin.track).toHaveBeenCalledTimes(1);
    expect((plugin.track as any).mock.calls[0].slice(0, 2)).toEqual(['user-1', {
      name: event.name,
      properties: { ...context, ...event.properties },
    }]);
  });

  test.each([
    ['identify', ['user-1', properties]],
    ['group', ['user-1', 'group-1', properties]],
    ['page', ['user-1', 'category', 'page', properties]],
  ])('context should not be merged on %s if context is defined', (methodName, methodArgs) => {
    const plugin = createPlugin();

    const itly = new Itly();
    itly.load({
      context: { b: 'xyz', c: 789 },
      plugins: [plugin],
    });

    callItlyMethod(itly, methodName, methodArgs);

    const [pluginMethod] = getPluginMethods(plugin, methodName);
    expect(pluginMethod).toHaveBeenCalledTimes(1);
    expect(pluginMethod.mock.calls[0].slice(0, -1)).toEqual(methodArgs);
  });
});
