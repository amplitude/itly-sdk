/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  PluginBase, Event, Properties,
} from '@itly/sdk';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

export default class SegmentNodePlugin extends PluginBase {
  static ID = 'segment';

  private segment?: Segment;

  constructor(
    private writeKey: string,
    private options?: SegmentOptions,
  ) {
    super();
  }

  id = () => SegmentNodePlugin.ID;

  load() {
    this.segment = new Segment(this.writeKey, this.options);
  }

  alias(userId: string, previousId: string) {
    this.segment!.alias({ userId, previousId });
  }

  identify(userId: string, properties: Properties | undefined) {
    this.segment!.identify({
      userId,
      traits: { ...properties },
    });
  }

  group(userId: string, groupId: string, properties: Properties | undefined) {
    this.segment!.group({
      userId,
      groupId,
      traits: properties,
    });
  }

  page(userId: string, category: string, name: string, properties: Properties | undefined) {
    this.segment!.page({
      userId,
      category,
      name,
      properties,
    });
  }

  track(userId: string, event: Event) {
    this.segment!.track({
      userId,
      event: event.name,
      properties: { ...event.properties },
    });
  }

  flush() {
    this.segment!.flush();
  }
}
