/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  itly as itlyBase,
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

// Itly Browser SDK
export class ItlyBrowser {
  load = (
    options: Options,
  ) => itlyBase.load(options);

  alias = (
    userId: string, previousId?: string,
  ) => itlyBase.alias(userId, previousId);

  identify = (
    userId: string | undefined, identifyProperties?: Properties,
  ) => itlyBase.identify(userId, identifyProperties);

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

  getPlugin = (id: string) => itlyBase.getPlugin(id);
}

const itly = new ItlyBrowser();
export { itly };
export default itly;
