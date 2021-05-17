/* eslint-disable import/no-unresolved */
import Itly from '../node';
import { Loggers, Plugin, PluginLoadOptions } from '../base';

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('logging', () => {
  class TestPlugin extends Plugin {
    // eslint-disable-next-line no-useless-constructor
    constructor(id: string) {
      super(id);
    }

    load(options: PluginLoadOptions) {
      super.load(options);
      options.logger.info('test plugin info');
      options.logger.debug('test plugin info');
      options.logger.warn('test plugin info');
      options.logger.error('test plugin info');
    }
  }

  let spyConsoleMethods: jest.SpyInstance[] = [];

  beforeEach(() => {
    spyConsoleMethods = [
      jest.spyOn(console, 'log').mockImplementation(),
      jest.spyOn(console, 'debug').mockImplementation(),
      jest.spyOn(console, 'info').mockImplementation(),
      jest.spyOn(console, 'warn').mockImplementation(),
      jest.spyOn(console, 'error').mockImplementation(),
    ];
  });

  afterEach(() => {
    spyConsoleMethods.forEach((mock) => mock.mockRestore());
  });

  test('should not output to console by default', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const itly = new Itly();
    itly.load({
      plugins,
    });

    spyConsoleMethods.forEach((mock) => expect(mock).toHaveBeenCalledTimes(0));
  });

  test('should output to console with Loggers.Console', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const itly = new Itly();
    itly.load({
      plugins,
      logger: Loggers.Console,
    });

    spyConsoleMethods.slice(0, 1).forEach((mock) => expect(mock).toHaveBeenCalledTimes(0));
    spyConsoleMethods.slice(1).forEach((mock) => expect(mock).toHaveBeenCalled());
  });

  test('should not output to console with Loggers.None', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const itly = new Itly();
    itly.load({
      plugins,
      logger: Loggers.None,
    });

    spyConsoleMethods.forEach((mock) => expect(mock).toHaveBeenCalledTimes(0));
  });

  test('should output with custom Logger', () => {
    const plugins = [new TestPlugin('plugin-1')];

    const logger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    const itly = new Itly();
    itly.load({
      plugins,
      logger,
    });

    expect(logger.debug).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  });
});
