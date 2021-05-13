/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import BrazePlugin from '../index';

const apiKey = 'API-KEY';
const brazeOptions = { baseUrl: '' };
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('should return correct plugin id', () => {
  const plugin = new BrazePlugin(apiKey, brazeOptions);
  expect(plugin.id).toEqual('braze');
});

describe('load', () => {
  test('should not throw error', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);
  });

  test('multiple load should not throw error', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
  });
});

describe('identify', () => {
  test('should post request with properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    const postRequest = jest.fn();
    (plugin as any).postTrackerRequest = postRequest;

    plugin.identify('user-1', { a: 123, b: 'abc' });
    expect(postRequest).toHaveBeenCalledTimes(1);
    expect(postRequest.mock.calls[0][1]).toEqual({
      attributes: [
        {
          a: 123,
          b: 'abc',
          external_id: 'user-1',
        },
      ],
    });
  });

  test('should post request with stringified object and array properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    const postRequest = jest.fn();
    (plugin as any).postTrackerRequest = postRequest;

    plugin.identify('user-1', {
      data: { z: 12, y: 'test' },
      list: [1, 2, 3],
    });
    expect(postRequest).toHaveBeenCalledTimes(1);
    expect(postRequest.mock.calls[0][1]).toEqual({
      attributes: [
        {
          data: '{"z":12,"y":"test"}',
          external_id: 'user-1',
          list: '[1,2,3]',
        },
      ],
    });
  });
});

describe('track', () => {
  function removeTimeFromRequestEvents(requestBody: any) {
    return {
      ...requestBody,
      events: requestBody.events.map(({ time, ...e }: { time: any }) => e),
    };
  }

  test('should post request with event name and properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    const postRequest = jest.fn();
    (plugin as any).postTrackerRequest = postRequest;

    plugin.track('user-1', { name: 'event-A', properties: { a: 'abc', b: 123 } });
    expect(postRequest).toHaveBeenCalledTimes(1);

    const postBody = removeTimeFromRequestEvents(postRequest.mock.calls[0][1]);
    expect(postBody).toEqual({
      events: [
        {
          external_id: 'user-1',
          name: 'event-A',
          properties: {
            a: 'abc',
            b: 123,
          },
        },
      ],
    });
  });

  test('should post request with stringified object and array properties', () => {
    const plugin = new BrazePlugin(apiKey, brazeOptions);
    plugin.load(pluginLoadOptions);

    const postRequest = jest.fn();
    (plugin as any).postTrackerRequest = postRequest;

    plugin.track('user-1', {
      name: 'event-A',
      properties: {
        data: { z: 12, y: 'test' },
        list: [1, 2, 3],
      },
    });
    expect(postRequest).toHaveBeenCalledTimes(1);

    const postBody = removeTimeFromRequestEvents(postRequest.mock.calls[0][1]);
    expect(postBody).toEqual({
      events: [
        {
          external_id: 'user-1',
          name: 'event-A',
          properties: {
            data: '{"z":12,"y":"test"}',
            list: '[1,2,3]',
          },
        },
      ],
    });
  });
});
