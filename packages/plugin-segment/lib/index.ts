/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, Properties, Plugin, Logger, PluginLoadOptions,
} from '@itly/sdk';

export type SegmentOptions = {};

/**
 * Segment Browser Plugin for Iteratively SDK
 */
export class SegmentPlugin extends Plugin {
  private logger: Logger | undefined;

  private get segment(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.analytics;
  }

  constructor(
    private writeKey: string,
    private options?: SegmentOptions,
  ) {
    super('segment');
  }

  load(options: PluginLoadOptions) {
    if (!this.segment) {
      // Segment (https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/)
      // @ts-ignore
      // eslint-disable-next-line
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}();
      this.segment.load(this.writeKey, this.options);
    }
    this.logger = options.logger;
  }

  alias(userId: string, previousId: string | undefined) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: alias(request) ${id}: ${userId}, ${previousId}`);
    this.segment.alias(userId, previousId, undefined, (...names: any[]) => {
      this.logger!.debug(`${this.id}: alias(response) ${id}: done ${names}`);
    });
  }

  identify(userId: string | undefined, properties?: Properties) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: identify(request) ${id}: ${userId}, ${JSON.stringify(properties)}`);
    this.segment.identify(userId, properties, undefined, () => {
      this.logger!.debug(`${this.id}: identify(response) ${id}: done`);
    });
  }

  group(userId: string | undefined, groupId: string, properties?: Properties) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: group(request) ${id}: ${groupId}, ${JSON.stringify(properties)}`);
    this.segment.group(groupId, properties, undefined, () => {
      this.logger!.debug(`${this.id}: group(response) ${id}: done`);
    });
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: page(request) ${id}: ${userId}, ${category}, ${name}, ${JSON.stringify(properties)}`);
    this.segment.page(category, name, properties, undefined, () => {
      this.logger!.debug(`${this.id}: page(response) ${id}: done`);
    });
  }

  track(userId: string | undefined, event: Event) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: track(request) ${id}: ${userId}, ${JSON.stringify(event)}`);
    this.segment.track(event.name, event.properties, undefined, () => {
      this.logger!.debug(`${this.id}: track(response) ${id}: done`);
    });
  }

  reset() {
    this.segment.reset();
  }
}

export default SegmentPlugin;
