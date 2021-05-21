const analytics: any = {
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
  logScreenView: jest.fn(),
  logEvent: jest.fn(),
};

jest.mock('@react-native-firebase/analytics', () => ({
  __esModule: true,
  default: () => analytics,
}));

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
/* eslint-disable import/first */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import FirebasePlugin from '../index';

const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

const properties = {
  n: null,
  i: 123,
  s: 'abc',
  l: true,
  list: [1, 2, 3],
  data: { a: '789', b: 45.6 },
};

test('should return correct plugin id', () => {
  const plugin = new FirebasePlugin();
  expect(plugin.id).toEqual('firebase');
});

describe('load', () => {
  test('should not throw error', () => {
    const plugin = new FirebasePlugin();
    expect(() => plugin.load(pluginLoadOptions)).not.toThrow();
  });
});

describe('identify', () => {
  test('should call internal setUserId() if userId is defined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1');
    expect(analytics.setUserId).toHaveBeenCalledTimes(1);
    expect(analytics.setUserId.mock.calls[0][0]).toBe('user-1');
  });

  test('should not call internal setUserId() if userId is undefined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined);
    expect(analytics.setUserId).toHaveBeenCalledTimes(0);
  });

  test('should not call internal setUserProperties() if properties are not defined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, undefined);
    expect(analytics.setUserProperties).toHaveBeenCalledTimes(0);
  });

  test('should call internal setUserProperties() if properties are defined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, { a: null, b: 'abc' });
    expect(analytics.setUserProperties).toHaveBeenCalledTimes(1);
    expect(analytics.setUserProperties.mock.calls[0]).toEqual([{ a: null, b: 'abc' }]);
  });

  test('should stringify properties except strings and nulls', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, properties);
    expect(analytics.setUserProperties).toHaveBeenCalledTimes(1);
    expect(analytics.setUserProperties.mock.calls[0]).toEqual([{
      n: null,
      i: '123',
      s: 'abc',
      l: 'true',
      list: '[1,2,3]',
      data: '{"a":"789","b":45.6}',
    }]);
  });
});

describe('page', () => {
  test('should call internal setUserId() if userId is defined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.page('user-1');
    expect(analytics.setUserId).toHaveBeenCalledTimes(1);
    expect(analytics.setUserId.mock.calls[0][0]).toBe('user-1');
  });

  test('should not call internal setUserId() if userId is undefined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.page(undefined);
    expect(analytics.setUserId).toHaveBeenCalledTimes(0);
  });

  test('should call internal logScreenView() with page category and name', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.page(undefined, 'category A', 'page B');
    expect(analytics.logScreenView).toHaveBeenCalledTimes(1);
    expect(analytics.logScreenView.mock.calls[0]).toEqual([{
      screen_class: 'category A',
      screen_name: 'page B',
    }]);
  });
});

describe('track', () => {
  const event = { name: 'event-A', properties };

  test('should call internal setUserId() if userId is defined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', event);
    expect(analytics.setUserId).toHaveBeenCalledTimes(1);
    expect(analytics.setUserId.mock.calls[0][0]).toBe('user-1');
  });

  test('should not call internal setUserId() if userId is undefined', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, event);
    expect(analytics.setUserId).toHaveBeenCalledTimes(0);
  });

  test('should call internal logEvent() with event name and properties', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, event);
    expect(analytics.logEvent).toHaveBeenCalledTimes(1);
    expect(analytics.logEvent.mock.calls[0]).toEqual(['event-A', properties]);
  });
});

describe('reset', () => {
  test('should unset internal user id', () => {
    const plugin = new FirebasePlugin();
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(analytics.setUserId).toHaveBeenCalledTimes(1);
    expect(analytics.setUserId.mock.calls[0][0]).toBe(null);
  });
});
