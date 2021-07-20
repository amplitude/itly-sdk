const mparticle = {
  logScreenEvent: jest.fn(),
  logEvent: jest.fn(),
  EventType: {
    Other: 7,
  },
};

jest.mock('react-native-mparticle', () => ({
  __esModule: true,
  default: mparticle,
}));

/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
/* eslint-disable import/first */
import { Loggers, PluginLoadOptions } from '@amplitude/sdk';
import MparticlePlugin from '../index';

const pluginLoadOptions: PluginLoadOptions = { environment: 'production', logger: Loggers.None };

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
  const plugin = new MparticlePlugin();
  expect(plugin.id).toEqual('mparticle');
});

describe('load', () => {
  test('should not throw error', () => {
    const plugin = new MparticlePlugin();
    expect(() => plugin.load(pluginLoadOptions)).not.toThrow();
  });
});

describe('page', () => {
  test('should call internal logScreenEvent()', () => {
    const plugin = new MparticlePlugin();
    plugin.load(pluginLoadOptions);

    plugin.page('user-1', 'category A', 'page B', properties);
    expect(mparticle.logScreenEvent).toHaveBeenCalledTimes(1);
    expect(mparticle.logScreenEvent.mock.calls[0]).toEqual(['page B', properties]);
  });
});

describe('track', () => {
  test('should call internal track()', () => {
    const plugin = new MparticlePlugin();
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
