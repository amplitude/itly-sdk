/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  RequestLoggerPlugin, Event, Properties, PluginLoadOptions,
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

  alias(userId: string, previousId: string) {
    const payload = {
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
    });
  }

  identify(userId: string, properties: Properties | undefined) {
    const payload = {
      userId,
      traits: { ...properties },
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    this.segment!.identify(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
    });
  }

  group(userId: string, groupId: string, properties: Properties | undefined) {
    const payload = {
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
    });
  }

  page(userId: string, category: string, name: string, properties: Properties | undefined) {
    const payload = {
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
    });
  }

  track(userId: string, event: Event) {
    const payload = {
      userId,
      event: event.name,
      properties: { ...event.properties },
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    this.segment!.track(payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
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
