/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  RequestLoggerPlugin, Event, EventOptions, EventMetadata, Properties, PluginLoadOptions,
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
export class MixpanelPlugin extends RequestLoggerPlugin {
  private mixpanel?: Mixpanel.Mixpanel;

  constructor(
    private apiKey: string,
    private options?: MixpanelOptions,
  ) {
    super('mixpanel');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    this.mixpanel = Mixpanel.init(this.apiKey, this.options);
  }

  alias(userId: string, previousId: string, options?: EventOptions) {
    const { callback } = this.getMixpanelMetadata(options?.metadata);
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    this.mixpanel!.alias(previousId, userId, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  identify(userId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback } = this.getMixpanelMetadata(options?.metadata);
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    this.mixpanel!.people.set(userId, payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  track(userId: string, { name, properties, metadata }: Event) {
    const { callback } = this.getMixpanelMetadata(metadata);
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    this.mixpanel!.track(name, payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  private getMixpanelMetadata(metadata?: EventMetadata): Partial<MixpanelMetadata> {
    return this.getPluginMetadata<MixpanelMetadata>(metadata);
  }
}

export default MixpanelPlugin;
