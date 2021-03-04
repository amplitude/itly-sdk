/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint-disable no-restricted-syntax, no-prototype-builtins, no-continue */
import {
  Event, IdentifyOptions, TrackOptions, Properties, RequestLoggerPlugin, PluginLoadOptions, ResponseLogger,
} from '@itly/sdk';

export type AmplitudeOptions = {};

export type AmplitudeCallback = (statusCode: number, responseBody: string, details: unknown) => void;

export interface AmplitudeCallOptions {
  callback?: AmplitudeCallback;
}
export interface AmplitudeAliasOptions extends AmplitudeCallOptions {}
export interface AmplitudeIdentifyOptions extends AmplitudeCallOptions {}
export interface AmplitudeGroupOptions extends AmplitudeCallOptions {}
export interface AmplitudePageOptions extends AmplitudeCallOptions {}
export interface AmplitudeTrackOptions extends AmplitudeCallOptions {}

/**
 * Amplitude Browser Plugin for Iteratively SDK
 */
export class AmplitudePlugin extends RequestLoggerPlugin {
  get amplitude(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.amplitude;
  }

  constructor(
    private apiKey: string,
    private options?: AmplitudeOptions,
  ) {
    super('amplitude');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    if (!this.amplitude) {
      // Amplitude (https://help.amplitude.com/hc/en-us/articles/115001361248-JavaScript-SDK-Installation)
      // @ts-ignore
      // eslint-disable-next-line
      (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script");r.type="text/javascript";r.integrity="sha384-girahbTbYZ9tT03PWWj0mEVgyxtZoyDF9KVZdL+R53PP5wCY0PiVUKq0jeRlMx9M";r.crossOrigin="anonymous";r.async=true;r.src="https://cdn.amplitude.com/libs/amplitude-7.2.1-min.gz.js";r.onload=function(){if(!e.amplitude.runQueuedFunctions){console.log("[Amplitude] Error: could not load SDK")}};var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i);function s(e,t){e.prototype[t]=function(){this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}var o=function(){this._q=[];return this};var a=["add","append","clearAll","prepend","set","setOnce","unset"];for(var c=0;c<a.length;c++){s(o,a[c])}n.Identify=o;var u=function(){this._q=[];return this};var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"];for(var p=0;p<l.length;p++){s(u,l[p])}n.Revenue=u;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"];function v(e){function t(t){e[t]=function(){e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){e=(!e||e.length===0?"$default_instance":e).toLowerCase();if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]};e.amplitude=n})(window,document);
      this.amplitude.getInstance().init(this.apiKey, undefined, this.options);
    }
  }

  async identify(userId: string | undefined, properties?: Properties, options?: IdentifyOptions): Promise<void> {
    const responseLogger = this.logger!.logRequest('identify', `${userId} ${JSON.stringify(properties)}`);

    if (userId) {
      this.amplitude.getInstance().setUserId(userId);
    }

    if (!properties) {
      return undefined;
    }

    const identifyObject = new this.amplitude.Identify();
    for (const p in properties) {
      if (!properties.hasOwnProperty(p)) {
        continue;
      }

      identifyObject.set(p, (properties as any)[p]);
    }

    const { callback } = this.getPluginCallOptions<AmplitudeIdentifyOptions>(options);
    return new Promise((resolve, reject) => {
      this.amplitude.getInstance().identify(
        identifyObject,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  async track(userId: string | undefined, { name, properties }: Event, options?: TrackOptions): Promise<void> {
    const { callback } = this.getPluginCallOptions<AmplitudeIdentifyOptions>(options);
    const responseLogger = this.logger!.logRequest('track', `${userId} ${name} ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      this.amplitude.getInstance().logEvent(
        name,
        properties,
        this.wrapCallback(responseLogger, callback, resolve, reject),
      );
    });
  }

  reset() {
    this.amplitude.getInstance().setUserId(null);
    this.amplitude.getInstance().regenerateDeviceId();
  }

  private wrapCallback(
    responseLogger: ResponseLogger,
    callback: AmplitudeCallback | undefined,
    resolve: (value?: void) => void,
    reject: (reason?: any) => void,
  ) {
    return (statusCode: number, responseBody: string, details: unknown) => {
      try {
        if (statusCode >= 200 && statusCode < 300) {
          responseLogger.success(responseBody);
        } else {
          responseLogger.error(`${statusCode}. ${responseBody}\n${JSON.stringify(details)}`);
        }
        callback?.(statusCode, responseBody, details);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
  }
}

export default AmplitudePlugin;
