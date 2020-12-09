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
  LOGGERS,
} from './base';

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
  LOGGERS,
};

// eslint-disable-next-line import/no-mutable-exports
let Itly;

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
  Itly = require('./browser').Itly;
} else {
  Itly = require('./node').Itly;
}

export { Itly };
export default Itly;
