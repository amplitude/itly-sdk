/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import {
  Options, Event, Properties, PluginBase,
} from '@itly/sdk';
import Mparticle from '@itly/mparticle-web-sdk';

export type MparticleOptions = {
  isDevelopmentMode?: boolean,
};

export default class MparticleBrowserPlugin extends PluginBase {
  static ID: string = 'mparticle';

  private $itly = 'audit';

  private mparticle?: any;

  constructor(
    private apiKey: string,
    private options: MparticleOptions = { },
  ) {
    super();
  }

  id = () => MparticleBrowserPlugin.ID;

  load() {
    this.mparticle = Mparticle.getInstance();
    try {
      // validates that mparticle instance is initialized
      this.mparticle.getDeviceId();
    } catch {
      Mparticle.init(this.apiKey, this.options);
      this.mparticle = Mparticle.getInstance();
    }
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties) {
    this.mparticle.logPageView(name, properties);
  }

  track(userId: string | undefined, event: Event) {
    const meta = event.metadata?.[MparticleBrowserPlugin.ID];
    this.mparticle.logEvent(
      event.name,
      meta?.eventType || Mparticle.EventType.Other,
      {
        $itly: this.$itly,
        ...event.properties,
      },
      meta?.customFlags,
    );
  }
}
