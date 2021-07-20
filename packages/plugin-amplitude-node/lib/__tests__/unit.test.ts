const identifyObject: any = {
  set: jest.fn(),
};

jest.mock('@amplitude/identify', () => ({
  Identify: () => identifyObject,
}));

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
/* eslint-disable import/first */
import { Loggers, PluginLoadOptions } from '@amplitude/sdk';
import AmplitudePlugin from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

const amplitude = {
  identify: jest.fn(),
  logEvent: jest.fn(),
  flush: jest.fn(),
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

    expect(identifyObject.set).toHaveBeenCalledTimes(Object.entries(properties).length);
    expect(identifyObject.set.mock.calls[0]).toEqual(['n', null]);
    expect(identifyObject.set.mock.calls[1]).toEqual(['i', 123]);
    expect(identifyObject.set.mock.calls[2]).toEqual(['s', 'abc']);
    expect(identifyObject.set.mock.calls[3]).toEqual(['l', true]);
    expect(identifyObject.set.mock.calls[4]).toEqual(['list', [1, 2, 3]]);
    expect(identifyObject.set.mock.calls[5]).toEqual(['data', { a: '789', b: 45.6 }]);

    expect(amplitude.identify).toHaveBeenCalledTimes(1);
    expect(amplitude.identify.mock.calls[0]).toEqual(['user-1', '', identifyObject]);
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
    expect(amplitude.logEvent).toHaveBeenCalledTimes(1);
    expect(amplitude.logEvent.mock.calls[0][0]).toEqual({
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
    expect(amplitude.logEvent).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('flush', () => {
  test('should call internal flush()', async () => {
    const plugin = new AmplitudePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    await plugin.flush();
    expect(amplitude.flush).toHaveBeenCalledTimes(1);
  });
});
