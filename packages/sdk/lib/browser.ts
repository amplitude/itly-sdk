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

// Itly Browser SDK
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
    userId: string | Properties | undefined, identifyProperties?: Properties,
  ) => {
    if (userId != null && typeof (userId) === 'object') {
      // eslint-disable-next-line no-param-reassign
      identifyProperties = userId;
      // eslint-disable-next-line no-param-reassign
      userId = undefined;
    }

    this.itly.identify(userId, identifyProperties);
  }

  group = (
    groupId: string, groupProperties?: Properties,
  ) => this.itly.group(undefined, groupId, groupProperties);

  page = (
    category: string, name: string, pageProperties?: Properties,
  ) => this.itly.page(undefined, category, name, pageProperties);

  track = (
    event: Event,
  ) => this.itly.track(undefined, event);

  reset = () => this.itly.reset();
}

export default Itly;
