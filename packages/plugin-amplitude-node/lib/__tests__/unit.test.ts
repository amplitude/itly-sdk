/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import AmplitudePlugin from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

const amplitude = {
  identify: jest.fn(),
  track: jest.fn(),
};

const createAmplitude = jest.fn(() => amplitude);

beforeAll(() => {
  jest.spyOn<any, any>(AmplitudePlugin.prototype, 'createAmplitude').mockImplementation(createAmplitude);
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
  const plugin = new AmplitudePlugin('API-KEY');
  expect(plugin.id).toEqual('amplitude');
});

describe('load', () => {
  test('should create internal Amplitude object', () => {
    const plugin = new AmplitudePlugin(apiKey);

    plugin.load(pluginLoadOptions);
    expect(createAmplitude).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal identify() with user id and properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties);
    expect(amplitude.identify).toHaveBeenCalledTimes(1);
    expect(amplitude.identify.mock.calls[0][0]).toEqual({
      user_id: 'user-1',
      user_properties: properties,
    });
  });

  test('should call callback', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const callback = jest.fn();
    await plugin.identify('user-1', properties, {
      callback,
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('track', () => {
  test('should call internal track() with user id, event name and properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-2', { name: 'event-A', properties });
    expect(amplitude.track).toHaveBeenCalledTimes(1);
    expect(amplitude.track.mock.calls[0][0]).toEqual({
      event_properties: properties,
      event_type: 'event-A',
      user_id: 'user-2',
    });
  });

  test('should call callback', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const callback = jest.fn();
    await plugin.track('user-2', { name: 'event-A', properties }, {
      callback,
    });
    expect(amplitude.track).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
