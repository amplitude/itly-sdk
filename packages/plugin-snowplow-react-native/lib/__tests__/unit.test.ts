const Tracker = {
  initialize: jest.fn(() => Promise.resolve()),
  setSubjectData: jest.fn(),
  trackScreenViewEvent: jest.fn(),
  trackSelfDescribingEvent: jest.fn(),
};

jest.mock('@snowplow/react-native-tracker', () => ({
  __esModule: true,
  default: Tracker,
}));

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
/* eslint-disable import/first */
import { Loggers, PluginLoadOptions } from '@amplitude/sdk';
import SnowplowPlugin, { SnowplowOptions } from '../index';

const vendor = 'VENDOR';
const snowplowOptions: SnowplowOptions = {
  endpoint: 'ENDPOINT',
  namespace: 'NAMESPACE',
  appId: 'APP-ID',
};
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

const contexts = [
  { schema: 'schema-1', data: { 'key-1': 123, 'key-2': 'abc' } },
  { schema: 'schema-2', data: { 'key-1': true, 'key-2': 45.6 } },
];

const properties = {
  n: null,
  i: 123,
  s: 'abc',
  l: true,
  list: [1, 2, 3],
  data: { a: '789', b: 45.6 },
};

test('should return correct plugin id', () => {
  const plugin = new SnowplowPlugin(vendor, snowplowOptions);
  expect(plugin.id).toEqual('snowplow');
});

describe('load', () => {
  test('should initialize internal Tracker object', () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);
    expect(Tracker.initialize).toHaveBeenCalledTimes(1);
  });
});

describe('identify', () => {
  test('should call internal setSubjectData()', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.identify('user-1', properties);
    expect(Tracker.setSubjectData).toHaveBeenCalledTimes(1);
    expect(Tracker.setSubjectData.mock.calls[0]).toEqual([{ userId: 'user-1' }]);
  });
});

describe('page', () => {
  test('should call internal page()', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.page('user-1', 'category A', 'page B', properties);
    expect(Tracker.trackScreenViewEvent).toHaveBeenCalledTimes(1);
    expect(Tracker.trackScreenViewEvent.mock.calls[0][0]).toEqual({
      screenName: 'page B',
      screenType: 'category A',
    });
  });

  test('should pass options to internal trackScreenViewEvent()', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.page('user-1', 'category A', 'page B', properties, { contexts });
    expect(Tracker.trackScreenViewEvent).toHaveBeenCalledTimes(1);
    expect(Tracker.trackScreenViewEvent.mock.calls[0]).toEqual([{
      screenName: 'page B',
      screenType: 'category A',
    }, contexts]);
  });
});

describe('track', () => {
  const event = {
    name: 'event-A',
    properties,
  };

  test('should call internal trackSelfDescribingEvent()', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.track('user-1', event);
    expect(Tracker.trackSelfDescribingEvent).toHaveBeenCalledTimes(1);
    expect(Tracker.trackSelfDescribingEvent.mock.calls[0][0]).toEqual({
      schema: 'iglu:VENDOR/event-A/jsonschema/undefined',
      data: properties,
    });
  });

  test('should call internal trackSelfDescribingEvent() with version', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.track('user-1', { ...event, version: '1.2.3.4' });
    expect(Tracker.trackSelfDescribingEvent).toHaveBeenCalledTimes(1);
    expect(Tracker.trackSelfDescribingEvent.mock.calls[0][0]).toEqual({
      schema: 'iglu:VENDOR/event-A/jsonschema/1-2-3-4',
      data: properties,
    });
  });

  test('should pass options to internal trackSelfDescribingEvent()', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.track('user-1', event, { contexts });
    expect(Tracker.trackSelfDescribingEvent).toHaveBeenCalledTimes(1);
    expect(Tracker.trackSelfDescribingEvent.mock.calls[0]).toEqual([{
      schema: 'iglu:VENDOR/event-A/jsonschema/undefined',
      data: properties,
    }, contexts]);
  });
});

describe('reset', () => {
  test('should clear internal subject data', async () => {
    const plugin = new SnowplowPlugin(vendor, snowplowOptions);
    plugin.load(pluginLoadOptions);

    await plugin.reset();
    expect(Tracker.setSubjectData).toHaveBeenCalledTimes(1);
    expect(Tracker.setSubjectData.mock.calls[0]).toEqual([{ userId: null }]);
  });
});
