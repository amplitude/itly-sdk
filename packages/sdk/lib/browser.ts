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

// Itly Browser SDK
export class ItlyBrowser {
  load = (
    context?: Properties, options?: Options,
  ) => itlyBase.load(context, options);

  alias = (
    userId: string, previousId?: string,
  ) => itlyBase.alias(userId, previousId);

  identify = (
    userId: string | Properties | undefined, identifyProperties?: Properties,
  ) => {
    if (userId != null && typeof (userId) === 'object') {
      // eslint-disable-next-line no-param-reassign
      identifyProperties = userId;
      // eslint-disable-next-line no-param-reassign
      userId = undefined;
    }

    itlyBase.identify(userId, identifyProperties);
  }

  group = (
    groupId: string, groupProperties?: Properties,
  ) => itlyBase.group(undefined, groupId, groupProperties);

  page = (
    category: string, name: string, pageProperties?: Properties,
  ) => itlyBase.page(undefined, category, name, pageProperties);

  track = (
    event: Event,
  ) => itlyBase.track(undefined, event);

  reset = () => itlyBase.reset();
}

const itly = new ItlyBrowser();
export { itly };
export default itly;
