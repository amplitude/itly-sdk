/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, Properties, Plugin, Logger, PluginLoadOptions,
} from '@itly/sdk';

export type SnowplowOptions = {
  url: string;
  config?: {};
};

/**
 * Snowplow Browser Plugin for Iteratively SDK
 */
export class SnowplowPlugin extends Plugin {
  private logger: Logger | undefined;

  private get snowplow(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.snowplow;
  }

  constructor(
    readonly vendor: string,
    private options: SnowplowOptions,
  ) {
    super('snowplow');
  }

  load(options: PluginLoadOptions) {
    if (!this.snowplow) {
      // Snowplow (https://github.com/snowplow/snowplow/wiki/1-General-parameters-for-the-Javascript-tracker#21-loading-snowplowjs)
      // @ts-ignore
      // eslint-disable-next-line
      ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d1fc8wv8zag5ca.cloudfront.net/2.10.2/sp.js","snowplow"));
      this.snowplow('newTracker', 'itly', this.options.url, this.options.config);
    }
    this.logger = options.logger;
  }

  identify(userId: string | undefined, properties?: Properties) {
    this.snowplow('setUserId', userId);
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: page(request) ${id}: ${userId}, ${category}, ${name}, ${JSON.stringify(properties)}`);
    this.snowplow('trackPageView', name, undefined, undefined, undefined, (payload: unknown) => {
      this.logger!.debug(`${this.id}: page(response) ${id}: done: ${JSON.stringify(payload)}`);
    });
  }

  track(userId: string | undefined, event: Event) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: track(request) ${id}: ${userId}, ${JSON.stringify(event)}`);
    const schemaVer = event.version && event.version.replace(/\./g, '-');
    this.snowplow('trackSelfDescribingEvent', {
      schema: `iglu:${this.vendor}/${event.name}/jsonschema/${schemaVer}`,
      data: event.properties,
    }, undefined, undefined, (payload: unknown) => {
      this.logger!.debug(`${this.id}: track(response) ${id}: done: ${JSON.stringify(payload)}`);
    });
  }
}

export default SnowplowPlugin;
