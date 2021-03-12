/* eslint-disable no-unused-vars, class-methods-use-this, import/extensions, import/no-unresolved */
import {
  Itly as ItlyBase,
  LoadOptions,
  Event,
  AliasOptions,
  IdentifyOptions,
  GroupOptions,
  PageOptions,
  TrackOptions,
  Properties,
} from './base';

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
   * @param options Options for this Alias call.
   */
  alias = (
    userId: string,
    previousId?: string,
    options?: AliasOptions,
  ) => this.itly.alias(userId, previousId, options);

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   * @param identifyProperties The user's properties.
   * @param options Options for this Identify call.
   */
  identify = (
    userId: string | Properties | undefined,
    identifyProperties?: Properties,
    options?: IdentifyOptions,
  ) => {
    if (userId != null && typeof (userId) === 'object') {
      // eslint-disable-next-line no-param-reassign
      options = identifyProperties;
      // eslint-disable-next-line no-param-reassign
      identifyProperties = userId;
      // eslint-disable-next-line no-param-reassign
      userId = undefined;
    }

    return this.itly.identify(userId, identifyProperties, options);
  }

  /**
   * Associate the current user with a group and set or update that group's properties.
   * @param groupId The group's ID.
   * @param groupProperties The group's properties.
   * @param options Options for this Group call.
   */
  group = (
    groupId: string,
    groupProperties?: Properties,
    options?: GroupOptions,
  ) => this.itly.group(undefined, groupId, groupProperties, options);

  /**
   * Track a page view.
   * @param category The page's category.
   * @param name The page's name.
   * @param pageProperties The page's properties.
   * @param options Options for this Page call.
   */
  page = (
    category: string,
    name: string,
    pageProperties?: Properties,
    options?: PageOptions,
  ) => this.itly.page(undefined, category, name, pageProperties, options);

  /**
   * Track any event.
   * @param event The event.
   * @param event.name The event's name.
   * @param event.properties The event's properties.
   * @param event.id The event's ID.
   * @param event.version The event's version.
   * @param options Options for this Track call.
   */
  track = (
    event: Event,
    options?: TrackOptions,
  ) => this.itly.track(undefined, event, options);

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
