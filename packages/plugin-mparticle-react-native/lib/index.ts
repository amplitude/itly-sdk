/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, Properties, RequestLoggerPlugin,
} from '@itly/sdk';
import MParticle from 'react-native-mparticle';

// Native initialization: https://docs.mparticle.com/developers/sdk/react-native/getting-started/#installation

/**
 * mParticle React Native Plugin for Iteratively SDK
 */
export class MparticlePlugin extends RequestLoggerPlugin {
  constructor() {
    super('mparticle');
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties) {
    MParticle.logScreenEvent(name, { ...properties });
  }

  track(userId: string | undefined, { name, properties }: Event) {
    MParticle.logEvent(
      name,
      MParticle.EventType.Other,
      { ...properties },
    );
  }
}

export default MparticlePlugin;
