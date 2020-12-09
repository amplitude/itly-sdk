---
to: packages/sdk-<%= name %>/lib/index.ts
---
/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  itly as itlySdk,
  Options,
  Event,
  Properties,
  Plugin,
  ValidationOptions,
  ValidationResponse,
} from '<%= itlySdkModule %>';

export {
  Options,
  Plugin,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
};

class Itly {
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
}

const itly = new Itly();
export { itly };
export default itly;
