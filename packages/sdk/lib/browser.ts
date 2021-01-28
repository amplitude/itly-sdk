/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  Itly as ItlyBase,
  Options,
  LoadOptions,
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
  LoadOptions,
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
export class Itly {
  private itly: ItlyBase;

  constructor() {
    this.itly = new ItlyBase();
  }

  /**
   * Initialize the Itly SDK. Call once when your application starts.
   * @param loadOptions Configuration options to initialize the Itly SDK with.
   */
  load = (
    loadOptions: LoadOptions = {},
  ) => this.itly.load(loadOptions);

  /**
   * Alias a user ID to another user ID.
   * @param userId The user's new ID.
   * @param previousId The user's previous ID.
   */
  alias = (
    userId: string, previousId?: string,
  ) => this.itly.alias(userId, previousId);

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   * @param identifyProperties The user's properties.
   */
  identify = (
    userId: string | Properties | undefined, identifyProperties?: Properties,
  ) => {
    if (userId != null && typeof (userId) === 'object') {
      // eslint-disable-next-line no-param-reassign
      identifyProperties = userId;
      // eslint-disable-next-line no-param-reassign
      userId = undefined;
    }

    this.itly.identify(userId, identifyProperties);
  }

  /**
   * Associate the current user with a group and set or update that group's properties.
   * @param groupId The group's ID.
   * @param groupProperties The group's properties.
   */
  group = (
    groupId: string, groupProperties?: Properties,
  ) => this.itly.group(undefined, groupId, groupProperties);

  /**
   * Track a page view.
   * @param category The page's category.
   * @param name The page's name.
   * @param pageProperties The page's properties.
   */
  page = (
    category: string, name: string, pageProperties?: Properties,
  ) => this.itly.page(undefined, category, name, pageProperties);

  /**
   * Track any event.
   * @param event The event.
   * @param event.name The event's name.
   * @param event.properties The event's properties.
   * @param event.id The event's ID.
   * @param event.version The event's version.
   * @param event.metadata The event's metadata.
   */
  track = (
    event: Event,
  ) => this.itly.track(undefined, event);

  /**
   * Reset (e.g. on logout) all analytics state for the current user and group.
   */
  reset = () => this.itly.reset();

  /**
   * Flush pending events.
   */
  flush = () => this.itly.flush();
}

export default Itly;
