/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import SegmentPlugin, { SegmentCallback } from '../index';

const writeKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let segment: any;

const loadSegment = jest.fn(() => {
  segment = {
    load: jest.fn(),
    alias: jest.fn(),
    identify: jest.fn(),
    group: jest.fn(),
    page: jest.fn(),
    track: jest.fn(),
    reset: jest.fn(),
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(SegmentPlugin.prototype, 'segment', 'get').mockImplementation(() => segment);
  jest.spyOn(SegmentPlugin.prototype, 'loadSegment').mockImplementation(loadSegment);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  segment = undefined;
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
  test('should load segment if it is not already loaded', () => {
    const plugin = new SegmentPlugin(writeKey);

    expect(plugin.segment).toBeUndefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.segment).toBeDefined();
    expect(loadSegment).toHaveBeenCalledTimes(1);
    expect(segment.load).toHaveBeenCalledTimes(1);
  });

  test('should not load segment if it is already loaded', () => {
    const plugin = new SegmentPlugin(writeKey);

    segment = {};
    expect(plugin.segment).toBeDefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.segment).toBeDefined();
    expect(loadSegment).toHaveBeenCalledTimes(0);
  });

  test('should load segment once', () => {
    const plugin = new SegmentPlugin(writeKey);

    expect(plugin.segment).toBeUndefined();
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    expect(plugin.segment).toBeDefined();
    expect(loadSegment).toHaveBeenCalledTimes(1);
    expect(segment.load).toHaveBeenCalledTimes(1);
  });
});

describe('alias', () => {
  test('should call internal alias()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2');
    expect(segment.alias).toHaveBeenCalledTimes(1);
    expect(segment.alias.mock.calls[0].slice(0, 2)).toEqual(['user-1', 'user-2']);
  });

  test('should pass options to internal alias()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2', {
      options,
    });
    expect(segment.alias).toHaveBeenCalledTimes(1);
    expect(segment.alias.mock.calls[0][2]).toEqual(options);
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.alias = (userId: any, previousId: any, segmentOptions: any, callback: SegmentCallback) => {
      callback(1, 'abc', true);
    };

    plugin.alias('user-1', 'user-2', {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('identify', () => {
  test('should call internal identify() with userId and properties if userId is defined', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties);
    expect(segment.identify).toHaveBeenCalledTimes(1);
    expect(segment.identify.mock.calls[0].slice(0, 2)).toEqual(['user-1', properties]);
  });

  test('should call internal identify() with properties if userId is not defined', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify(undefined, properties);
    expect(segment.identify).toHaveBeenCalledTimes(1);
    expect(segment.identify.mock.calls[0][0]).toEqual(properties);
  });

  test('should pass options to internal identify()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties, {
      options,
    });
    expect(segment.identify).toHaveBeenCalledTimes(1);
    expect(segment.identify.mock.calls[0][2]).toEqual(options);
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.identify = (userId: any, identifyProperties: any, segmentOptions: any, callback: SegmentCallback) => {
      callback(1, 'abc', true);
    };

    plugin.identify('user-1', properties, {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('group', () => {
  test('should call internal group()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.group(undefined, 'group-1', properties);
    expect(segment.group).toHaveBeenCalledTimes(1);
    expect(segment.group.mock.calls[0].slice(0, 2)).toEqual(['group-1', properties]);
  });

  test('should pass options to internal group()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.group(undefined, 'group-1', properties, {
      options,
    });
    expect(segment.group).toHaveBeenCalledTimes(1);
    expect(segment.group.mock.calls[0][2]).toEqual(options);
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.group = (groupId: any, groupProperties: any, segmentOptions: any, callback: SegmentCallback) => {
      callback(1, 'abc', true);
    };

    plugin.group(undefined, 'group-1', properties, {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('page', () => {
  test('should call internal page()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page(undefined, 'category A', 'page B', properties);
    expect(segment.page).toHaveBeenCalledTimes(1);
    expect(segment.page.mock.calls[0].slice(0, 3)).toEqual(['category A', 'page B', properties]);
  });

  test('should pass options to internal page()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page(undefined, 'category A', 'page B', properties, {
      options,
    });
    expect(segment.page).toHaveBeenCalledTimes(1);
    expect(segment.page.mock.calls[0][3]).toEqual(options);
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.page = (category: any, page: any, pageProperties: any, segmentOptions: any, callback: SegmentCallback) => {
      callback(1, 'abc', true);
    };

    plugin.page(undefined, 'category A', 'page B', properties, {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('track', () => {
  test('should call internal track()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    const event = {
      name: 'event-A',
      properties,
    };
    plugin.track('user-1', event);
    expect(segment.track).toHaveBeenCalledTimes(1);
    expect(segment.track.mock.calls[0].slice(0, 2)).toEqual([event.name, event.properties]);
  });

  test('should pass options to internal track()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.track(undefined, { name: 'event-1' }, {
      options,
    });
    expect(segment.track).toHaveBeenCalledTimes(1);
    expect(segment.track.mock.calls[0][2]).toEqual(options);
  });

  test('should call callback', (done) => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    segment.track = (name: any, trackProperties: any, segmentOptions: any, callback: SegmentCallback) => {
      callback(1, 'abc', true);
    };

    plugin.track('user-1', { name: 'event-1' }, {
      callback: (...args: any) => {
        expect(args).toEqual([1, 'abc', true]);
        done();
      },
    });
  });
});

describe('reset', () => {
  test('should call internal reset()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(segment.reset).toHaveBeenCalledTimes(1);
  });
});
