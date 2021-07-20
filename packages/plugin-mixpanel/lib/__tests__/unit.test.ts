/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@amplitude/sdk';
import MixpanelPlugin, { MixpanelCallback } from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let mixpanel: any;

const loadMixpanel = jest.fn(() => {
  mixpanel = {
    init: jest.fn(),
    alias: jest.fn(),
    identify: jest.fn(),
    people: {
      set: jest.fn(),
    },
    track: jest.fn(),
    reset: jest.fn(),
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(MixpanelPlugin.prototype, 'mixpanel', 'get').mockImplementation(() => mixpanel);
  jest.spyOn(MixpanelPlugin.prototype, 'loadMixpanel').mockImplementation(loadMixpanel);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  mixpanel = undefined;
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
  const plugin = new MixpanelPlugin(apiKey);
  expect(plugin.id).toEqual('mixpanel');
});

describe('load', () => {
  test('should load mixpanel if it is not already loaded', () => {
    const plugin = new MixpanelPlugin(apiKey);

    expect(plugin.mixpanel).toBeUndefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.mixpanel).toBeDefined();
    expect(loadMixpanel).toHaveBeenCalledTimes(1);
    expect(mixpanel.init).toHaveBeenCalledTimes(1);
  });

  test('should not load mixpanel if it is already loaded', () => {
    const plugin = new MixpanelPlugin(apiKey);

    mixpanel = {};
    expect(plugin.mixpanel).toBeDefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.mixpanel).toBeDefined();
    expect(loadMixpanel).toHaveBeenCalledTimes(0);
  });

  test('should load mixpanel once', () => {
    const plugin = new MixpanelPlugin(apiKey);

    expect(plugin.mixpanel).toBeUndefined();
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    expect(plugin.mixpanel).toBeDefined();
    expect(loadMixpanel).toHaveBeenCalledTimes(1);
    expect(mixpanel.init).toHaveBeenCalledTimes(1);
  });
});

describe('alias', () => {
  test('should call internal alias()', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2');
    expect(mixpanel.alias).toHaveBeenCalledTimes(1);
    expect(mixpanel.alias.mock.calls[0]).toEqual(['user-1', 'user-2']);
  });
});

describe('identify', () => {
  test('should call internal identify() if userId is defined', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', undefined);
    expect(mixpanel.identify).toHaveBeenCalledTimes(1);
    expect(mixpanel.identify.mock.calls[0][0]).toBe('user-1');
  });

  test('should not call internal identify() if userId is undefined', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, undefined);
    expect(mixpanel.identify).toHaveBeenCalledTimes(0);
  });

  test('should call internal people.set() with properties', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, properties);
    expect(mixpanel.people.set).toHaveBeenCalledTimes(1);
    expect(mixpanel.people.set.mock.calls[0].slice(0, 1)).toEqual([properties]);
  });

  test('should call callback', (done) => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    mixpanel.people.set = (identifyProperties: any, callback: MixpanelCallback) => {
      callback(1, 'abc', true);
    };

    plugin.identify('user-1', properties, {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('track', () => {
  test('should call internal track()', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const event = {
      name: 'event-A',
      properties,
    };
    plugin.track('user-1', event);
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
    expect(mixpanel.track.mock.calls[0].slice(0, 2)).toEqual([event.name, event.properties]);
  });

  test('should call callback', (done) => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    mixpanel.track = (name: any, trackProperties: any, callback: MixpanelCallback) => {
      callback(1, 'abc', true);
    };

    plugin.track('user-1', { name: 'event-1' }, {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('reset', () => {
  test('should call internal reset()', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(mixpanel.reset).toHaveBeenCalledTimes(1);
  });
});
