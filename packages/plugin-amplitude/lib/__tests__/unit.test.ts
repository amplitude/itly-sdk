/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import AmplitudePlugin, { AmplitudeCallback } from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let amplitude: any;

const loadAmplitude = jest.fn(() => {
  const instance = {
    init: jest.fn(),
    setUserId: jest.fn(),
    setGroup: jest.fn(),
    identify: jest.fn(),
    logEvent: jest.fn(),
    regenerateDeviceId: jest.fn(),
  };
  amplitude = {
    getInstance: () => instance,
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(AmplitudePlugin.prototype, 'amplitude', 'get').mockImplementation(() => amplitude);
  jest.spyOn(AmplitudePlugin.prototype, 'loadAmplitude').mockImplementation(loadAmplitude);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  amplitude = undefined;
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
  const plugin = new AmplitudePlugin(apiKey);
  expect(plugin.id).toEqual('amplitude');
});

describe('load', () => {
  test('should load amplitude if it is not already loaded', () => {
    const plugin = new AmplitudePlugin(apiKey);

    expect(plugin.amplitude).toBeUndefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.amplitude).toBeDefined();
    expect(loadAmplitude).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().init).toHaveBeenCalledTimes(1);
  });

  test('should not load amplitude if it is already loaded', () => {
    const plugin = new AmplitudePlugin(apiKey);

    amplitude = {};
    expect(plugin.amplitude).toBeDefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.amplitude).toBeDefined();
    expect(loadAmplitude).toHaveBeenCalledTimes(0);
  });

  test('should load amplitude once', () => {
    const plugin = new AmplitudePlugin(apiKey);

    expect(plugin.amplitude).toBeUndefined();
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    expect(plugin.amplitude).toBeDefined();
    expect(loadAmplitude).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().init).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal setUserId() if userId is defined', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1');
    expect(amplitude.getInstance().setUserId).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().setUserId.mock.calls[0][0]).toBe('user-1');
    expect(amplitude.getInstance().identify).toHaveBeenCalledTimes(0);
  });

  test('should not call internal setUserId() if userId is undefined', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined);
    expect(amplitude.getInstance().setUserId).toHaveBeenCalledTimes(0);
    expect(amplitude.getInstance().identify).toHaveBeenCalledTimes(0);
  });

  test('should call internal identify() with properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const amplitudeIdentify = {
      set: jest.fn(),
    };
    amplitude.Identify = () => amplitudeIdentify;

    plugin.identify(undefined, properties);
    expect(amplitude.getInstance().identify).toHaveBeenCalledTimes(1);
    expect(amplitudeIdentify.set).toHaveBeenCalledTimes(6);
    expect(amplitudeIdentify.set.mock.calls[0]).toEqual(['n', null]);
    expect(amplitudeIdentify.set.mock.calls[1]).toEqual(['i', 123]);
    expect(amplitudeIdentify.set.mock.calls[2]).toEqual(['s', 'abc']);
    expect(amplitudeIdentify.set.mock.calls[3]).toEqual(['l', true]);
    expect(amplitudeIdentify.set.mock.calls[4]).toEqual(['list', [1, 2, 3]]);
    expect(amplitudeIdentify.set.mock.calls[5]).toEqual(['data', { a: '789', b: 45.6 }]);
  });

  test('should call callback', (done) => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const amplitudeIdentify = {
      set: jest.fn(),
    };
    amplitude.Identify = () => amplitudeIdentify;
    amplitude.getInstance().identify = (identifyProperties: any, callback: AmplitudeCallback) => {
      callback(211, 'identify response', 'identify details');
    };

    plugin.identify(undefined, properties, {
      callback: (statusCode: number, responseBody: string, details: unknown) => {
        expect(statusCode).toBe(211);
        expect(responseBody).toBe('identify response');
        expect(details).toBe('identify details');
        done();
      },
    });
  });
});

describe('group', () => {
  test('should call setGroup() with groupType and groupId', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);
    const groupProperties = {
      groupType: 'orgId',
    };
    const groupId = '15';

    plugin.group(undefined, groupId, groupProperties);
    expect(amplitude.getInstance().setGroup).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().setGroup.mock.calls[0]).toEqual(['orgId', '15']);
  });

  test('should call setGroup() with groupName defiend in groupProperties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);
    const groupProperties = {
      groupType: 'sport',
      groupName: ['soccer', 'tennis'],
    };
    const groupId = '15';

    plugin.group(undefined, groupId, groupProperties);
    expect(amplitude.getInstance().setGroup).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().setGroup.mock.calls[0]).toEqual(['sport', ['soccer', 'tennis']]);
  });

  test('should not call setGroup() if group type not set', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);
    const groupProperties = {};
    const groupId = '15';

    plugin.group(undefined, groupId, groupProperties);
    expect(amplitude.getInstance().setGroup).toHaveBeenCalledTimes(0);
  });
});

describe('track', () => {
  const event = { name: 'event-A', properties };

  test('should call internal logEvent() with event name and properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', event);
    expect(amplitude.getInstance().logEvent).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().logEvent.mock.calls[0].slice(0, 2)).toEqual(['event-A', properties]);
  });

  test('should call callback', (done) => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    amplitude.getInstance().logEvent = (name: any, trackProperties: any, callback: AmplitudeCallback) => {
      callback(322, 'track response', 'track details');
    };

    plugin.track('user-1', event, {
      callback: (statusCode: number, responseBody: string, details: unknown) => {
        expect(statusCode).toBe(322);
        expect(responseBody).toBe('track response');
        expect(details).toBe('track details');
        done();
      },
    });
  });
});

describe('reset', () => {
  test('should unset internal user id and regenerate device id', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(amplitude.getInstance().setUserId).toHaveBeenCalledTimes(1);
    expect(amplitude.getInstance().setUserId.mock.calls[0][0]).toBe(null);
    expect(amplitude.getInstance().regenerateDeviceId).toHaveBeenCalledTimes(1);
  });
});
