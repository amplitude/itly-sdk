/* eslint-disable global-require, import/extensions, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import {
  CallOptions,
  Environment,
  Event,
  Logger,
  Loggers,
  Options,
  Plugin,
  PluginCallOptions,
  PluginLoadOptions,
  Properties,
  Validation,
  ValidationResponse,
} from './base';
import {
  RequestLoggerPlugin,
  RequestLogger,
  ResponseLogger,
} from './internal/RequestLogger';
import { Itly as ItlyBrowser } from './browser';
import { Itly as ItlyNode } from './node';

export {
  Options,
  Environment,
  CallOptions,
  Plugin,
  PluginLoadOptions,
  PluginCallOptions,
  Event,
  Properties,
  Validation,
  ValidationResponse,
  Logger,
  Loggers,
  RequestLoggerPlugin,
  RequestLogger,
  ResponseLogger,
};

const p = typeof process === 'undefined'
  ? undefined
  : process as any;

const isBrowser = (!p
// Electron renderer / nwjs process
|| (p.type === 'renderer' || p.browser === true || p.__nwjs)
// Jest JSDOM
|| (typeof navigator === 'object' && navigator.userAgent && navigator.userAgent.includes('jsdom'))
// React Native
|| (typeof navigator === 'object' && navigator.product && navigator.product.includes('ReactNative')));

const Itly: any = isBrowser ? ItlyBrowser : ItlyNode;

export { Itly, ItlyBrowser, ItlyNode };
export default Itly;
