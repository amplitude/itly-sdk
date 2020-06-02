import itlySdk, {
  ItlyLogger, ItlyCoreOptions, ItlyOptions, ItlyProperties, ItlyDestination,
} from '@itly/sdk-core';

export {
  ItlyDestination,
  ItlyLogger,
  ItlyOptions,
  ItlyProperties,
  ItlyCoreOptions,
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
    eventName: string,
    properties: ItlyProperties | undefined,
    eventId: string,
    eventVersion: string,
  ) => itlySdk.track(userId, eventName, properties, eventId, eventVersion);

  reset = () => itlySdk.reset();
}

export default new Itly();
