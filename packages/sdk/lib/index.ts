/* eslint-disable no-unused-vars, class-methods-use-this */
import itlySdk, {
  Options,
  Event, Properties,
  Plugin, PluginBase,
  ValidationOptions,
  ValidationResponse,
  DebuggerOptions,
} from '@itly/sdk-core';

export {
  Options,
  Plugin,
  PluginBase,
  Event,
  Properties,
  ValidationOptions,
  ValidationResponse,
  DebuggerOptions,
};

// Itly Browser SDK
class Itly {
  load = (
    options: Options,
  ) => itlySdk.load(options);

  alias = (
    userId: string, previousId?: string,
  ) => itlySdk.alias(userId, previousId);

  identify = (
    userId: string | undefined, identifyProperties?: Properties,
  ) => itlySdk.identify(userId, identifyProperties);

  group = (
    groupId: string, groupProperties?: Properties,
  ) => itlySdk.group(undefined, groupId, groupProperties);

  page = (
    category: string, name: string, pageProperties?: Properties,
  ) => itlySdk.page(undefined, category, name, pageProperties);

  track = (
    event: Event,
  ) => itlySdk.track(undefined, event);

  reset = () => itlySdk.reset();

  getPlugin = (id: string) => itlySdk.getPlugin(id);
}

export default new Itly();
