/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import appboy from '@braze/web-sdk-core';
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions,
} from '@itly/sdk';

export type BrazeOptions = appboy.InitializationOptions;

/**
 * Braze Browser Plugin for Iteratively SDK
 */
export class BrazePlugin extends RequestLoggerPlugin {
  constructor(
    private readonly apiKey: string,
    private readonly options: BrazeOptions,
  ) {
    super('braze');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    appboy.initialize(this.apiKey, this.options);
    appboy.openSession();
  }

  identify(userId: string | undefined, properties?: Properties) {
    if (userId) {
      appboy.changeUser(userId);
    }
    if (properties != null) {
      const user = appboy.getUser();
      for (const [key, value] of Object.entries(properties)) {
        user.setCustomUserAttribute(key, BrazePlugin.valueForAPI(value));
      }
    }
  }

  track(userId: string | undefined, { name, properties }: Event) {
    if (userId) {
      appboy.changeUser(userId);
    }
    if (properties == null) {
      appboy.logCustomEvent(name);
    } else {
      const eventProperties = Object.fromEntries(
        Object.entries(properties).map(([key, value]) => [key, BrazePlugin.valueForAPI(value)]),
      );
      appboy.logCustomEvent(name, eventProperties);
    }
  }

  private static valueForAPI(value: any): any {
    // https://www.braze.com/docs/api/objects_filters/user_attributes_object/
    // https://www.braze.com/docs/api/objects_filters/event_object/
    // API supports doesn't support objects and (non-string) arrays.
    return (value != null && typeof value === 'object') ? JSON.stringify(value) : value;
  }
}
