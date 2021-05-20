/* eslint-disable import/no-unresolved */
import Itly from '../node';
import { Event, Validation } from '../base';
import { callItlyMethod, createPlugin, getPluginMethods } from './utils';

afterAll(() => {
  jest.restoreAllMocks();
  jest.resetModules();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('validation', () => {
  const properties = { a: 'abc', b: 123 };

  const trackMethods: [string, any[]][] = [
    ['identify', ['user-1', properties]],
    ['group', ['user-1', 'group-1', properties]],
    ['page', ['user-1', 'category', 'name', properties]],
    ['track', ['user-1', { name: 'event-1', properties }]],
  ];

  describe('should throw validation error if event is not valid and environment is development', () => {
    test.each(trackMethods)('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          plugins: [validationPlugin, plugin],
          environment: 'development',
        });

        expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow(`Validation Error: ${methodName} error`);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(0);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should track invalid event if environment is production', () => {
    test.each(trackMethods)('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          plugins: [validationPlugin, plugin],
          environment: 'production',
        });

        callItlyMethod(itly, methodName, methodArgs);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should throw validation error if event is not valid and options.validation = ErrorOnInvalid', () => {
    test.each(trackMethods)('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          plugins: [validationPlugin, plugin],
          validation: Validation.ErrorOnInvalid,
        });

        expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow(`Validation Error: ${methodName} error`);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(0);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should track invalid event if options.validation = TrackOnInvalid', () => {
    test.each(trackMethods)('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          plugins: [validationPlugin, plugin],
          validation: Validation.TrackOnInvalid,
        });

        callItlyMethod(itly, methodName, methodArgs);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should skip validation if options.validation = Disabled', () => {
    test.each(trackMethods)('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(() => ({ valid: false, message: `${methodName} error` }));

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          plugins: [validationPlugin, plugin],
          validation: Validation.Disabled,
        });

        callItlyMethod(itly, methodName, methodArgs);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(0);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should throw validation error if validate() throws exception and options.validation = ErrorOnInvalid', () => {
    test.each(trackMethods)('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(() => {
          throw new Error(`${methodName} exception`);
        });

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          plugins: [validationPlugin, plugin],
          validation: Validation.ErrorOnInvalid,
        });

        expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow(`Validation Error: ${methodName} exception`);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(0);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should throw validation error if context is not valid and options.validation = ErrorOnInvalid', () => {
    test.each(trackMethods.filter(([methodName]) => methodName === 'track'))('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(
          (event: Event) => (event.name === 'context' ? { valid: false, message: 'context error' } : { valid: true }),
        );

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          context: {
            a: 123,
          },
          plugins: [validationPlugin, plugin],
          validation: Validation.ErrorOnInvalid,
        });

        expect(() => callItlyMethod(itly, methodName, methodArgs)).toThrow('Validation Error: context error');
        expect(validationPlugin.validate).toHaveBeenCalledTimes(2);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(0);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });

  describe('should track valid event if context is not valid and options.validation = ErrorOnInvalid', () => {
    test.each(trackMethods.filter(([methodName]) => methodName !== 'track'))('%s',
      (methodName, methodArgs) => {
        const validationPlugin = createPlugin();
        validationPlugin.validate = jest.fn(
          (event: Event) => (event.name === 'context' ? { valid: false, message: 'context error' } : { valid: true }),
        );

        const plugin = createPlugin();

        const itly = new Itly();
        itly.load({
          context: {
            a: 123,
          },
          plugins: [validationPlugin, plugin],
          validation: Validation.ErrorOnInvalid,
        });

        callItlyMethod(itly, methodName, methodArgs);
        expect(validationPlugin.validate).toHaveBeenCalledTimes(1);

        const [pluginMethod, pluginPostMethod] = getPluginMethods(plugin, methodName);
        expect(pluginMethod).toHaveBeenCalledTimes(1);
        expect(pluginPostMethod).toHaveBeenCalledTimes(1);
      });
  });
});