/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  EventOptions,
  EventMetadata,
  Properties,
  Plugin,
} from '@itly/sdk';
import Amplitude, { AmplitudeOptions, AmplitudeIdentifyResponse, AmplitudeTrackResponse } from 'amplitude';

export { AmplitudeOptions };

export type AmplitudeCallback = (response: AmplitudeIdentifyResponse | AmplitudeTrackResponse) => void;

/**
 * Amplitude specific metadata
 */
export interface AmplitudeMetadata {
  callback?: AmplitudeCallback;
}

/**
 * Amplitude Node Plugin for Iteratively SDK
 */
export class AmplitudePlugin extends Plugin {
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

  load() {
    this.amplitude = new Amplitude(this.apiKey, this.options);
  }

  async identify(userId: string, properties?: Properties, options?: EventOptions) {
    const { callback } = this.getAmplitudeMetadata(options?.metadata);
    const response = await this.amplitude!.identify({
      user_id: userId,
      user_properties: properties,
    });
    if (callback) {
      callback(response);
    }
  }

  async track(userId: string, { name, properties, metadata }: Event) {
    const { callback } = this.getAmplitudeMetadata(metadata);
    const response = await this.amplitude!.track({
      event_type: name,
      user_id: userId,
      event_properties: properties,
    });
    if (callback) {
      callback(response);
    }
  }

  private getAmplitudeMetadata(metadata?: EventMetadata): Partial<AmplitudeMetadata> {
    return this.getPluginMetadata<AmplitudeMetadata>(metadata);
  }
}

export default AmplitudePlugin;
