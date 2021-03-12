/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, PageOptions, TrackOptions, Properties, RequestLoggerPlugin, PluginLoadOptions, ResponseLogger,
} from '@itly/sdk';

export type SnowplowOptions = {
  url: string;
  config?: {};
};

export interface SnowplowContext {
  schema: string;
  data: { [key: string]: any };
}

export type SnowplowCallback = (...args: any[]) => void;

export interface SnowplowCallOptions {}
export interface SnowplowAliasOptions extends SnowplowCallOptions {}
export interface SnowplowIdentifyOptions extends SnowplowCallOptions {}
export interface SnowplowGroupOptions extends SnowplowCallOptions {}
export interface SnowplowPageOptions extends SnowplowCallOptions {
  callback?: SnowplowCallback;
  contexts?: SnowplowContext[];
}
export interface SnowplowTrackOptions extends SnowplowCallOptions {
  callback?: SnowplowCallback;
  contexts?: SnowplowContext[];
}

/**
 * Snowplow Browser Plugin for Iteratively SDK
 */
export class SnowplowPlugin extends RequestLoggerPlugin {
  get snowplow(): any {
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
    super.load(options);
    if (!this.snowplow) {
      // Snowplow (https://github.com/snowplow/snowplow/wiki/1-General-parameters-for-the-Javascript-tracker#21-loading-snowplowjs)
      // @ts-ignore
      // eslint-disable-next-line
      ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//d1fc8wv8zag5ca.cloudfront.net/2.10.2/sp.js","snowplow"));
      this.snowplow('newTracker', 'itly', this.options.url, this.options.config);
    }
  }

  async identify(userId: string | undefined, properties?: Properties) {
    this.snowplow('setUserId', userId);
  }

  async page(
    userId?: string,
    category?: string,
    name?: string,
    properties?: Properties,
    options?: PageOptions,
  ) {
    const { callback, contexts } = this.getPluginCallOptions<SnowplowPageOptions>(options);
    const responseLogger = this.logger!.logRequest(
      'page',
      `${userId}, ${category}, ${name}, ${this.toJsonStr(properties, contexts)}`,
    );
    return new Promise((resolve, reject) => {
      this.snowplow(
        'trackPageView',
        name,
        undefined,
        contexts,
        undefined,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  async track(
    userId: string | undefined,
    { name, properties, version }: Event,
    options?: TrackOptions,
  ) {
    const schemaVer = version && version.replace(/\./g, '-');
    const { callback, contexts } = this.getPluginCallOptions<SnowplowTrackOptions>(options);
    const responseLogger = this.logger!.logRequest(
      'track',
      `${userId}, ${name}, ${this.toJsonStr(properties, contexts)}`,
    );
    return new Promise((resolve, reject) => {
      this.snowplow(
        'trackSelfDescribingEvent',
        {
          schema: `iglu:${this.vendor}/${name}/jsonschema/${schemaVer}`,
          data: properties,
        },
        contexts,
        undefined,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  private toJsonStr = (properties?: Properties, contexts?: SnowplowContext[]) =>
    `${JSON.stringify(properties)}${contexts ? `, ${JSON.stringify(contexts)}` : ''}`;

  private wrapCallback(
    responseLogger: ResponseLogger,
    callback: SnowplowCallback | undefined,
    resolve: () => void,
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

export default SnowplowPlugin;
