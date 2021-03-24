/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions,
} from '@itly/sdk';
import Tracker from '@snowplow/react-native-tracker';

export type SnowplowOptions = {
  endpoint: string,
  namespace: string,
  appId: string,

  method?: string,
  protocol?: string,
  base64Encoded?: boolean,
  platformContext?: boolean,
  applicationContext?: boolean,
  lifecycleEvents?: boolean,
  screenContext?: boolean,
  sessionContext?: boolean,
  foregroundTimeout?: number,
  backgroundTimeout?: number,
  checkInterval?: number,
  installTracking?: boolean,
};

export interface SnowplowContext {
  schema: string;
  data: { [key: string]: any };
}

export interface SnowplowCallOptions {}
export interface SnowplowAliasOptions extends SnowplowCallOptions {}
export interface SnowplowIdentifyOptions extends SnowplowCallOptions {}
export interface SnowplowGroupOptions extends SnowplowCallOptions {}
export interface SnowplowPageOptions extends SnowplowCallOptions {
  contexts?: SnowplowContext[];
}
export interface SnowplowTrackOptions extends SnowplowCallOptions {
  contexts?: SnowplowContext[];
}

/**
 * Snowplow React Native Plugin for Iteratively SDK
 */
export class SnowplowPlugin extends RequestLoggerPlugin {
  private initializePromise: Promise<void> | undefined;

  constructor(
    private readonly vendor: string,
    private readonly options: SnowplowOptions,
  ) {
    super('snowplow');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    this.initializePromise = Tracker.initialize(this.options);
  }

  identify(userId: string | undefined, properties?: Properties) {
    this.initializePromise!.then(() =>
      Tracker.setSubjectData({ userId }));
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties, options?: SnowplowPageOptions) {
    const { contexts } = options ?? {};
    this.initializePromise!.then(() =>
      Tracker.trackScreenViewEvent({
        screenName: name,
        screenType: category,
      }, contexts));
  }

  track(userId: string | undefined, { name, properties, version }: Event, options?: SnowplowTrackOptions) {
    const schemaVer = version && version.replace(/\./g, '-');
    const { contexts } = options ?? {};
    this.initializePromise!.then(() =>
      Tracker.trackSelfDescribingEvent({
        schema: `iglu:${this.vendor}/${name}/jsonschema/${schemaVer}`,
        data: properties,
      }, contexts));
  }

  reset() {
    this.initializePromise!.then(() =>
      Tracker.setSubjectData({ userId: null }));
  }
}

export default SnowplowPlugin;
