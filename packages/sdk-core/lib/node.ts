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

// Itly Node SDK is the same as base (for now)
export class ItlyNode {
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
    userId:string | undefined, groupId: string, groupProperties?: Properties,
  ) => itly.group(userId, groupId, groupProperties);

  page = (
    userId: string | undefined, category: string, name: string, pageProperties?: Properties,
  ) => itly.page(userId, category, name, pageProperties);

  track = (
    userId: string | undefined,
    event: Event,
  ) => itly.track(userId, event);

  reset = () => itly.reset();

  getPlugin = (id: string) => itly.getPlugin(id);
}

export default new ItlyNode();
