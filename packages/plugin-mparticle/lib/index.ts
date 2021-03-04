/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line max-classes-per-file
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions, Logger,
} from '@itly/sdk';

export type MparticleOptions = {
  isDevelopmentMode?: boolean,
};

class MparticleLogger {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  verbose(msg: string) {
    this.logger.debug(msg);
  }

  warning(msg: string) {
    this.logger.warn(msg);
  }

  error(msg: string) {
    this.logger.error(msg);
  }
}

/**
 * mParticle Browser Plugin for Iteratively SDK
 */
export class MparticlePlugin extends RequestLoggerPlugin {
  get mparticle(): any {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.mparticle;
  }

  constructor(
    private apiKey: string,
    private options: MparticleOptions = { },
  ) {
    super('mparticle');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    if (!this.mparticle) {
      const config = options.logger ? {
        ...this.options,
        logger: new MparticleLogger(options.logger),
        logLevel: 'verbose',
      } : this.options;

      // https://docs.mparticle.com/developers/sdk/web/getting-started/#add-the-sdk-snippet
      // @ts-ignore
      window.mParticle = {
        config,
      };
      // eslint-disable-next-line
      (
        // @ts-ignore
        // eslint-disable-next-line
        function(t){window.mParticle=window.mParticle||{};window.mParticle.EventType={Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.config.snippetVersion=2.2;window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};var e=["endSession","logError","logBaseEvent","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var o=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];e.forEach(function(t){window.mParticle[t]=n(t)});o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});function n(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var mp=document.createElement("script");mp.type="text/javascript";mp.async=true;mp.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(mp,c)}
      )(this.apiKey);
    }
  }

  async page(userId?: string, category?: string, name?: string, properties?: Properties): Promise<void> {
    this.mparticle.logPageView(name, properties);
  }

  async track(userId: string | undefined, { name, properties }: Event): Promise<void> {
    this.mparticle.logEvent(
      name,
      this.mparticle.EventType.Other,
      { ...properties },
    );
  }
}

export default MparticlePlugin;
