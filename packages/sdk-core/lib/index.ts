/* eslint-disable global-require, import/no-unresolved, no-underscore-dangle */
/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  Options,
  Event, Properties,
  Plugin, PluginBase,
  ValidationOptions,
  ValidationResponse,
  ItlyBrowser,
  ItlyNode,
} from './base';

export {
  Options,
  Plugin,
  PluginBase,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
  ItlyBrowser,
  ItlyNode,
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
  const browser = require('./browser');
  itly = browser.default as ItlyBrowser;
} else {
  const node = require('./node');
  itly = node.default as ItlyNode;
}

export default itly;
