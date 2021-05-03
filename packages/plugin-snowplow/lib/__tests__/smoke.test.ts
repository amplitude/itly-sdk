/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import {
  ItlyBrowser as Itly, Loggers, Event, PluginLoadOptions,
} from '@itly/sdk';
import { SnowplowPlugin, SnowplowOptions } from '../index';

const userId = 'user-id';
const event: Event = { name: 'My Event' };
const loadOptions: PluginLoadOptions = { logger: Loggers.None, environment: 'development' };

function mockSnowplowInstance(plugin: SnowplowPlugin) {
  const snowplowMock = jest.fn();
  jest.spyOn(plugin, 'snowplow', 'get').mockImplementation(() => snowplowMock);
  return snowplowMock;
}

beforeEach(() => {
  jest.resetModules();
  // spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);
});

test('should post to all trackers by default', () => {
  const plugin = new SnowplowPlugin('vendor', {
    url: 'snowplow.iterative.ly',
  });

  const snowplowMock = mockSnowplowInstance(plugin);

  plugin.load(loadOptions);
  plugin.identify(userId);
  plugin.page(userId, 'category', 'page-name');
  plugin.track(userId, event);

  expect(snowplowMock.mock.calls[0][0]).toEqual('setUserId');
  expect(snowplowMock.mock.calls[1][0]).toEqual('trackPageView');
  expect(snowplowMock.mock.calls[2][0]).toEqual('trackSelfDescribingEvent');
});

test('should post to tracker specified in options', () => {
  const trackerName = 'itly';
  const plugin = new SnowplowPlugin('vendor', {
    url: 'snowplow.iterative.ly',
    trackerNameFilter: trackerName,
  });

  const snowplowMock = mockSnowplowInstance(plugin);

  plugin.load(loadOptions);
  plugin.identify(userId);
  plugin.page(userId, 'category', 'page-name');
  plugin.track(userId, event);

  expect(snowplowMock.mock.calls[0][0]).toEqual(`setUserId:${trackerName}`);
  expect(snowplowMock.mock.calls[1][0]).toEqual(`trackPageView:${trackerName}`);
  expect(snowplowMock.mock.calls[2][0]).toEqual(`trackSelfDescribingEvent:${trackerName}`);
});

test('should create new tracker if Snowplow is NOT already loaded', () => {
  const plugin = new SnowplowPlugin('vendor', {
    url: 'snowplow.iterative.ly',
  });

  const snowplowMock = jest.fn();
  jest.spyOn(plugin, 'snowplow', 'get')
    // First check for 'window.snowplow' returns undefined (aka Snowplow doesn't exist yet)
    .mockImplementationOnce(() => undefined)
    .mockImplementation(() => snowplowMock);

  plugin.load(loadOptions);

  expect(snowplowMock.mock.calls[0][0]).toEqual('newTracker');
});

test('should NOT create new tracker if Snowplow is already loaded', () => {
  const plugin = new SnowplowPlugin('vendor', {
    url: 'snowplow.iterative.ly',
  });

  const snowplowMock = jest.fn();
  jest.spyOn(plugin, 'snowplow', 'get')
    // First check for 'window.snowplow' returns a function (aka Snowplow is already loaded)
    .mockImplementationOnce(() => jest.fn())
    .mockImplementation(() => snowplowMock);

  plugin.load(loadOptions);

  expect(snowplowMock).not.toHaveBeenCalled();
});

test('should always create new tracker if forceNewTracker=true ', () => {
  const plugin = new SnowplowPlugin('vendor', {
    url: 'snowplow.iterative.ly',
    forceNewTracker: true,
  });

  const snowplowMock = jest.fn();
  jest.spyOn(plugin, 'snowplow', 'get')
    // First check for 'window.snowplow' returns a function (aka Snowplow is already loaded)
    .mockImplementationOnce(() => jest.fn())
    .mockImplementation(() => snowplowMock);

  plugin.load(loadOptions);

  expect(snowplowMock.mock.calls[0][0]).toEqual('newTracker');
});
