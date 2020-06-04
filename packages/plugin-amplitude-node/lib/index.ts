/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { ItlyCoreOptions, ItlyProperties, ItlyDestination } from '@itly/sdk-node';
import Amplitude, { AmplitudeOptions } from 'amplitude';

export { AmplitudeOptions };

export default class AmplitudeNodeDestination implements ItlyDestination {
  static ID: string = 'amplitude';

  private amplitude: Amplitude;

  constructor(itlyOptions: ItlyCoreOptions, apiKey: string, options?: AmplitudeOptions) {
    this.amplitude = new Amplitude(apiKey, options);
  }

  // TODO: Allow passing in an instance rather than adding
  // TODO: destination specific configuration to ItlyOptions
  // constructor(instanceOrApiKey: Amplitude | string, options?: AmplitudeOptions) {
  //     if(typeof instanceOrApiKey === 'string') {
  //         this.amplitude = new Amplitude(instanceOrApiKey, options);
  //     }
  //     else {
  //         this.amplitude = instanceOrApiKey;
  //     }
  // }

  id = () => AmplitudeNodeDestination.ID;

  init = () => {
    // N/A for Amplitude
  }

  alias(userId: string, previousId: string) {
    // N/A for Amplitude
  }

  identify(userId: string, properties?: ItlyProperties) {
    this.amplitude.identify({
      user_id: userId,
      user_properties: properties,
    });
  }

  group(userId: string, groupId: string, properties?: ItlyProperties) {
    // N/A for Amplitude
  }

  page(userId: string, category: string, name: string, properties?: ItlyProperties) {
    // N/A for Amplitude
  }

  track(userId: string, eventName: string, properties: ItlyProperties) {
    this.amplitude.track({
      event_type: eventName,
      user_id: userId,
      event_properties: properties,
    });
  }

  reset() {
    // No-op for NodeJs Adapter
  }
}
