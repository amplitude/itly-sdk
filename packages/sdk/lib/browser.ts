/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import itly, {
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

// Itly Browser SDK
export class ItlyBrowser {
  load = (
    options: Options,
  ) => itly.load(options);

  alias = (
    userId: string, previousId?: string,
  ) => itly.alias(userId, previousId);

  identify = (
    userId: string | undefined, identifyProperties?: Properties,
  ) => itly.identify(userId, identifyProperties);

  group = (
    groupId: string, groupProperties?: Properties,
  ) => itly.group(undefined, groupId, groupProperties);

  page = (
    category: string, name: string, pageProperties?: Properties,
  ) => itly.page(undefined, category, name, pageProperties);

  track = (
    event: Event,
  ) => itly.track(undefined, event);

  reset = () => itly.reset();

  getPlugin = (id: string) => itly.getPlugin(id);
}

export default new ItlyBrowser();
