/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { Loggers, PluginLoadOptions } from '@itly/sdk';
import MparticlePlugin, { MparticleLogger } from '../index';

const apiKey = 'API-KEY';
const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

let mparticle: any;

const loadMparticle = jest.fn(() => {
  mparticle = {
    logPageView: jest.fn(),
    logEvent: jest.fn(),
    EventType: {
      Other: 7,
    },
  };
});

beforeAll(() => {
  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);

  jest.spyOn(MparticlePlugin.prototype, 'mparticle', 'get').mockImplementation(() => mparticle);
  jest.spyOn(MparticlePlugin.prototype, 'loadMparticle').mockImplementation(loadMparticle);
});

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  mparticle = undefined;
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
  const plugin = new MparticlePlugin(apiKey);
  expect(plugin.id).toEqual('mparticle');
});

describe('load', () => {
  test('should load mparticle if it is not already loaded', () => {
    const plugin = new MparticlePlugin(apiKey);

    expect(plugin.mparticle).toBeUndefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.mparticle).toBeDefined();
    expect(loadMparticle).toHaveBeenCalledTimes(1);
  });

  test('should not load mparticle if it is already loaded', () => {
    const plugin = new MparticlePlugin(apiKey);

    mparticle = {};
    expect(plugin.mparticle).toBeDefined();
    plugin.load(pluginLoadOptions);
    expect(plugin.mparticle).toBeDefined();
    expect(loadMparticle).toHaveBeenCalledTimes(0);
  });

  test('should load mparticle once', () => {
    const plugin = new MparticlePlugin(apiKey);

    expect(plugin.mparticle).toBeUndefined();
    plugin.load(pluginLoadOptions);
    plugin.load(pluginLoadOptions);
    expect(plugin.mparticle).toBeDefined();
    expect(loadMparticle).toHaveBeenCalledTimes(1);
  });
});

describe('page', () => {
  test('should call internal logPageView()', () => {
    const plugin = new MparticlePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', 'page B', properties);
    expect(mparticle.logPageView).toHaveBeenCalledTimes(1);
    expect(mparticle.logPageView.mock.calls[0]).toEqual(['page B', properties]);
  });
});

describe('track', () => {
  test('should call internal track()', () => {
    const plugin = new MparticlePlugin(apiKey);
    plugin.load(pluginLoadOptions);

    const event = {
      name: 'event-A',
      properties,
    };
    plugin.track('user-1', event);
    expect(mparticle.logEvent).toHaveBeenCalledTimes(1);
    expect(mparticle.logEvent.mock.calls[0].slice(0, 3)).toEqual([event.name, 7, event.properties]);
  });
});

describe('logger', () => {
  test('should call wrapped methods', () => {
    const wrappedLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    const logger = new MparticleLogger(wrappedLogger);

    logger.error('error message');
    expect(wrappedLogger.error).toHaveBeenCalledTimes(1);
    expect(wrappedLogger.error.mock.calls[0]).toEqual(['error message']);

    logger.verbose('verbose message');
    expect(wrappedLogger.debug).toHaveBeenCalledTimes(1);
    expect(wrappedLogger.debug.mock.calls[0]).toEqual(['verbose message']);

    logger.warning('warning message');
    expect(wrappedLogger.warn).toHaveBeenCalledTimes(1);
    expect(wrappedLogger.warn.mock.calls[0]).toEqual(['warning message']);
  });
});
