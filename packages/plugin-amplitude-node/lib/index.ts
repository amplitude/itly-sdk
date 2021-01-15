/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  Properties,
  Plugin,
  Logger,
  PluginLoadOptions,
} from '@itly/sdk';
import Amplitude, { AmplitudeOptions } from 'amplitude';

export { AmplitudeOptions };

/**
 * Amplitude Node Plugin for Iteratively SDK
 */
export class AmplitudePlugin extends Plugin {
  private amplitude?: Amplitude;

  private logger: Logger | undefined;

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
    this.amplitude = new Amplitude(this.apiKey, this.options);
    this.logger = options.logger;
  }

  async identify(userId: string, properties?: Properties) {
    const id = +new Date();
    const payload = {
      user_id: userId,
      user_properties: properties,
    };
    this.logger!.debug(`${this.id}: identify(request) ${id}: ${JSON.stringify(payload)}`);
    try {
      const response = await this.amplitude!.identify(payload);
      this.logger!.debug(`${this.id}: identify(response) ${id}: ${response}`);
    } catch (e) {
      this.logger!.error(`${this.id}: identify(response) ${id}: ${e}`);
    }
  }

  async track(userId: string, event: Event) {
    const id = +new Date();
    const payload = {
      event_type: event.name,
      user_id: userId,
      event_properties: event.properties,
    };
    this.logger!.debug(`${this.id}: track(request) ${id}: ${JSON.stringify(payload)}`);
    try {
      const response = await this.amplitude!.track(payload);
      this.logger!.debug(`${this.id}: track(response) ${id}: ${JSON.stringify(response)}`);
    } catch (e) {
      this.logger!.error(`${this.id}: track(response) ${id}: ${e}`);
    }
  }
}

export default AmplitudePlugin;
