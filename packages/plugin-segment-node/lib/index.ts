
/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  ItlyPluginBase, ItlyEvent, ItlyProperties,
} from '@itly/sdk-node';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

export default class SegmentNodePlugin extends ItlyPluginBase {
  static ID = 'segment';

  private segment: Segment;

  constructor(writeKey: string, segmentOptions?: SegmentOptions) {
    super();
    this.segment = new Segment(writeKey, segmentOptions);
  }

  id = () => SegmentNodePlugin.ID;

  alias(userId: string, previousId: string) {
    this.segment.alias({ userId, previousId });
  }

  identify(userId: string, properties: ItlyProperties | undefined) {
    this.segment.identify({
      userId,
      traits: { ...properties },
    });
  }

  group(userId: string, groupId: string, properties: ItlyProperties | undefined) {
    this.segment.group({
      userId,
      groupId,
      traits: properties,
    });
  }

  page(userId: string, category: string, name: string, properties: ItlyProperties | undefined) {
    this.segment.page({
      userId,
      category,
      name,
      properties,
    });
  }

  track(userId: string, event: ItlyEvent) {
    this.segment.track({
      userId,
      event: event.name,
      properties: { ...event.properties },
    });
  }
}
