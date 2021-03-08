/* eslint-disable global-require, import/extensions, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import {
  Options,
  Environment,
  Event,
  AliasOptions,
  IdentifyOptions,
  GroupOptions,
  PageOptions,
  TrackOptions,
  Properties,
  Plugin,
  PluginLoadOptions,
  Validation,
  ValidationResponse,
  Logger,
  LOGGERS,
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
  Plugin,
  PluginLoadOptions,
  Event,
  AliasOptions,
  IdentifyOptions,
  GroupOptions,
  PageOptions,
  TrackOptions,
  Properties,
  Validation,
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
