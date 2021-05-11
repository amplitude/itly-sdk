/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import AmplitudePlugin from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

const amplitudeIdentify = jest.fn();
const amplitudeTrack = jest.fn();

const createAmplitude = jest.fn(() => ({
  identify: amplitudeIdentify,
  track: amplitudeTrack,
}));

beforeAll(() => {
  jest.spyOn<any, any>(AmplitudePlugin.prototype, 'createAmplitude').mockImplementation(createAmplitude);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  amplitudeIdentify.mockClear();
  amplitudeTrack.mockClear();

  createAmplitude.mockClear();
});

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

    plugin.identify('user-1', { a: 123, b: 'abc' });
    expect(amplitudeIdentify).toHaveBeenCalledTimes(1);
    expect(amplitudeIdentify.mock.calls[0][0]).toEqual({
      user_id: 'user-1',
      user_properties: { a: 123, b: 'abc' },
    });
  });

  test('should call callback', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const callback = jest.fn();
    await plugin.identify('user-1', { a: 123, b: 'abc' }, {
      callback,
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('track', () => {
  test('should call internal track() with user id, event name and properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-2', { name: 'event-A', properties: { a: 'abc', b: 123 } });
    expect(amplitudeTrack).toHaveBeenCalledTimes(1);
    expect(amplitudeTrack.mock.calls[0][0]).toEqual({
      event_properties: { a: 'abc', b: 123 },
      event_type: 'event-A',
      user_id: 'user-2',
    });
  });

  test('should call callback', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const callback = jest.fn();
    await plugin.track('user-2', { name: 'event-A', properties: { a: 'abc', b: 123 } }, {
      callback,
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
