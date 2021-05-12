/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import AmplitudePlugin from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let amplitudeObject: any;

const loadAmplitude = jest.fn(() => {
  const instance = {
    init: jest.fn(),
    setUserId: jest.fn(),
    identify: jest.fn(),
    logEvent: jest.fn(),
    regenerateDeviceId: jest.fn(),
  };
  amplitudeObject = {
    getInstance: () => instance,
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(AmplitudePlugin.prototype, 'amplitude', 'get').mockImplementation(() => amplitudeObject);
  jest.spyOn(AmplitudePlugin.prototype, 'loadAmplitude').mockImplementation(loadAmplitude);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  amplitudeObject = undefined;
  jest.clearAllMocks();
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
    expect(amplitudeObject.getInstance().init).toHaveBeenCalledTimes(1);
  });

  test('should not load amplitude if it is already loaded', () => {
    const plugin = new AmplitudePlugin(apiKey);

    amplitudeObject = {};
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
    expect(amplitudeObject.getInstance().init).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal setUserId() if userId is defined', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1');
    expect(amplitudeObject.getInstance().setUserId).toHaveBeenCalledTimes(1);
    expect(amplitudeObject.getInstance().setUserId.mock.calls[0][0]).toBe('user-1');
    expect(amplitudeObject.getInstance().identify).toHaveBeenCalledTimes(0);
  });

  test('should not call internal setUserId() if userId is undefined', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined);
    expect(amplitudeObject.getInstance().setUserId).toHaveBeenCalledTimes(0);
    expect(amplitudeObject.getInstance().identify).toHaveBeenCalledTimes(0);
  });

  test('should call internal identify() with properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const amplitudeIdentify = {
      set: jest.fn(),
    };
    amplitudeObject.Identify = () => amplitudeIdentify;

    plugin.identify(undefined, { a: 123, b: 'abc' });
    expect(amplitudeObject.getInstance().setUserId).toHaveBeenCalledTimes(0);
    expect(amplitudeObject.getInstance().identify).toHaveBeenCalledTimes(1);
    expect(amplitudeIdentify.set).toHaveBeenCalledTimes(2);
    expect(amplitudeIdentify.set.mock.calls[0].slice(0, 2)).toEqual(['a', 123]);
    expect(amplitudeIdentify.set.mock.calls[1].slice(0, 2)).toEqual(['b', 'abc']);
  });
});

describe('track', () => {
  test('should call internal logEvent() with event name and properties', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, { name: 'event-A', properties: { a: 'abc', b: 123 } });
    expect(amplitudeObject.getInstance().logEvent).toHaveBeenCalledTimes(1);
    expect(amplitudeObject.getInstance().logEvent.mock.calls[0].slice(0, 2)).toEqual(['event-A', { a: 'abc', b: 123 }]);
  });
});

describe('reset', () => {
  test('should unset internal user id and regenerate device id', () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(amplitudeObject.getInstance().setUserId).toHaveBeenCalledTimes(1);
    expect(amplitudeObject.getInstance().setUserId.mock.calls[0][0]).toBe(null);
    expect(amplitudeObject.getInstance().regenerateDeviceId).toHaveBeenCalledTimes(1);
  });
});
