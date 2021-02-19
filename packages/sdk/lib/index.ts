/* eslint-disable global-require, import/extensions, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import {
  Options,
  Environment,
  Event,
  Properties,
  Plugin,
  PluginLoadOptions,
  ValidationOptions,
  ValidationResponse,
  Logger,
  RequestLoggerPlugin,
  RequestLogger,
  ResponseLogger,
  LOGGERS,
} from './base';
import { Itly as ItlyBrowser } from './browser';
import { Itly as ItlyNode } from './node';

export {
  Options,
  Environment,
  Plugin,
  PluginLoadOptions,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
  Logger,
  RequestLoggerPlugin,
  RequestLogger,
  ResponseLogger,
  LOGGERS,
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
