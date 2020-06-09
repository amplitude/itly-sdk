import itlySdk, {
  ItlyOptions,
  ItlyEvent, ItlyProperties,
  ItlyPlugin, ItlyPluginBase,
  ValidationOptions,
  ValidationResponse,
} from '@itly/sdk-core';

export {
  ItlyOptions,
  ItlyPlugin,
  ItlyPluginBase,
  ItlyEvent,
  ItlyProperties,
  ValidationOptions,
  ValidationResponse,
};

class Itly {
  load = (
    options: ItlyOptions,
  ) => itlySdk.load(options);

  alias = (
    userId: string, previousId?: string,
  ) => itlySdk.alias(userId, previousId);

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   */
  identify = (
    userId: string | undefined, identifyProperties?: ItlyProperties,
  ) => itlySdk.identify(userId, identifyProperties);

  group = (
    userId:string | undefined, groupId: string, groupProperties?: ItlyProperties,
  ) => itlySdk.group(userId, groupId, groupProperties);

  page = (
    userId: string | undefined, category: string, name: string, pageProperties?: ItlyProperties,
  ) => itlySdk.page(userId, category, name, pageProperties);

  track = (
    userId: string | undefined,
    event: ItlyEvent,
  ) => itlySdk.track(userId, event);

  reset = () => itlySdk.reset();

  getPlugin = (id: string) => itlySdk.getPlugin(id);
}

export default new Itly();
