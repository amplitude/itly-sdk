/* eslint-disable no-unused-vars, class-methods-use-this */
import itlySdk, {
  ItlyOptions,
  ItlyEvent, ItlyProperties,
  ItlyPlugin, ItlyPluginBase,
  ValidationOptions,
  ValidationResponse,
  DebuggerOptions,
} from '@itly/sdk-core';

export {
  ItlyOptions,
  ItlyPlugin,
  ItlyPluginBase,
  ItlyEvent,
  ItlyProperties,
  ValidationOptions,
  ValidationResponse,
  DebuggerOptions,
};

// Itly Browser SDK
class Itly {
  load = (
    options: ItlyOptions,
  ) => itlySdk.load(options);

  alias = (
    userId: string, previousId?: string,
  ) => itlySdk.alias(userId, previousId);

  identify = (
    userId: string | undefined, identifyProperties?: ItlyProperties,
  ) => itlySdk.identify(userId, identifyProperties);

  group = (
    groupId: string, groupProperties?: ItlyProperties,
  ) => itlySdk.group(undefined, groupId, groupProperties);

  page = (
    category: string, name: string, pageProperties?: ItlyProperties,
  ) => itlySdk.page(undefined, category, name, pageProperties);

  track = (
    event: ItlyEvent,
  ) => itlySdk.track(undefined, event);

  reset = () => itlySdk.reset();

  getPlugin = (id: string) => itlySdk.getPlugin(id);
}

export default new Itly();
