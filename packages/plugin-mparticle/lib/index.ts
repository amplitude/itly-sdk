/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Options, Event, Properties, PluginBase,
} from '@itly/sdk';
import Mparticle from '@itly/mparticle-web-sdk';

export type MparticleOptions = {
  isDevelopmentMode?: boolean,
  requestConfig?: boolean,
};

export default class MparticleBrowserPlugin extends PluginBase {
  static ID: string = 'mparticle';

  private mparticle?: any;

  constructor(
    private apiKey: string,
    private options: MparticleOptions = { },
  ) {
    super();
  }

  id = () => MparticleBrowserPlugin.ID;

  load() {
    this.mparticle = Mparticle.init(this.apiKey, this.options);
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties) {
    this.mparticle.logPageView(name, properties);
  }

  track(userId: string | undefined, event: Event) {
    const meta = event.metadata?.mparticle;
    this.mparticle.logEvent(
      event.name,
      meta?.eventType || Mparticle.EventType.Other,
      event.properties,
      meta?.customFlags,
    );
  }
}
