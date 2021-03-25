/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  Properties,
  RequestLoggerPlugin,
  PluginLoadOptions,
  PluginCallOptions,
} from '@itly/sdk';
import Amplitude, { AmplitudeOptions, AmplitudeIdentifyResponse, AmplitudeTrackResponse } from 'amplitude';

export { AmplitudeOptions };

export interface AmplitudeCallOptions extends PluginCallOptions {}
export interface AmplitudeAliasOptions extends AmplitudeCallOptions {}
export interface AmplitudeIdentifyOptions extends AmplitudeCallOptions {
  callback?: (response: AmplitudeIdentifyResponse) => void;
}
export interface AmplitudeGroupOptions extends AmplitudeCallOptions {}
export interface AmplitudePageOptions extends AmplitudeCallOptions {}
export interface AmplitudeTrackOptions extends AmplitudeCallOptions {
  callback?: (response: AmplitudeTrackResponse) => void;
}

/**
 * Amplitude Node Plugin for Iteratively SDK
 */
export class AmplitudePlugin extends RequestLoggerPlugin {
  private amplitude?: Amplitude;

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
    this.amplitude = new Amplitude(this.apiKey, this.options);
  }

  async identify(userId: string, properties?: Properties, options?: AmplitudeIdentifyOptions) {
    const { callback } = options ?? {};
    const payload = {
      user_id: userId,
      user_properties: properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    try {
      const response = await this.amplitude!.identify(payload);
      responseLogger.success(response);
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
      const response = await this.amplitude!.track(payload);
      responseLogger.success(JSON.stringify(response));
      callback?.(response);
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }
}

export default AmplitudePlugin;
