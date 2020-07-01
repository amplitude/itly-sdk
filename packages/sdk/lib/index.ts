/* eslint-disable global-require, import/extensions, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import {
  Options,
  Environment,
  Event,
  Properties,
  Plugin,
  PluginBase,
  ValidationOptions,
  ValidationResponse,
} from './base';

export {
  Options,
  Environment,
  Plugin,
  PluginBase,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
};

// eslint-disable-next-line import/no-mutable-exports
let itly;

const p = process as any;
if (
  typeof p === 'undefined'
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
