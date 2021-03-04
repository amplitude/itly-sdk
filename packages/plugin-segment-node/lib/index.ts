/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  RequestLoggerPlugin,
  PluginLoadOptions,
  Event,
  AliasOptions,
  IdentifyOptions,
  GroupOptions,
  PageOptions,
  TrackOptions,
  Properties,
  ResponseLogger,
} from '@itly/sdk';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

export type SegmentCallback = (err: Error | undefined) => void;

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
 * Segment Node Plugin for Iteratively SDK
 */
export class SegmentPlugin extends RequestLoggerPlugin {
  private segment?: Segment;

  constructor(
    private writeKey: string,
    private options?: SegmentOptions,
  ) {
    super('segment');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    this.segment = new Segment(this.writeKey, this.options);
  }

  async alias(
    userId: string,
    previousId: string,
    options?: AliasOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentAliasOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      previousId,
    };
    const responseLogger = this.logger!.logRequest('alias', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.segment!.alias(payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async identify(
    userId: string,
    properties: Properties | undefined,
    options?: IdentifyOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentIdentifyOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      traits: { ...properties },
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.segment!.identify(payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async group(
    userId: string,
    groupId: string,
    properties: Properties | undefined,
    options?: GroupOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentGroupOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      groupId,
      traits: properties,
    };
    const responseLogger = this.logger!.logRequest('group', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.segment!.group(payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async page(
    userId: string,
    category: string,
    name: string,
    properties: Properties | undefined,
    options?: PageOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentPageOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      category,
      name,
      properties,
    };
    const responseLogger = this.logger!.logRequest('page', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.segment!.page(payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  async track(
    userId: string,
    { name, properties }: Event,
    options?: TrackOptions,
  ): Promise<void> {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentTrackOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      event: name,
      properties: { ...properties },
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.segment!.track(payload, this.wrapCallback(responseLogger, callback, resolve, reject));
    });
  }

  flush() {
    return new Promise<void>((resolve, reject) => {
      this.segment!.flush((err: Error) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  private wrapCallback(
    responseLogger: ResponseLogger,
    callback: SegmentCallback | undefined,
    resolve: (value?: void) => void,
    reject: (reason?: any) => void,
  ) {
    return (err: Error | undefined) => {
      try {
        if (err == null) {
          responseLogger.success('success');
          callback?.(undefined);
          resolve();
        } else {
          responseLogger.error(err.toString());
          callback?.(err);
          reject(err);
        }
      } catch (e) {
        reject(err);
      }
    };
  }
}

export default SegmentPlugin;
