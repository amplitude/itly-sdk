/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import AmplitudePlugin from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

const amplitudeInit = jest.fn();
const amplitudeSetUserId = jest.fn();
const amplitudeIdentify = jest.fn();
const amplitudeIdentifySet = jest.fn();
const amplitudeLogEvent = jest.fn();
const amplitudeRegenerateDeviceId = jest.fn();

let amplitudeInstance: any;
const loadAmplitude = jest.fn(() => {
  amplitudeInstance = {
    getInstance: jest.fn(() => ({
      init: amplitudeInit,
      setUserId: amplitudeSetUserId,
      identify: amplitudeIdentify,
      logEvent: amplitudeLogEvent,
      regenerateDeviceId: amplitudeRegenerateDeviceId,
    })),
    Identify: jest.fn(() => ({
      set: amplitudeIdentifySet,
    })),
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(AmplitudePlugin.prototype, 'amplitude', 'get').mockImplementation(() => amplitudeInstance);
  jest.spyOn(AmplitudePlugin.prototype, 'loadAmplitude').mockImplementation(loadAmplitude);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  amplitudeInstance = undefined;

  amplitudeInit.mockClear();
  amplitudeSetUserId.mockClear();
  amplitudeIdentify.mockClear();
  amplitudeIdentifySet.mockClear();
  amplitudeLogEvent.mockClear();
  amplitudeRegenerateDeviceId.mockClear();

  loadAmplitude.mockClear();
});

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
    expect(amplitudeInit).toHaveBeenCalledTimes(1);
  });

  test('should not load amplitude if it is already loaded', () => {
    const plugin = new AmplitudePlugin(apiKey);

    amplitudeInstance = {};
    expect(plugin.amplitude).toBeDefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.amplitude).toBeDefined();
    expect(loadAmplitude).toHaveBeenCalledTimes(0);
    expect(amplitudeInit).toHaveBeenCalledTimes(0);
  });

  test('should load amplitude once', () => {
    const plugin = new AmplitudePlugin(apiKey);

    expect(plugin.amplitude).toBeUndefined();
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    expect(plugin.amplitude).toBeDefined();
    expect(loadAmplitude).toHaveBeenCalledTimes(1);
    expect(amplitudeInit).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal setUserId() if userId is defined', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1');
    expect(amplitudeSetUserId).toHaveBeenCalledTimes(1);
    expect(amplitudeSetUserId.mock.calls[0][0]).toBe('user-1');
    expect(amplitudeIdentify).toHaveBeenCalledTimes(0);
  });

  test('should not call internal setUserId() if userId is undefined', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined);
    expect(amplitudeSetUserId).toHaveBeenCalledTimes(0);
    expect(amplitudeIdentify).toHaveBeenCalledTimes(0);
  });

  test('should call internal identify() with properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, { a: 123, b: 'abc' });
    expect(amplitudeSetUserId).toHaveBeenCalledTimes(0);
    expect(amplitudeIdentify).toHaveBeenCalledTimes(1);
    expect(amplitudeIdentifySet).toHaveBeenCalledTimes(2);
    expect(amplitudeIdentifySet.mock.calls[0].slice(0, 2)).toEqual(['a', 123]);
    expect(amplitudeIdentifySet.mock.calls[1].slice(0, 2)).toEqual(['b', 'abc']);
  });
});

describe('track', () => {
  test('should call internal logEvent() with event name and properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, { name: 'event-A', properties: { a: 'abc', b: 123 } });
    expect(amplitudeLogEvent).toHaveBeenCalledTimes(1);
    expect(amplitudeLogEvent.mock.calls[0].slice(0, 2)).toEqual(['event-A', { a: 'abc', b: 123 }]);
  });
});

describe('reset', () => {
  test('should unset internal user id and regenerate device id', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(amplitudeSetUserId).toHaveBeenCalledTimes(1);
    expect(amplitudeSetUserId.mock.calls[0][0]).toBe(null);
    expect(amplitudeRegenerateDeviceId).toHaveBeenCalledTimes(1);
  });
});
