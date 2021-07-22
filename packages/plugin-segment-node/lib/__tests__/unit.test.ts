/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import SegmentPlugin, { SegmentCallback } from '../index';

const writeKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

const segment = {
  alias: jest.fn(),
  identify: jest.fn(),
  group: jest.fn(),
  page: jest.fn(),
  track: jest.fn(),
  flush: jest.fn(),
};

const createSegment = jest.fn(() => segment);

beforeAll(() => {
  jest.spyOn<any, any>(SegmentPlugin.prototype, 'createSegment').mockImplementation(createSegment);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

const options = {
  integrations: {
    first: true,
    second: true,
  },
};

const properties = {
  n: null,
  i: 123,
  s: 'abc',
  l: true,
  list: [1, 2, 3],
  data: { a: '789', b: 45.6 },
};

test('should return correct plugin id', () => {
  const plugin = new SegmentPlugin(writeKey);
  expect(plugin.id).toEqual('segment');
});

describe('load', () => {
  test('should create internal Segment object', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);
    expect(createSegment).toHaveBeenCalledTimes(1);
  });
});

describe('alias', () => {
  test('should call internal alias()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2');
    expect(segment.alias).toHaveBeenCalledTimes(1);
    expect(segment.alias.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      previousId: 'user-2',
    });
  });

  test('should pass options to internal alias()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2', {
      options,
    });
    expect(segment.alias).toHaveBeenCalledTimes(1);
    expect(segment.alias.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      previousId: 'user-2',
      ...options,
    });
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.alias = jest.fn((payload: any, callback: SegmentCallback) => {
      callback(new Error('alias error'));
    });

    plugin.alias('user-1', 'user-2', {
      callback: (err) => {
        expect(err!.message).toEqual('alias error');
        done();
      },
    });
  });
});

describe('identify', () => {
  test('should call internal identify()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties);
    expect(segment.identify).toHaveBeenCalledTimes(1);
    expect(segment.identify.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      traits: properties,
    });
  });

  test('should pass options to internal identify()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties, {
      options,
    });
    expect(segment.identify).toHaveBeenCalledTimes(1);
    expect(segment.identify.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      traits: properties,
      ...options,
    });
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.identify = jest.fn((payload: any, callback: SegmentCallback) => {
      callback(new Error('identify error'));
    });

    plugin.identify('user-1', properties, {
      callback: (err) => {
        expect(err!.message).toEqual('identify error');
        done();
      },
    });
  });
});

describe('group', () => {
  test('should call internal group()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.group('user-1', 'group-1', properties);
    expect(segment.group).toHaveBeenCalledTimes(1);
    expect(segment.group.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      groupId: 'group-1',
      traits: properties,
    });
  });

  test('should pass options to internal group()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.group('user-1', 'group-1', properties, {
      options,
    });
    expect(segment.group).toHaveBeenCalledTimes(1);
    expect(segment.group.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      groupId: 'group-1',
      traits: properties,
      ...options,
    });
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.group = jest.fn((payload: any, callback: SegmentCallback) => {
      callback(new Error('group error'));
    });

    plugin.group('user-1', 'group-1', properties, {
      callback: (err) => {
        expect(err!.message).toEqual('group error');
        done();
      },
    });
  });
});

describe('page', () => {
  test('should call internal page()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', 'page B', properties);
    expect(segment.page).toHaveBeenCalledTimes(1);
    expect(segment.page.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      category: 'category A',
      name: 'page B',
      properties,
    });
  });

  test('should pass options to internal page()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', 'page B', properties, {
      options,
    });
    expect(segment.page).toHaveBeenCalledTimes(1);
    expect(segment.page.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      category: 'category A',
      name: 'page B',
      properties,
      ...options,
    });
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.page = jest.fn((payload: any, callback: SegmentCallback) => {
      callback(new Error('page error'));
    });

    plugin.page('user-1', 'category A', 'page B', properties, {
      callback: (err) => {
        expect(err!.message).toEqual('page error');
        done();
      },
    });
  });
});

describe('track', () => {
  const event = {
    name: 'event-A',
    properties,
  };

  test('should call internal track()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', event);
    expect(segment.track).toHaveBeenCalledTimes(1);
    expect(segment.track.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      event: 'event-A',
      properties: event.properties,
    });
  });

  test('should pass options to internal track()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', event, {
      options,
    });
    expect(segment.track).toHaveBeenCalledTimes(1);
    expect(segment.track.mock.calls[0][0]).toEqual({
      userId: 'user-1',
      event: 'event-A',
      properties: event.properties,
      ...options,
    });
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.track = jest.fn((payload: any, callback: SegmentCallback) => {
      callback(new Error('track error'));
    });

    plugin.track('user-1', { name: 'event-1' }, {
      callback: (err) => {
        expect(err!.message).toEqual('track error');
        done();
      },
    });
  });
});

describe('flush', () => {
  test('should call internal flush()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.flush();
    expect(segment.flush).toHaveBeenCalledTimes(1);
  });
});
