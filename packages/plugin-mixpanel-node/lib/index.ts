/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  RequestLoggerPlugin,
  Event,
  AliasOptions,
  IdentifyOptions,
  TrackOptions,
  Properties,
  PluginLoadOptions,
  ResponseLogger,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

export type MixpanelCallback = Mixpanel.Callback;

export interface MixpanelCallOptions {
  callback?: MixpanelCallback;
}
export interface MixpanelAliasOptions extends MixpanelCallOptions {}
export interface MixpanelIdentifyOptions extends MixpanelCallOptions {}
export interface MixpanelGroupOptions extends MixpanelCallOptions {}
export interface MixpanelPageOptions extends MixpanelCallOptions {}
export interface MixpanelTrackOptions extends MixpanelCallOptions {}

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

  async alias(userId: string, previousId: string, options?: AliasOptions) {
    const { callback } = this.getPluginCallOptions<MixpanelAliasOptions>(options);
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    return new Promise((resolve, reject) => {
      this.mixpanel!.alias(previousId, userId, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async identify(userId: string, properties: Properties | undefined, options?: IdentifyOptions) {
    const { callback } = this.getPluginCallOptions<MixpanelIdentifyOptions>(options);
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.mixpanel!.people.set(userId, payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async track(userId: string, { name, properties }: Event, options?: TrackOptions) {
    const { callback } = this.getPluginCallOptions<MixpanelTrackOptions>(options);
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.mixpanel!.track(name, payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  private wrapCallback(
    responseLogger: ResponseLogger,
    callback: MixpanelCallback | undefined,
    resolve: () => void,
    reject: (reason?: any) => void,
  ) {
    return (err: Error | undefined): any => {
      try {
        let result;
        if (err == null) {
          responseLogger.success('success');
          result = callback?.(undefined);
          resolve();
        } else {
          responseLogger.error(err.toString());
          result = callback?.(err);
          reject(err);
        }
        return result;
      } catch (e) {
        reject(e);
        return undefined;
      }
    };
  }
}

export default MixpanelPlugin;
