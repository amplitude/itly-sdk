/* eslint-disable no-unused-vars, class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import appboy from '@braze/web-sdk-core';
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions,
} from '@itly/sdk';

export type BrazeOptions = appboy.InitializationOptions;

type Appboy = {
  initialize: typeof appboy.initialize;
  openSession: typeof appboy.openSession;
  changeUser: typeof appboy.changeUser;
  getUser: typeof appboy.getUser;
  logCustomEvent: typeof appboy.logCustomEvent;
}

// https://js.appboycdn.com/web-sdk/latest/doc/classes/appboy.user.html
// https://www.braze.com/docs/api/objects_filters/user_attributes_object/
const identifyPredefinedAttributes: Record<string, (user: appboy.User, value: any) => boolean> = {
  first_name: (user, value) => user.setFirstName(value),
  last_name: (user, value) => user.setLastName(value),
  email: (user, value) => user.setEmail(value),
  gender: (user, value) => user.setGender(value),
  country: (user, value) => user.setCountry(value),
  home_city: (user, value) => user.setHomeCity(value),
  language: (user, value) => user.setLanguage(value),
  email_subscribe: (user, value) => user.setEmailNotificationSubscriptionType(value),
  push_subscribe: (user, value) => user.setPushNotificationSubscriptionType(value),
  phone: (user, value) => user.setPhoneNumber(value),
  image_url: (user, value) => user.setAvatarImageUrl(value),

  // (date of birth) String in format “YYYY-MM-DD”, e.g., 1980-12-21.
  dob: (user, value: string | null) => {
    let year: number | null = null;
    let month: number | null = null;
    let day: number | null = null;
    if (value) {
      const parts = value.split('-');
      year = +parts[0];
      month = +parts[1];
      day = +parts[2];
    }
    return user.setDateOfBirth(year, month, day);
  },
};

/**
 * Braze Browser Plugin for Iteratively SDK
 */
export class BrazePlugin extends RequestLoggerPlugin {
  get appboy(): Appboy | undefined {
    // eslint-disable-next-line no-restricted-globals
    const s: any = typeof self === 'object' && self.self === self && self;
    return s && s.appboy;
  }

  constructor(
    private readonly apiKey: string,
    private readonly options: BrazeOptions,
  ) {
    super('braze');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    if (!this.appboy) {
      // https://www.braze.com/docs/developer_guide/platform_integration_guides/web/initial_sdk_setup/#install-cdn
      // @ts-ignore
      // eslint-disable-next-line
      +function(a,p,P,b,y){a.appboy={};a.appboyQueue=[];for(var s="DeviceProperties Card Card.prototype.dismissCard Card.prototype.removeAllSubscriptions Card.prototype.removeSubscription Card.prototype.subscribeToClickedEvent Card.prototype.subscribeToDismissedEvent Banner CaptionedImage ClassicCard ControlCard ContentCards ContentCards.prototype.getUnviewedCardCount Feed Feed.prototype.getUnreadCardCount ControlMessage InAppMessage InAppMessage.SlideFrom InAppMessage.ClickAction InAppMessage.DismissType InAppMessage.OpenTarget InAppMessage.ImageStyle InAppMessage.Orientation InAppMessage.TextAlignment InAppMessage.CropType InAppMessage.prototype.closeMessage InAppMessage.prototype.removeAllSubscriptions InAppMessage.prototype.removeSubscription InAppMessage.prototype.subscribeToClickedEvent InAppMessage.prototype.subscribeToDismissedEvent FullScreenMessage ModalMessage HtmlMessage SlideUpMessage User User.Genders User.NotificationSubscriptionTypes User.prototype.addAlias User.prototype.addToCustomAttributeArray User.prototype.getUserId User.prototype.incrementCustomUserAttribute User.prototype.removeFromCustomAttributeArray User.prototype.setAvatarImageUrl User.prototype.setCountry User.prototype.setCustomLocationAttribute User.prototype.setCustomUserAttribute User.prototype.setDateOfBirth User.prototype.setEmail User.prototype.setEmailNotificationSubscriptionType User.prototype.setFirstName User.prototype.setGender User.prototype.setHomeCity User.prototype.setLanguage User.prototype.setLastKnownLocation User.prototype.setLastName User.prototype.setPhoneNumber User.prototype.setPushNotificationSubscriptionType InAppMessageButton InAppMessageButton.prototype.removeAllSubscriptions InAppMessageButton.prototype.removeSubscription InAppMessageButton.prototype.subscribeToClickedEvent display display.automaticallyShowNewInAppMessages display.destroyFeed display.hideContentCards display.showContentCards display.showFeed display.showInAppMessage display.toggleContentCards display.toggleFeed changeUser destroy getDeviceId initialize isPushBlocked isPushGranted isPushPermissionGranted isPushSupported logCardClick logCardDismissal logCardImpressions logContentCardsDisplayed logCustomEvent logFeedDisplayed logInAppMessageButtonClick logInAppMessageClick logInAppMessageHtmlClick logInAppMessageImpression logPurchase openSession registerAppboyPushMessages removeAllSubscriptions removeSubscription requestContentCardsRefresh requestFeedRefresh requestImmediateDataFlush resumeWebTracking setLogger stopWebTracking subscribeToContentCardsUpdates subscribeToFeedUpdates subscribeToInAppMessage subscribeToNewInAppMessages toggleAppboyLogging trackLocation unregisterAppboyPushMessages wipeData".split(" "),i=0;i<s.length;i++){for(var m=s[i],k=a.appboy,l=m.split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=(new Function("return function "+m.replace(/\./g,"_")+"(){window.appboyQueue.push(arguments); return true}"))()}window.appboy.getCachedContentCards=function(){return new window.appboy.ContentCards};window.appboy.getCachedFeed=function(){return new window.appboy.Feed};window.appboy.getUser=function(){return new window.appboy.User};(y=p.createElement(P)).type='text/javascript';y.src='https://js.appboycdn.com/web-sdk/3.2/appboy.min.js';y.async=1;(b=p.getElementsByTagName(P)[0]).parentNode.insertBefore(y,b)}(window,document,'script');
      this.appboy!.initialize(this.apiKey, this.options);
      this.appboy!.openSession();
    }
  }

  identify(userId: string | undefined, properties?: Properties) {
    if (userId) {
      this.appboy!.changeUser(userId);
    }
    if (properties != null) {
      const user = this.appboy!.getUser();
      for (const [key, value] of Object.entries(properties)) {
        const predefinedAttribute = identifyPredefinedAttributes[key];
        if (predefinedAttribute !== undefined) {
          predefinedAttribute(user, value);
        } else {
          user.setCustomUserAttribute(key, BrazePlugin.valueForAPI(value));
        }
      }
    }
  }

  track(userId: string | undefined, { name, properties }: Event) {
    if (userId) {
      this.appboy!.changeUser(userId);
    }
    if (properties == null) {
      this.appboy!.logCustomEvent(name);
    } else {
      const eventProperties = Object.fromEntries(
        Object.entries(properties).map(([key, value]) => [key, BrazePlugin.valueForAPI(value)]),
      );
      this.appboy!.logCustomEvent(name, eventProperties);
    }
  }

  private static valueForAPI(value: any): any {
    // https://www.braze.com/docs/api/objects_filters/user_attributes_object/
    // https://www.braze.com/docs/api/objects_filters/event_object/
    // API supports doesn't support objects and (non-string) arrays.
    return (value != null && typeof value === 'object') ? JSON.stringify(value) : value;
  }
}

export default BrazePlugin;
