/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@amplitude/sdk';
import MixpanelPlugin, { MixpanelCallback } from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

const mixpanel = {
  alias: jest.fn(),
  people: {
    set: jest.fn(),
  },
  track: jest.fn(),
};

const createMixpanel = jest.fn(() => mixpanel);

beforeAll(() => {
  jest.spyOn<any, any>(MixpanelPlugin.prototype, 'createMixpanel').mockImplementation(createMixpanel);
});

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
  const plugin = new MixpanelPlugin('API-KEY');
  expect(plugin.id).toEqual('mixpanel');
});

describe('load', () => {
  test('should create internal Mixpanel object', () => {
    const plugin = new MixpanelPlugin(apiKey);

    plugin.load(pluginLoadOptions);
    expect(createMixpanel).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal people.set() with user id and properties', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const userId = 'user-1';
    plugin.identify(userId, properties);

    expect(mixpanel.people.set).toHaveBeenCalledTimes(1);
    expect(mixpanel.people.set.mock.calls[0].slice(0, 2)).toEqual([
      userId,
      { distinct_id: userId, ...properties },
    ]);
  });

  test('should call callback', (done) => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    mixpanel.people.set = jest.fn((userId: any, identifyProperties: any, callback: MixpanelCallback) => {
      callback(new Error('identify error'));
    });

    plugin.identify('user-1', properties, {
      callback: (err) => {
        expect(err!.message).toEqual('identify error');
        done();
      },
    });
  });
});

describe('alias', () => {
  test('should call internal alias()', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2');

    expect(mixpanel.alias).toHaveBeenCalledTimes(1);
    expect(mixpanel.alias.mock.calls[0].slice(0, 2)).toEqual(['user-2', 'user-1']);
  });

  test('should call callback', (done) => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    mixpanel.alias = jest.fn((previousId: any, userId: any, callback: MixpanelCallback) => {
      callback(new Error('alias error'));
    });

    plugin.alias('user-1', 'user-2', {
      callback: (err) => {
        expect(err!.message).toEqual('alias error');
        done();
      },
    });
  });
});

describe('track', () => {
  test('should call internal track() with user id, event name and properties', () => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const userId = 'user-1';
    const event = {
      name: 'event-A',
      properties,
    };
    plugin.track(userId, event);
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
    expect(mixpanel.track.mock.calls[0].slice(0, 2)).toEqual([
      event.name,
      { distinct_id: userId, ...event.properties },
    ]);
  });

  test('should call callback', (done) => {
    const plugin = new MixpanelPlugin(apiKey);
    plugin.load(pluginLoadOptions);

    mixpanel.track = jest.fn((name: any, trackProperties: any, callback: MixpanelCallback) => {
      callback(new Error('track error'));
    });

    plugin.track('user-2', { name: 'event-A', properties }, {
      callback: (err) => {
        expect(err!.message).toEqual('track error');
        done();
      },
    });
  });
});
