/* eslint-disable no-unused-vars, class-methods-use-this */
import analytics, { Analytics, JsonMap } from '@segment/analytics-react-native';
import {
  Event, Properties, RequestLoggerPlugin, PluginLoadOptions, PluginCallOptions,
} from '@itly/sdk';

export type SegmentOptions = Analytics.Configuration;

export interface SegmentCallOptions extends PluginCallOptions {
  options?: {
    integrations?: { [key: string]: boolean };
  } & JsonMap,
}
export interface SegmentAliasOptions extends SegmentCallOptions {}
export interface SegmentIdentifyOptions extends SegmentCallOptions {}
export interface SegmentGroupOptions extends SegmentCallOptions {}
export interface SegmentPageOptions extends SegmentCallOptions {}
export interface SegmentTrackOptions extends SegmentCallOptions {}

/**
 * Segment React Native Plugin for Iteratively SDK
 */
export class SegmentPlugin extends RequestLoggerPlugin {
  constructor(
    private writeKey: string,
    private readonly options?: SegmentOptions,
  ) {
    super('segment');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    analytics.setup(this.writeKey, this.options);
  }

  async alias(userId: string, previousId: string | undefined, options?: SegmentAliasOptions) {
    const { options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    await analytics.alias(userId, segmentOptions);
    responseLogger.success('done');
  }

  async identify(userId: string | undefined, properties: Properties | undefined, options?: SegmentIdentifyOptions) {
    const { options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('identify', `${userId}, ${JSON.stringify(properties)}`);
    await analytics.identify(userId != null ? userId : null, properties, segmentOptions);
    responseLogger.success('done');
  }

  async group(userId: string | undefined, groupId: string, properties?: Properties, options?: SegmentGroupOptions) {
    const { options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('group', `${userId}, ${groupId}, ${JSON.stringify(properties)}`);
    await analytics.group(groupId, properties, segmentOptions);
    responseLogger.success('done');
  }

  async page(
    userId: string | undefined,
    category: string | undefined,
    name: string,
    properties?: Properties,
    options?: SegmentPageOptions,
  ) {
    const { options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('page', `${userId}, ${category}, ${name}, ${JSON.stringify(properties)}`);
    await analytics.screen(name, properties, segmentOptions);
    responseLogger.success('done');
  }

  async track(userId: string | undefined, { name, properties }: Event, options?: SegmentTrackOptions) {
    const { options: segmentOptions } = options ?? {};
    const responseLogger = this.logger!.logRequest('track', `${userId}, ${name}, ${JSON.stringify(properties)}`);
    await analytics.track(name, properties, segmentOptions);
    responseLogger.success('done');
  }

  async reset() {
    await analytics.reset();
  }

  async flush() {
    await analytics.flush();
  }
}

export default SegmentPlugin;
