/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Options, Event, Properties, PluginBase,
} from '@itly/sdk';

export type SegmentOptions = {};

export default class SegmentBrowserPlugin extends PluginBase {
  static ID: string = 'segment';

  id = () => SegmentBrowserPlugin.ID;

  private get segment(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.analytics;
  }

  constructor(
    private writeKey: string,
    private options?: SegmentOptions,
  ) {
    super();
  }

  load() {
    if (!this.segment) {
      // Segment (https://segment.com/docs/sources/website/analytics.js/quickstart/)
      // @ts-ignore
      // eslint-disable-next-line
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize){if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}}();
    }
    this.segment.load(this.writeKey, this.options);
  }

  alias(userId: string, previousId: string | undefined) {
    this.segment.alias({ userId, previousId });
  }

  identify(userId: string | undefined, properties?: Properties) {
    if (userId) {
      this.segment.identify(userId, properties);
    } else {
      this.segment.identify(properties);
    }
  }

  group(userId: string | undefined, groupId: string, properties?: Properties) {
    this.segment.group(groupId, properties);
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties) {
    this.segment.page(category, name, properties);
  }

  track(userId: string | undefined, event: Event) {
    this.segment.track(
      event.name,
      event.properties,
    );
  }

  reset() {
    this.segment.reset();
  }
}
