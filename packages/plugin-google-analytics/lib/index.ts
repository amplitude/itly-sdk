/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions, PluginCallOptions,
} from '@itly/sdk';

type GoogleAnalyticsOptions = {
  gtag?: Gtag.Gtag;
  measurementId: string;
}

export interface GoogleAnalyticsCallOptions extends PluginCallOptions { }
export interface GoogleAnalyticsPageOptions extends PluginCallOptions { }

export class GoogleAnalyticsPlugin extends RequestLoggerPlugin {
  private _gtag?: Gtag.Gtag;

  get gtag(): Gtag.Gtag {
    this._gtag = this._gtag || self.gtag;
    if (!this._gtag) throw new Error('No gtag provided to constructor, or available on window');
    return this._gtag;
  }

  constructor(private opts: GoogleAnalyticsOptions) {
    super('google-analytics');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    if (this.opts.gtag) {
      this._gtag = this.opts.gtag;
    } else if ('gtag' in self) {
      this._gtag = self.gtag;
    } else {
      this.initializeGtag(this.opts.measurementId);
    }
  }

  identify(userId: string | undefined, properties?: Properties | undefined) {
    this.gtag('config', this.opts.measurementId, { userId, ...properties });
  }

  track(userId: string | undefined, { name, properties }: Event, options?: GoogleAnalyticsCallOptions) {
    if (userId) { // On browser, userId will always be undefined
      this.identify(userId);
    }
    this.gtag('event', name, { ...properties, event_callback: options?.[this.id]?.callback });
    // TODO: look into if we need to stringify non-leaf values
  }

  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    options?: GoogleAnalyticsPageOptions,
  ) {
    if (userId) this.identify(userId);
    this.gtag('event', 'page_view', {
      page_title: name,
      page_path: self.location.href,
      event_category: category,
      send_to: this.opts.measurementId,
      event_callback: options?.[this.id]?.callback,
      ...properties,
    });
  }

  private initializeGtag(measurementId: string) {
    return new Promise((resolve) => {
      (self as any).dataLayer = (self as any).dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      self.gtag = function gtag() { (self as any).dataLayer.push(arguments); };
      self.gtag('js', new Date());
      self.gtag('config', measurementId);

      const $script = document.createElement('script');
      $script.setAttribute('async', 'async');
      $script.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
      $script.onload = resolve;
      document.head.appendChild($script);
    });
  }
}

export default GoogleAnalyticsPlugin;
