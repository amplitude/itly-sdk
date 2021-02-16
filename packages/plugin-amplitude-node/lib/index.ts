/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  Properties,
  Plugin,
  PluginLoadOptions,
} from '@itly/sdk';
import Amplitude, { AmplitudeOptions } from 'amplitude';

export { AmplitudeOptions };

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

  load(options: PluginLoadOptions) {
    super.load(options);
    this.amplitude = new Amplitude(this.apiKey, this.options);
  }

  async identify(userId: string, properties?: Properties) {
    const payload = {
      user_id: userId,
      user_properties: properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    try {
      const response = await this.amplitude!.identify(payload);
      responseLogger.success(response);
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async track(userId: string, event: Event) {
    const payload = {
      event_type: event.name,
      user_id: userId,
      event_properties: event.properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    try {
      const response = await this.amplitude!.track(payload);
      responseLogger.success(JSON.stringify(response));
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }
}

export default AmplitudePlugin;
