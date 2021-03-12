/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, IdentifyOptions, TrackOptions, Properties, RequestLoggerPlugin, PluginLoadOptions, ResponseLogger,
} from '@itly/sdk';

export type MixpanelOptions = {};

export type MixpanelCallback = (...args: any[]) => void;

export interface MixpanelCallOptions {
  callback?: MixpanelCallback;
}
export interface MixpanelAliasOptions extends MixpanelCallOptions {}
export interface MixpanelIdentifyOptions extends MixpanelCallOptions {}
export interface MixpanelGroupOptions extends MixpanelCallOptions {}
export interface MixpanelPageOptions extends MixpanelCallOptions {}
export interface MixpanelTrackOptions extends MixpanelCallOptions {}

/**
 * Mixpanel Browser Plugin for Iteratively SDK
 */
export class MixpanelPlugin extends RequestLoggerPlugin {
  get mixpanel(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.mixpanel;
  }

  constructor(
    private apiKey: string,
    private options?: MixpanelOptions,
  ) {
    super('mixpanel');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    if (!this.mixpanel) {
      // Mixpanel (https://developer.mixpanel.com/docs/javascript)
      // @ts-ignore
      // eslint-disable-next-line
      (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
      this.mixpanel.init(this.apiKey, this.options);
    }
  }

  async alias(
    userId: string,
    previousId: string | undefined,
  ) {
    this.mixpanel.alias(userId, previousId);
  }

  async identify(
    userId: string | undefined,
    properties: Properties | undefined,
    options?: IdentifyOptions,
  ) {
    const { callback } = this.getPluginCallOptions<MixpanelIdentifyOptions>(options);

    if (userId) {
      this.mixpanel.identify(userId);
    }

    if (properties) {
      return undefined;
    }

    const responseLogger = this.logger!.logRequest('identify', `${userId}, ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      this.mixpanel.people.set(properties, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async track(
    userId: string | undefined,
    { name, properties }: Event,
    options?: TrackOptions,
  ) {
    const { callback } = this.getPluginCallOptions<MixpanelTrackOptions>(options);
    const responseLogger = this.logger!.logRequest('track', `${userId}, ${name}, ${JSON.stringify(properties)}`);
    return new Promise((resolve, reject) => {
      this.mixpanel.track(name, { ...properties }, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  reset() {
    this.mixpanel.reset();
  }

  private wrapCallback(
    responseLogger: ResponseLogger,
    callback: MixpanelCallback | undefined,
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

export default MixpanelPlugin;
