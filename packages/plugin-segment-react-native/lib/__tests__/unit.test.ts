const analytics = {
  setup: jest.fn(),
  alias: jest.fn(),
  identify: jest.fn(),
  group: jest.fn(),
  screen: jest.fn(),
  track: jest.fn(),
  reset: jest.fn(),
  flush: jest.fn(),
};

jest.mock('@segment/analytics-react-native', () => ({
  __esModule: true,
  default: analytics,
}));

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
/* eslint-disable import/first */
import { Loggers, PluginLoadOptions } from '@amplitude/sdk';
import SegmentPlugin from '../index';

const writeKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

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
  test('should setup internal Segment object', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);
    expect(analytics.setup).toHaveBeenCalledTimes(1);
  });
});

describe('alias', () => {
  test('should call internal alias()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2');
    expect(analytics.alias).toHaveBeenCalledTimes(1);
    expect(analytics.alias.mock.calls[0][0]).toEqual('user-1');
  });

  test('should pass options to internal alias()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.alias('user-1', 'user-2', {
      options,
    });
    expect(analytics.alias).toHaveBeenCalledTimes(1);
    expect(analytics.alias.mock.calls[0][1]).toEqual(options);
  });
});

describe('identify', () => {
  test('should call internal identify()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties);
    expect(analytics.identify).toHaveBeenCalledTimes(1);
    expect(analytics.identify.mock.calls[0].slice(0, 2)).toEqual(['user-1', properties]);
  });

  test('should pass options to internal identify()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.identify('user-1', properties, {
      options,
    });
    expect(analytics.identify).toHaveBeenCalledTimes(1);
    expect(analytics.identify.mock.calls[0]).toEqual(['user-1', properties, options]);
  });
});

describe('group', () => {
  test('should call internal group()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.group('user-1', 'group-1', properties);
    expect(analytics.group).toHaveBeenCalledTimes(1);
    expect(analytics.group.mock.calls[0].slice(0, 2)).toEqual(['group-1', properties]);
  });

  test('should pass options to internal group()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.group('user-1', 'group-1', properties, {
      options,
    });
    expect(analytics.group).toHaveBeenCalledTimes(1);
    expect(analytics.group.mock.calls[0]).toEqual(['group-1', properties, options]);
  });
});

describe('page', () => {
  test('should call internal page()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', 'page B', properties);
    expect(analytics.screen).toHaveBeenCalledTimes(1);
    expect(analytics.screen.mock.calls[0].slice(0, 2)).toEqual(['page B', properties]);
  });

  test('should pass "unspecified" as page name unless it is defined', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', undefined, properties);
    expect(analytics.screen).toHaveBeenCalledTimes(1);
    expect(analytics.screen.mock.calls[0].slice(0, 2)).toEqual(['unspecified', properties]);
  });

  test('should pass options to internal page()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', 'page B', properties, {
      options,
    });
    expect(analytics.screen).toHaveBeenCalledTimes(1);
    expect(analytics.screen.mock.calls[0]).toEqual(['page B', properties, options]);
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
    expect(analytics.track).toHaveBeenCalledTimes(1);
    expect(analytics.track.mock.calls[0].slice(0, 2)).toEqual(['event-A', event.properties]);
  });

  test('should pass options to internal track()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.track('user-1', event, {
      options,
    });
    expect(analytics.track).toHaveBeenCalledTimes(1);
    expect(analytics.track.mock.calls[0]).toEqual(['event-A', event.properties, options]);
  });
});

describe('reset', () => {
  test('should call internal reset()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.reset();
    expect(analytics.reset).toHaveBeenCalledTimes(1);
  });
});

describe('flush', () => {
  test('should call internal flush()', () => {
    const plugin = new SegmentPlugin(writeKey);
    plugin.load(pluginLoadOptions);

    plugin.flush();
    expect(analytics.flush).toHaveBeenCalledTimes(1);
  });
});
