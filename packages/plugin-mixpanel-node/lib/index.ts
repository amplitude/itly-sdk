/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  RequestLoggerPlugin,
  Event,
  Properties,
  PluginLoadOptions,
  ResponseLogger,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

export type MixpanelCallback = Mixpanel.Callback;

export interface MixpanelCallOptions {}
export interface MixpanelAliasOptions extends MixpanelCallOptions {
  callback?: MixpanelCallback;
}
export interface MixpanelIdentifyOptions extends MixpanelCallOptions {
  callback?: MixpanelCallback;
}
export interface MixpanelGroupOptions extends MixpanelCallOptions {}
export interface MixpanelPageOptions extends MixpanelCallOptions {}
export interface MixpanelTrackOptions extends MixpanelCallOptions {
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

  alias(userId: string, previousId: string, options?: MixpanelAliasOptions) {
    const { callback } = options ?? {};
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    this.mixpanel!.alias(previousId, userId, this.wrapCallback(responseLogger, callback));
  }

  identify(userId: string, properties: Properties | undefined, options?: MixpanelIdentifyOptions) {
    const { callback } = options ?? {};
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    this.mixpanel!.people.set(userId, payload, this.wrapCallback(responseLogger, callback));
  }

  track(userId: string, { name, properties }: Event, options?: MixpanelTrackOptions) {
    const { callback } = options ?? {};
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    this.mixpanel!.track(name, payload, this.wrapCallback(responseLogger, callback));
  }

  private wrapCallback(responseLogger: ResponseLogger, callback: MixpanelCallback | undefined) {
    return (err: Error | undefined): any => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      return callback?.(err);
    };
  }
}

export default MixpanelPlugin;
