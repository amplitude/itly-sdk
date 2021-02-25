/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  RequestLoggerPlugin, PluginLoadOptions, Event, EventOptions, Properties, EventMetadata,
} from '@itly/sdk';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

export type SegmentCallback = (err: Error | undefined) => void;

/**
 * Segment specific metadata
 * https://segment.com/docs/connections/sources/catalog/libraries/server/node/#selecting-destinations
 */
export interface SegmentMetadata {
  options?: {
    integrations?: Record<string, boolean>;
  },
  callback?: SegmentCallback;
}

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

  alias(userId: string, previousId: string, options?: EventOptions) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    const payload = {
      ...segmentFields,
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

  identify(userId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    const payload = {
      ...segmentFields,
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

  group(userId: string, groupId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    const payload = {
      ...segmentFields,
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
    options?: EventOptions,
  ) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    const payload = {
      ...segmentFields,
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

  track(userId: string, { name, properties, metadata }: Event) {
    const { callback, options } = this.getSegmentMetadata(metadata);
    const payload = {
      ...options,
      userId,
      event: name,
      properties: { ...properties },
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

  private getSegmentMetadata(metadata?: EventMetadata): Partial<SegmentMetadata> {
    return this.getPluginMetadata<SegmentMetadata>(metadata);
  }
}

export default SegmentPlugin;
