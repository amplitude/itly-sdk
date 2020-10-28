/* eslint-disable global-require, import/extensions, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import {
  Options,
  Environment,
  Event,
  Properties,
  Plugin,
  PluginBase,
  PluginLoadOptions,
  ValidationOptions,
  ValidationResponse,
  Logger,
  LOGGERS,
} from './base';

export {
  Options,
  Environment,
  Plugin,
  PluginBase,
  PluginLoadOptions,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
  Logger,
  LOGGERS,
};

// eslint-disable-next-line import/no-mutable-exports
let itly;

const p = typeof process === 'undefined'
  ? undefined
  : process as any;

if (
  !p
  // Electron renderer / nwjs process
  || (p.type === 'renderer' || p.browser === true || p.__nwjs)
  // Jest JSDOM
  || (typeof navigator === 'object' && navigator.userAgent && navigator.userAgent.includes('jsdom'))
) {
  itly = require('./browser').default;
} else {
  itly = require('./node').default;
}

export { itly };
export default itly;
