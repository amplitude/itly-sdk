/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event,
  Properties,
  RequestLoggerPlugin,
  PluginLoadOptions,
  ResponseLogger,
  PluginCallOptions,
} from '@itly/sdk';

export type SegmentOptions = {};

export type SegmentCallback = (...args: any[]) => void;

export interface SegmentCallOptions extends PluginCallOptions {
  options?: {
    integrations?: Record<string, any>;
  } & Record<string, any>,
  callback?: SegmentCallback;
}
export interface SegmentAliasOptions extends SegmentCallOptions {}
export interface SegmentIdentifyOptions extends SegmentCallOptions {}
export interface SegmentGroupOptions extends SegmentCallOptions {}
export interface SegmentPageOptions extends SegmentCallOptions {}
export interface SegmentTrackOptions extends SegmentCallOptions {}

/**
 * Segment Browser Plugin for Iteratively SDK
 */
export class SegmentPlugin extends RequestLoggerPlugin {
  get segment(): any {
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
    super.load(options);
    if (!this.segment) {
      this.loadSegment();
      this.segment.load(this.writeKey, this.options);
    }
  }

  loadSegment() {
    // Segment (https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/)
    // @ts-ignore
    // eslint-disable-next-line
    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}();
  }

  alias(userId: string, previousId: string | undefined, options?: SegmentAliasOptions) {
    const { callback, options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    this.segment.alias(userId, previousId, segmentOptions, this.wrapCallback(responseLogger, callback));
  }

  identify(userId: string | undefined, properties?: Properties, options?: SegmentIdentifyOptions) {
    const { callback, options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('identify', `${userId}, ${JSON.stringify(properties)}`);
    if (userId) {
      this.segment.identify(userId, properties, segmentOptions, this.wrapCallback(responseLogger, callback));
    } else {
      this.segment.identify(properties, segmentOptions, this.wrapCallback(responseLogger, callback));
    }
  }

  group(userId: string | undefined, groupId: string, properties?: Properties, options?: SegmentGroupOptions) {
    const { callback, options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('group', `${userId}, ${groupId}, ${JSON.stringify(properties)}`);
    this.segment.group(groupId, properties, segmentOptions, this.wrapCallback(responseLogger, callback));
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties, options?: SegmentPageOptions) {
    const { callback, options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('page', `${userId}, ${category}, ${name}, ${JSON.stringify(properties)}`);
    this.segment.page(category, name, properties, segmentOptions, this.wrapCallback(responseLogger, callback));
  }

  track(userId: string | undefined, { name, properties }: Event, options?: SegmentTrackOptions) {
    const { callback, options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('track', `${userId}, ${name}, ${JSON.stringify(properties)}`);
    this.segment.track(name, properties, segmentOptions, this.wrapCallback(responseLogger, callback));
  }

  reset() {
    this.segment.reset();
  }

  private wrapCallback(responseLogger: ResponseLogger, callback: SegmentCallback | undefined) {
    return (...args: any[]) => {
      responseLogger.success(`done ${args}`);
      callback?.(...args);
    };
  }
}

export default SegmentPlugin;
