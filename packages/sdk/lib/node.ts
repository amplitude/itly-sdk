/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  Itly as ItlyBase,
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

// Itly Node SDK is the same as base (for now)
export class Itly {
  private itly: ItlyBase;

  constructor() {
    this.itly = new ItlyBase();
  }

  load = (
    context?: Properties, options?: Options,
  ) => this.itly.load(context, options);

  alias = (
    userId: string, previousId?: string,
  ) => this.itly.alias(userId, previousId);

  identify = (
    userId: string | undefined, identifyProperties?: Properties,
  ) => this.itly.identify(userId, identifyProperties);

  group = (
    userId: string | undefined, groupId: string, groupProperties?: Properties,
  ) => this.itly.group(userId, groupId, groupProperties);

  page = (
    userId: string | undefined, category: string, name: string, pageProperties?: Properties,
  ) => this.itly.page(userId, category, name, pageProperties);

  track = (
    userId: string | undefined,
    event: Event,
  ) => this.itly.track(userId, event);

  reset = () => this.itly.reset();
}

export default Itly;
