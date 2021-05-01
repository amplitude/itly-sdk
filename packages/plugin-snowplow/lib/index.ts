/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions, ResponseLogger, PluginCallOptions,
} from '@itly/sdk';

export type SnowplowOptions = {
  url: string;
  config?: {};
  /**
   * Will force creation of a new dedicated tracker for Itly events.
   * If you do not have a pre-existing Snowplow tracker we will create one for you by default.
   * Set to true if you have an existing tracker you want to keep seperate from Itly events.
   * @default false
   */
  forceNewTracker?: boolean;
  /**
   * If a new tracker is created, this will be it's name
   * @default 'itly'
   */
  newTrackerName?: string;
  /**
   * The name(s) of the trackers that events should be sent to
   * e.g. 'itly', 'itly;tracker2'
   * https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-trackers/javascript-tracker/javascript-tracker-v2/tracker-setup/managing-multiple-trackers/
   * @default undefined - events are sent to all trackers
   */
  trackerNameFilter?: string;
};

export interface SnowplowContext {
  schema: string;
  data: { [key: string]: any };
}

export type SnowplowCallback = (...args: any[]) => void;

export interface SnowplowCallOptions extends PluginCallOptions {}
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

type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Partial<Pick<T, K>>;

/**
 * Snowplow Browser Plugin for Iteratively SDK
 */
export class SnowplowPlugin extends RequestLoggerPlugin {
  private readonly options: RequiredExcept<SnowplowOptions, 'config' | 'trackerNameFilter'> = {
    url: '',
    forceNewTracker: false,
    newTrackerName: 'itly',
    trackerNameFilter: undefined,
  };

  private readonly trackerNameFilter: string;

  get snowplow(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.snowplow;
  }

  constructor(
    readonly vendor: string,
    snowplowOptions: SnowplowOptions,
  ) {
    super('snowplow');
    // apply user override options
    this.options = { ...this.options, ...snowplowOptions };
    // create tag for trackers to send events to e.g. ':itly', ':itly;tracker2', ''
    this.trackerNameFilter = this.options.trackerNameFilter ? `:${this.options.trackerNameFilter}` : '';
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    const wasSnowplowAlreadyLoaded = !!this.snowplow;
    if (!wasSnowplowAlreadyLoaded) {
      // Snowplow (https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/javascript-tracker/web-quick-start-guide/)
      // @ts-ignore
      // eslint-disable-next-line
      ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//cdn.jsdelivr.net/gh/snowplow/sp-js-assets@2.17.3/sp.js","snowplow"));
    }
    if (!wasSnowplowAlreadyLoaded || this.options.forceNewTracker) {
      this.snowplow('newTracker', this.options.newTrackerName, this.options.url, this.options.config);
    }
  }

  identify(userId: string | undefined, properties?: Properties) {
    this.snowplow(`setUserId${this.trackerNameFilter}`, userId);
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties, options?: SnowplowPageOptions) {
    const { callback, contexts } = options ?? {};
    const responseLogger = this.logger.logRequest(
      'page',
      `${userId}, ${category}, ${name}, ${this.toJsonStr(properties, contexts)}`,
    );
    this.snowplow(`trackPageView${this.trackerNameFilter}`, name, undefined, contexts, undefined, this.wrapCallback(responseLogger, callback));
  }

  track(userId: string | undefined, { name, properties, version }: Event, options?: SnowplowTrackOptions) {
    const schemaVer = version && version.replace(/\./g, '-');
    const { callback, contexts } = options ?? {};
    const responseLogger = this.logger.logRequest(
      'track',
      `${userId}, ${name}, ${this.toJsonStr(properties, contexts)}`,
    );
    this.snowplow(`trackSelfDescribingEvent${this.trackerNameFilter}`, {
      schema: `iglu:${this.vendor}/${name}/jsonschema/${schemaVer}`,
      data: properties,
    }, contexts, undefined, this.wrapCallback(responseLogger, callback));
  }

  private toJsonStr = (properties?: Properties, contexts?: SnowplowContext[]) =>
    `${JSON.stringify(properties)}${contexts ? `, ${JSON.stringify(contexts)}` : ''}`;

  private wrapCallback(responseLogger: ResponseLogger, callback: SnowplowCallback | undefined) {
    return (...args: any[]) => {
      responseLogger.success(`done: ${JSON.stringify(args)}`);
      callback?.(...args);
    };
  }
}

export default SnowplowPlugin;
