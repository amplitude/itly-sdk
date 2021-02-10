/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, EventOptions, Properties,
} from '@itly/sdk';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

export interface SegmentMetadata {
  integrations: Record<string, boolean>;
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
    const metadata = (options?.metadata?.[this.id] ?? {}) as Partial<SegmentMetadata>;
    this.segment!.alias({
      ...metadata,
      userId,
      previousId,
    });
  }

  identify(userId: string, properties: Properties | undefined, options?: EventOptions) {
    const metadata = (options?.metadata?.[this.id] ?? {}) as Partial<SegmentMetadata>;
    this.segment!.identify({
      ...metadata,
      userId,
      traits: { ...properties },
    });
  }

  group(userId: string, groupId: string, properties: Properties | undefined, options?: EventOptions) {
    const metadata = (options?.metadata?.[this.id] ?? {}) as Partial<SegmentMetadata>;
    this.segment!.group({
      ...metadata,
      userId,
      groupId,
      traits: properties,
    });
  }

  page(
    userId: string,
    category: string,
    name: string,
    properties: Properties | undefined,
    options?: EventOptions,
  ) {
    const metadata = (options?.metadata?.[this.id] ?? {}) as Partial<SegmentMetadata>;
    this.segment!.page({
      ...metadata,
      userId,
      category,
      name,
      properties,
    });
  }

  track(userId: string, event: Event) {
    const metadata = (event.metadata?.[this.id] ?? {}) as Partial<SegmentMetadata>;
    this.segment!.track({
      ...metadata,
      userId,
      event: event.name,
      properties: { ...event.properties },
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
