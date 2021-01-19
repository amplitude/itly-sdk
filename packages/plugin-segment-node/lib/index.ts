/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, Properties, Logger, PluginLoadOptions,
} from '@itly/sdk';
import Segment from 'analytics-node';

export type SegmentOptions = {
  flushAt?: number; // (default: 20)
  flushInterval?: number; // (default: 10000)
  host?:string; // (default: 'https://api.segment.io')
  enable?: boolean; // (default: true)
}

/**
 * Segment Node Plugin for Iteratively SDK
 */
export class SegmentPlugin extends Plugin {
  private segment?: Segment;

  private logger: Logger | undefined;

  constructor(
    private writeKey: string,
    private options?: SegmentOptions,
  ) {
    super('segment');
  }

  load(options: PluginLoadOptions) {
    this.segment = new Segment(this.writeKey, this.options);
    this.logger = options.logger;
  }

  alias(userId: string, previousId: string) {
    const id = +new Date();
    const payload = {
      userId,
      previousId,
    };
    this.logger!.debug(`${this.id}: alias(request) ${id}: ${JSON.stringify(payload)}`);
    this.segment!.alias(payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: alias(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: alias(response) ${id}: ${err}`);
      }
    });
  }

  identify(userId: string, properties: Properties | undefined) {
    const id = +new Date();
    const payload = {
      userId,
      traits: { ...properties },
    };
    this.logger!.debug(`${this.id}: identify(request) ${id}: ${JSON.stringify(payload)}`);
    this.segment!.identify(payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: identify(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: identify(response) ${id}: ${err}`);
      }
    });
  }

  group(userId: string, groupId: string, properties: Properties | undefined) {
    const id = +new Date();
    const payload = {
      userId,
      groupId,
      traits: properties,
    };
    this.logger!.debug(`${this.id}: group(request) ${id}: ${JSON.stringify(payload)}`);
    this.segment!.group(payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: group(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: group(response) ${id}: ${err}`);
      }
    });
  }

  page(userId: string, category: string, name: string, properties: Properties | undefined) {
    const id = +new Date();
    const payload = {
      userId,
      category,
      name,
      properties,
    };
    this.logger!.debug(`${this.id}: page(request) ${id}: ${JSON.stringify(payload)}`);
    this.segment!.page(payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: page(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: page(response) ${id}: ${err}`);
      }
    });
  }

  track(userId: string, event: Event) {
    const id = +new Date();
    const payload = {
      userId,
      event: event.name,
      properties: { ...event.properties },
    };
    this.logger!.debug(`${this.id}: track(request) ${id}: ${JSON.stringify(payload)}`);
    this.segment!.track(payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: track(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: track(response) ${id}: ${err}`);
      }
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
