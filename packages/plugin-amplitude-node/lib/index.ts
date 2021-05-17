/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  Properties,
  RequestLoggerPlugin,
  PluginLoadOptions,
  PluginCallOptions,
} from '@itly/sdk';
import * as Amplitude from '@amplitude/node';
import { Identify } from '@amplitude/identify';

export type AmplitudeOptions = Partial<Amplitude.Options>;
export type AmplitudeResponse = Amplitude.Response;

export interface AmplitudeCallOptions extends PluginCallOptions {}
export interface AmplitudeAliasOptions extends AmplitudeCallOptions {}
export interface AmplitudeIdentifyOptions extends AmplitudeCallOptions {
  callback?: (response: AmplitudeResponse) => void;
}
export interface AmplitudeGroupOptions extends AmplitudeCallOptions {}
export interface AmplitudePageOptions extends AmplitudeCallOptions {}
export interface AmplitudeTrackOptions extends AmplitudeCallOptions {
  callback?: (response: AmplitudeResponse) => void;
}

/**
 * Amplitude Node Plugin for Iteratively SDK
 */
export class AmplitudePlugin extends RequestLoggerPlugin {
  private amplitude?: Amplitude.NodeClient;

  constructor(
    private apiKey: string,
    private options?: AmplitudeOptions,
  ) {
    super('amplitude');
  }

  // TODO: Allow passing in an instance rather than adding
  // TODO: destination specific configuration to Options
  // constructor(instanceOrApiKey: Amplitude | string, options?: AmplitudeOptions) {
  //     if(typeof instanceOrApiKey === 'string') {
  //         this.amplitude = new Amplitude(instanceOrApiKey, options);
  //     }
  //     else {
  //         this.amplitude = instanceOrApiKey;
  //     }
  // }

  load(options: PluginLoadOptions) {
    super.load(options);
    this.amplitude = Amplitude.init(this.apiKey, this.options);
  }

  async identify(userId: string, properties?: Properties, options?: AmplitudeIdentifyOptions) {
    const { callback } = options ?? {};
    const identifyObject = new Identify();

    if (properties) {
      const entries = Object.entries(properties);
      for (let i = 0; i < entries.length; i += 1) {
        const [propertyName, propertyValue] = entries[i];
        identifyObject.set(propertyName, propertyValue);
      }
    }

    const responseLogger = this.logger!.logRequest('identify', `${userId} ${JSON.stringify(properties)}`);
    try {
      const response = await this.amplitude!.identify(userId, '', identifyObject);
      responseLogger.success(JSON.stringify(response));
      callback?.(response);
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async track(userId: string, { name, properties }: Event, options?: AmplitudeTrackOptions) {
    const { callback } = options ?? {};
    const payload = {
      event_type: name,
      user_id: userId,
      event_properties: properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    try {
      const response = await this.amplitude!.logEvent(payload);
      responseLogger.success(JSON.stringify(response));
      callback?.(response);
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async flush() {
    await this.amplitude!.flush();
  }
}

export default AmplitudePlugin;
