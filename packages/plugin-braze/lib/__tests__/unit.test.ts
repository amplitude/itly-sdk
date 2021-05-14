/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import BrazePlugin from '../index';

const apiKey = 'API-KEY';
const brazeOptions = { baseUrl: '' };
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let appboy: any;

const loadBraze = jest.fn(() => {
  const user = {
    setCustomUserAttribute: jest.fn(),
    setFirstName: jest.fn(),
    setEmail: jest.fn(),
    setPhoneNumber: jest.fn(),
    setDateOfBirth: jest.fn(),
  };
  appboy = {
    initialize: jest.fn(),
    openSession: jest.fn(),
    changeUser: jest.fn(),
    getUser: jest.fn(() => user),
    logCustomEvent: jest.fn(),
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(BrazePlugin.prototype, 'appboy', 'get').mockImplementation(() => appboy);
  jest.spyOn(BrazePlugin.prototype, 'loadBraze').mockImplementation(loadBraze);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  appboy = undefined;
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
  const plugin = new BrazePlugin(apiKey, brazeOptions);
  expect(plugin.id).toEqual('braze');
});

describe('load', () => {
  test('should load braze if it is not already loaded', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);

    expect(plugin.appboy).toBeUndefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.appboy).toBeDefined();
    expect(loadBraze).toHaveBeenCalledTimes(1);
    expect(appboy.initialize).toHaveBeenCalledTimes(1);
    expect(appboy.openSession).toHaveBeenCalledTimes(1);
  });

  test('should not load braze if it is already loaded', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);

    appboy = {};
    expect(plugin.appboy).toBeDefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.appboy).toBeDefined();
    expect(loadBraze).toHaveBeenCalledTimes(0);
  });

  test('should load braze once', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);

    expect(plugin.appboy).toBeUndefined();
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    expect(plugin.appboy).toBeDefined();
    expect(loadBraze).toHaveBeenCalledTimes(1);
    expect(appboy.initialize).toHaveBeenCalledTimes(1);
    expect(appboy.openSession).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal changeUser() if userId is defined', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1');
    expect(appboy.changeUser).toHaveBeenCalledTimes(1);
    expect(appboy.changeUser.mock.calls[0][0]).toBe('user-1');
    expect(appboy.getUser).toHaveBeenCalledTimes(0);
    expect(appboy.getUser().setCustomUserAttribute).toHaveBeenCalledTimes(0);
  });

  test('should not call internal changeUser() if userId is undefined', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined);
    expect(appboy.changeUser).toHaveBeenCalledTimes(0);
    expect(appboy.getUser).toHaveBeenCalledTimes(0);
    expect(appboy.getUser().setCustomUserAttribute).toHaveBeenCalledTimes(0);
  });

  test('should call internal setCustomUserAttribute() with properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, { a: 123, b: 'abc' });
    expect(appboy.getUser).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setCustomUserAttribute).toHaveBeenCalledTimes(2);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[0]).toEqual(['a', 123]);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[1]).toEqual(['b', 'abc']);
  });

  test('should stringify object and array properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, properties);
    expect(appboy.getUser).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setCustomUserAttribute).toHaveBeenCalledTimes(6);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[0]).toEqual(['n', null]);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[1]).toEqual(['i', 123]);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[2]).toEqual(['s', 'abc']);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[3]).toEqual(['l', true]);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[4]).toEqual(['list', '[1,2,3]']);
    expect(appboy.getUser().setCustomUserAttribute.mock.calls[5]).toEqual(['data', '{"a":"789","b":45.6}']);
  });

  test('should call set methods for predefined user attributes', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, {
      first_name: 'John',
      email: 'john@mail.test',
      phone: '123-45',
      dob: '2001-03-25',
    });
    expect(appboy.getUser).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setCustomUserAttribute).toHaveBeenCalledTimes(0);
    expect(appboy.getUser().setFirstName).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setFirstName.mock.calls[0]).toEqual(['John']);
    expect(appboy.getUser().setEmail).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setEmail.mock.calls[0]).toEqual(['john@mail.test']);
    expect(appboy.getUser().setPhoneNumber).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setPhoneNumber.mock.calls[0]).toEqual(['123-45']);
    expect(appboy.getUser().setDateOfBirth).toHaveBeenCalledTimes(1);
    expect(appboy.getUser().setDateOfBirth.mock.calls[0]).toEqual([2001, 3, 25]);
  });
});

describe('track', () => {
  test('should call internal changeUser() if userId is defined', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', { name: 'event-A' });
    expect(appboy.changeUser).toHaveBeenCalledTimes(1);
    expect(appboy.changeUser.mock.calls[0][0]).toBe('user-1');
    expect(appboy.logCustomEvent).toHaveBeenCalledTimes(1);
  });

  test('should not call internal changeUser() if userId is undefined', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, { name: 'event-A' });
    expect(appboy.changeUser).toHaveBeenCalledTimes(0);
    expect(appboy.logCustomEvent).toHaveBeenCalledTimes(1);
  });

  test('should call internal logCustomEvent() with event name and properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, { name: 'event-A', properties: { a: 'abc', b: 123 } });
    expect(appboy.logCustomEvent).toHaveBeenCalledTimes(1);
    expect(appboy.logCustomEvent.mock.calls[0]).toEqual(['event-A', { a: 'abc', b: 123 }]);
  });

  test('should call internal logCustomEvent() with event name if properties is empty', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, { name: 'event-A' });
    expect(appboy.logCustomEvent).toHaveBeenCalledTimes(1);
    expect(appboy.logCustomEvent.mock.calls[0]).toEqual(['event-A']);
  });

  test('should stringify object and array properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, {
      name: 'event-A',
      properties,
    });
    expect(appboy.logCustomEvent).toHaveBeenCalledTimes(1);
    expect(appboy.logCustomEvent.mock.calls[0]).toEqual([
      'event-A',
      {
        n: null,
        i: 123,
        s: 'abc',
        l: true,
        list: '[1,2,3]',
        data: '{"a":"789","b":45.6}',
      },
    ]);
  });
});
