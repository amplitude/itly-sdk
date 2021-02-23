/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, EventOptions, Properties, EventMetadata,
} from '@itly/sdk';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

export type SegmentCallback = (err: Error) => void;

export interface SegmentMetadata {
  options?: {
    integrations?: Record<string, boolean>;
  },
  callback?: SegmentCallback;
}

/**
 * Segment Node Plugin for Iteratively SDK
 */
export class SegmentPlugin extends Plugin {
  private segment?: Segment;

  constructor(
    private writeKey: string,
    private options?: SegmentOptions,
  ) {
    super('segment');
  }

  load() {
    this.segment = new Segment(this.writeKey, this.options);
  }

  alias(userId: string, previousId: string, options?: EventOptions) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    this.segment!.alias({
      ...segmentFields,
      userId,
      previousId,
    }, callback);
  }

  identify(userId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    this.segment!.identify({
      ...segmentFields,
      userId,
      traits: { ...properties },
    }, callback);
  }

  group(userId: string, groupId: string, properties: Properties | undefined, options?: EventOptions) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    this.segment!.group({
      ...segmentFields,
      userId,
      groupId,
      traits: properties,
    }, callback);
  }

  page(
    userId: string,
    category: string,
    name: string,
    properties: Properties | undefined,
    options?: EventOptions,
  ) {
    const { callback, options: segmentFields } = this.getSegmentMetadata(options?.metadata);
    this.segment!.page({
      ...segmentFields,
      userId,
      category,
      name,
      properties,
    }, callback);
  }

  track(userId: string, { name, properties, metadata }: Event) {
    const { callback, options } = this.getSegmentMetadata(metadata);
    this.segment!.track({
      ...options,
      userId,
      event: name,
      properties: { ...properties },
    }, callback);
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

  private getSegmentMetadata(metadata?: EventMetadata): SegmentMetadata {
    return this.getPluginMetadata(metadata) as SegmentMetadata;
  }
}

export default SegmentPlugin;
