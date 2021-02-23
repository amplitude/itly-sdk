/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, EventOptions, EventMetadata, Properties,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

export type MixpanelCallback = Mixpanel.Callback;

/**
 * Mixpanel specific metadata
 */
export interface MixpanelMetadata {
  callback?: MixpanelCallback;
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
    const { callback } = this.getMixpanelMetadata(options?.metadata);
    this.mixpanel!.alias(previousId, userId, callback);
  }

  identify(userId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback } = this.getMixpanelMetadata(options?.metadata);
    this.mixpanel!.people.set(userId, {
      distinct_id: userId,
      ...properties,
    }, callback);
  }

  track(userId: string, { name, properties, metadata }: Event) {
    const { callback } = this.getMixpanelMetadata(metadata);
    this.mixpanel!.track(name, {
      distinct_id: userId,
      ...properties,
    }, callback);
  }

  private getMixpanelMetadata(metadata?: EventMetadata): Partial<MixpanelMetadata> {
    return this.getPluginMetadata<MixpanelMetadata>(metadata);
  }
}

export default MixpanelPlugin;
