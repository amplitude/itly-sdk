/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  EventOptions,
  Properties,
  Plugin,
} from '@itly/sdk';
import Amplitude, { AmplitudeOptions } from 'amplitude';

export { AmplitudeOptions };

export interface AmplitudeMetadata {
  callback?: (...args: any[]) => void;
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
    const { callback } = (options?.metadata?.[this.id] ?? {}) as Partial<AmplitudeMetadata>;
    const response = await this.amplitude!.identify({
      user_id: userId,
      user_properties: properties,
    });
    if (callback) {
      callback(response);
    }
  }

  async track(userId: string, event: Event) {
    const { callback } = (event.metadata?.[this.id] ?? {}) as Partial<AmplitudeMetadata>;
    const response = await this.amplitude!.track({
      event_type: event.name,
      user_id: userId,
      event_properties: event.properties,
    });
    if (callback) {
      callback(response);
    }
  }
}

export default AmplitudePlugin;
