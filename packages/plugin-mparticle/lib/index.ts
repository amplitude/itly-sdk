/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-classes-per-file
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions, Logger,
} from '@itly/sdk';
import Mparticle from '@mparticle/web-sdk';

export type MparticleOptions = {
  isDevelopmentMode?: boolean,
};

class MparticleLogger {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  verbose(msg: string) {
    this.logger.debug(msg);
  }

  warning(msg: string) {
    this.logger.warn(msg);
  }

  error(msg: string) {
    this.logger.error(msg);
  }
}

/**
 * mParticle Browser Plugin for Iteratively SDK
 */
export class MparticlePlugin extends RequestLoggerPlugin {
  private mparticle?: any;

  constructor(
    private apiKey: string,
    private options: MparticleOptions = { },
  ) {
    super('mparticle');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    this.mparticle = Mparticle.getInstance();
    try {
      // validates that mparticle instance is initialized
      this.mparticle.getDeviceId();
    } catch {
      const mparticleOptions = options.logger ? {
        ...this.options,
        logger: new MparticleLogger(options.logger),
        logLevel: 'verbose',
      } : this.options;
      Mparticle.init(this.apiKey, mparticleOptions);
      this.mparticle = Mparticle.getInstance();
    }
  }

  async page(userId?: string, category?: string, name?: string, properties?: Properties): Promise<void> {
    this.mparticle.logPageView(name, properties);
  }

  async track(userId: string | undefined, { name, properties }: Event): Promise<void> {
    this.mparticle.logEvent(
      name,
      Mparticle.EventType.Other,
      { ...properties },
    );
  }
}

export default MparticlePlugin;
