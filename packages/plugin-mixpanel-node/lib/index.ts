/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, EventOptions, Properties,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

export interface MixpanelMetadata {
  callback?: Mixpanel.Callback;
}

/**
 * Mixpanel Node Plugin for Iteratively SDK
 */
export class MixpanelPlugin extends Plugin {
  private mixpanel?: Mixpanel.Mixpanel;

  constructor(
    private apiKey: string,
    private options?: MixpanelOptions,
  ) {
    super('mixpanel');
  }

  load() {
    this.mixpanel = Mixpanel.init(this.apiKey, this.options);
  }

  alias(userId: string, previousId: string, options?: EventOptions) {
    const { callback } = (options?.metadata?.[this.id] ?? {}) as Partial<MixpanelMetadata>;
    this.mixpanel!.alias(previousId, userId, callback);
  }

  identify(userId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback } = (options?.metadata?.[this.id] ?? {}) as Partial<MixpanelMetadata>;
    this.mixpanel!.people.set(userId, {
      distinct_id: userId,
      ...properties,
    }, callback);
  }

  track(userId: string, event: Event) {
    const { callback } = (event.metadata?.[this.id] ?? {}) as Partial<MixpanelMetadata>;
    this.mixpanel!.track(event.name, {
      distinct_id: userId,
      ...event.properties,
    }, callback);
  }
}

export default MixpanelPlugin;
