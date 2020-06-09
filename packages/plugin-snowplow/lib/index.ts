
/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  ItlyOptions, ItlyEvent, ItlyProperties, ItlyPluginBase,
} from '@itly/sdk-core';

export type SnowplowOptions = {
  url: string;
};

export default class SnowplowBrowserPlugin extends ItlyPluginBase {
  static ID: string = 'snowplow';

  private get snowplow(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.snowplow;
  }

  id = () => SnowplowBrowserPlugin.ID;

  constructor(readonly vendor: string, snowplowOptions?: SnowplowOptions) {
    super();
    if (!this.snowplow) {
      // Snowplow (https://github.com/snowplow/snowplow/wiki/1-General-parameters-for-the-Javascript-tracker#21-loading-snowplowjs)
      // @ts-ignore
      // eslint-disable-next-line
      ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d1fc8wv8zag5ca.cloudfront.net/2.10.2/sp.js","snowplow"));
    }
    this.snowplow(
      'newTracker',
      'itly',
      snowplowOptions && snowplowOptions.url,
      snowplowOptions,
    );
  }

  identify(userId: string | undefined, properties?: ItlyProperties) {
    this.snowplow('setUserId', userId);
  }

  page(userId?: string, category?: string, name?: string, properties?: ItlyProperties) {
    this.snowplow('trackPageView', name);
  }

  track(userId: string | undefined, event: ItlyEvent) {
    this.snowplow('trackSelfDescribingEvent', {
      schema: `iglu:${this.vendor}/${event.id}/jsonschema/${event.version}`,
      data: event.properties,
    });
  }
}
