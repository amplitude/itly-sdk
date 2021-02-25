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

  alias(userId: string, previousId: string, options?: AliasOptions) {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentAliasOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      previousId,
    };
    const responseLogger = this.logger!.logRequest('alias', JSON.stringify(payload));
    this.segment!.alias(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  identify(userId: string, properties: Properties | undefined, options?: IdentifyOptions) {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentIdentifyOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      traits: properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    this.segment!.identify(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  group(userId: string, groupId: string, properties: Properties | undefined, options?: GroupOptions) {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentGroupOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      groupId,
      traits: properties,
    };
    const responseLogger = this.logger!.logRequest('group', JSON.stringify(payload));
    this.segment!.group(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  page(
    userId: string,
    category: string,
    name: string,
    properties: Properties | undefined,
    options?: PageOptions,
  ) {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentPageOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      category,
      name,
      properties,
    };
    const responseLogger = this.logger!.logRequest('page', JSON.stringify(payload));
    this.segment!.page(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
    });
  }

  track(userId: string, { name, properties }: Event, options?: TrackOptions) {
    const { callback, options: segmentOptions } = this.getPluginCallOptions<SegmentTrackOptions>(options);
    const payload = {
      ...segmentOptions,
      userId,
      event: name,
      properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    this.segment!.track(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
      callback?.(err);
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
}

export default SegmentPlugin;
