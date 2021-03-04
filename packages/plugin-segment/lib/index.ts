/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event,
  AliasOptions,
  IdentifyOptions,
  GroupOptions,
  PageOptions,
  TrackOptions,
  Properties,
  RequestLoggerPlugin,
  PluginLoadOptions,
  ResponseLogger,
} from '@itly/sdk';

export type SegmentOptions = {};

export type SegmentCallback = (...args: any[]) => void;

export interface SegmentCallOptions {
  options?: {
    integrations?: Record<string, boolean>;
  },
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
      // Segment (https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/)
      // @ts-ignore
      // eslint-disable-next-line
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";}}();
      this.segment.load(this.writeKey, this.options);
    }
  }

  async alias(
    userId: string,
    previousId: string | undefined,
    options?: AliasOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentAliasOptions>(options);
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    return new Promise((resolve, reject) => {
      this.segment.alias(
        userId,
        previousId,
        segmentOptions,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  async identify(
    userId: string | undefined,
    properties?: Properties,
    options?: IdentifyOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentIdentifyOptions>(options);
    const responseLogger = this.logger!.logRequest('identify', `${userId}, ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      if (userId) {
        this.segment.identify(
          userId,
          properties,
          segmentOptions,
          this.wrapCallback(responseLogger, callback, resolve, reject),
        );
      } else {
        this.segment.identify(
          properties,
          segmentOptions,
          this.wrapCallback(responseLogger, callback, resolve, reject),
        );
      }
    });
  }

  async group(
    userId: string | undefined,
    groupId: string,
    properties?: Properties,
    options?: GroupOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentGroupOptions>(options);
    const responseLogger = this.logger!.logRequest('group', `${userId}, ${groupId}, ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      this.segment.group(
        groupId,
        properties,
        segmentOptions,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  async page(
    userId?: string,
    category?: string,
    name?: string,
    properties?: Properties,
    options?: PageOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentPageOptions>(options);
    const responseLogger = this.logger!.logRequest('page', `${userId}, ${category}, ${name}, ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      this.segment.page(
        category,
        name,
        properties,
        segmentOptions,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  async track(
    userId: string | undefined,
    { name, properties }: Event,
    options?: TrackOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentTrackOptions>(options);
    const responseLogger = this.logger!.logRequest('track', `${userId}, ${name}, ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      this.segment.track(
        name,
        properties,
        segmentOptions,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  reset() {
    this.segment.reset();
  }

  private wrapCallback(
    responseLogger: ResponseLogger,
    callback: SegmentCallback | undefined,
    resolve: (value?: void) => void,
    reject: (reason?: any) => void,
  ) {
    return (...args: any[]) => {
      try {
        if (args.length === 1 && args[0] instanceof Error) {
          responseLogger.error(args[0].toString());
          callback?.(...args);
          reject(args[0]);
        } else {
          responseLogger.success(JSON.stringify(args));
          callback?.(...args);
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    };
  }
}

export default SegmentPlugin;
