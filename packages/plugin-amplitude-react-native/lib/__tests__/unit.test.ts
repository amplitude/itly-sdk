jest.mock('@amplitude/react-native', () => ({
  __esModule: true,
}));

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
/* eslint-disable import/first */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import AmplitudePlugin from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let amplitude: any;

const createAmplitude = jest.fn(() => {
  amplitude = {
    init: jest.fn(() => Promise.resolve()),
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
    logEvent: jest.fn(),
    regenerateDeviceId: jest.fn(),
    uploadEvents: jest.fn(),
  };
  return amplitude;
});

beforeAll(() => {
  jest.spyOn(AmplitudePlugin.prototype, 'createAmplitude').mockImplementation(createAmplitude);
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
  const plugin = new AmplitudePlugin(apiKey);
  expect(plugin.id).toEqual('amplitude');
});

describe('load', () => {
  test('should init amplitude', () => {
    const plugin = new AmplitudePlugin(apiKey);

    plugin.load(pluginLoadOptions);
    expect(createAmplitude).toHaveBeenCalledTimes(1);
    expect(amplitude.init).toHaveBeenCalledTimes(1);
    expect(amplitude.init.mock.calls[0][0]).toBe(apiKey);
  });
});

describe('identify', () => {
  test('should call internal setUserId() if userId is defined', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.identify('user-1');
    expect(amplitude.setUserId).toHaveBeenCalledTimes(1);
    expect(amplitude.setUserId.mock.calls[0][0]).toBe('user-1');
    expect(amplitude.setUserProperties).toHaveBeenCalledTimes(0);
  });

  test('should not call internal setUserId() if userId is undefined', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.identify(undefined);
    expect(amplitude.setUserId).toHaveBeenCalledTimes(0);
    expect(amplitude.setUserProperties).toHaveBeenCalledTimes(0);
  });

  test('should call internal setUserProperties() with properties', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.identify(undefined, properties);
    expect(amplitude.setUserProperties).toHaveBeenCalledTimes(1);
    expect(amplitude.setUserProperties.mock.calls[0][0]).toEqual(properties);
  });

  test('should call callback', (done) => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, properties, {
      callback: () => {
        done();
      },
    });
  });
});

describe('track', () => {
  const event = { name: 'event-A', properties };

  test('should call internal logEvent() with event name and properties', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.track('user-1', event);
    expect(amplitude.logEvent).toHaveBeenCalledTimes(1);
    expect(amplitude.logEvent.mock.calls[0].slice(0, 2)).toEqual(['event-A', properties]);
  });

  test('should call callback', (done) => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', event, {
      callback: () => {
        done();
      },
    });
  });
});

describe('reset', () => {
  test('should unset internal user id and regenerate device id', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.reset();
    expect(amplitude.setUserId).toHaveBeenCalledTimes(1);
    expect(amplitude.setUserId.mock.calls[0][0]).toBe(null);
    expect(amplitude.regenerateDeviceId).toHaveBeenCalledTimes(1);
  });
});

describe('flush', () => {
  test('should call internal uploadEvents()', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.flush();
    expect(amplitude.uploadEvents).toHaveBeenCalledTimes(1);
  });
});
