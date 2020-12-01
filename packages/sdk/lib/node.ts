/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  itly as itlyBase,
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
export class ItlyNode {
  load = (
    context?: Properties, options?: Options,
  ) => itlyBase.load(context, options);

  alias = (
    userId: string, previousId?: string,
  ) => itlyBase.alias(userId, previousId);

  identify = (
    userId: string | undefined, identifyProperties?: Properties,
  ) => itlyBase.identify(userId, identifyProperties);

  group = (
    userId: string | undefined, groupId: string, groupProperties?: Properties,
  ) => itlyBase.group(userId, groupId, groupProperties);

  page = (
    userId: string | undefined, category: string, name: string, pageProperties?: Properties,
  ) => itlyBase.page(userId, category, name, pageProperties);

  track = (
    userId: string | undefined,
    event: Event,
  ) => itlyBase.track(userId, event);

  reset = () => itlyBase.reset();
}

const itly = new ItlyNode();
export { itly };
export default itly;
