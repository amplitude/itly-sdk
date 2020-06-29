/* eslint-disable global-require, import/no-unresolved, no-underscore-dangle */
/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  Options,
  Event, Properties,
  Plugin, PluginBase,
  ValidationOptions,
  ValidationResponse,
} from './base';

export {
  Options,
  Plugin,
  PluginBase,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
};

// eslint-disable-next-line import/no-mutable-exports
let itly: any;

const p = process as any;
if (typeof p === 'undefined' || p.type === 'renderer' || p.browser === true || p.__nwjs) {
  itly = require('./browser');
} else {
  itly = require('./node');
}

export default itly;
