/* eslint-disable no-unused-vars */
import itlySdk, {
  Environment, Options,
  Event, Properties,
  Plugin, PluginBase,
  ValidationOptions,
  ValidationResponse,
  ItlyNode,
} from '@itly/sdk-core';

export {
  Environment,
  Options,
  Plugin,
  PluginBase,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
};

class Itly implements ItlyNode {
  load = (
    options: Options,
  ) => itlySdk.load(options);

  alias = (
    userId: string, previousId?: string,
  ) => itlySdk.alias(userId, previousId);

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   */
  identify = (
    userId: string | undefined, identifyProperties?: Properties,
  ) => itlySdk.identify(userId, identifyProperties);

  group = (
    userId:string | undefined, groupId: string, groupProperties?: Properties,
  ) => itlySdk.group(userId, groupId, groupProperties);

  page = (
    userId: string | undefined, category: string, name: string, pageProperties?: Properties,
  ) => itlySdk.page(userId, category, name, pageProperties);

  track = (
    userId: string | undefined,
    event: Event,
  ) => itlySdk.track(userId, event);

  reset = () => itlySdk.reset();

  getPlugin = (id: string) => itlySdk.getPlugin(id);
}

export default new Itly();
