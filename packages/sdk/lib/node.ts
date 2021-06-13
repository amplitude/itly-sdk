/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  Itly as ItlyBase,
  CallOptions,
  Event,
  LoadOptions,
  Properties,
} from './base';

// Itly Node SDK
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
    loadOptions?: LoadOptions,
  ) => this.itly.load(loadOptions);

  /**
   * Alias a user ID to another user ID.
   * @param userId The user's new ID.
   * @param previousId The user's previous ID.
   * @param options Options for this alias call.
   */
  alias = (
    userId: string,
    previousId?: string,
    options?: CallOptions,
  ) => this.itly.alias(userId, previousId, options);

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   * @param identifyProperties The user's properties.
   * @param options Options for this identify call.
   */
  identify = (
    userId: string,
    identifyProperties?: Properties,
    options?: CallOptions,
  ) => {
    this.itly.identify(userId, identifyProperties, options);
  }

  /**
   * Associate the current user with a group and set or update that group's properties.
   * @param userId The user's ID.
   * @param groupId The group's ID.
   * @param groupProperties The group's properties.
   * @param options Options for this group call.
   */
  group = (
    userId: string,
    groupId: string,
    groupProperties?: Properties,
    options?: CallOptions,
  ) => this.itly.group(userId, groupId, groupProperties, options);

  /**
   * Track a page view.
   * @param userId The user's ID.
   * @param category The page's category.
   * @param name The page's name.
   * @param pageProperties The page's properties.
   * @param options Options for this page call.
   */
  page = (
    userId: string,
    category?: string,
    name?: string,
    pageProperties?: Properties,
    options?: CallOptions,
  ) => this.itly.page(userId, category, name, pageProperties, options);

  /**
   * Track any event.
   * @param userId The user's ID.
   * @param event The event.
   * @param event.name The event's name.
   * @param event.properties The event's properties.
   * @param event.id The event's ID.
   * @param event.version The event's version.
   * @param options Options for this track call.
   */
  track = (
    userId: string,
    event: Event,
    options?: CallOptions,
  ) => this.itly.track(userId, event, options);

  /**
   * Flush pending events.
   */
  flush = () => this.itly.flush();
}

export default Itly;
