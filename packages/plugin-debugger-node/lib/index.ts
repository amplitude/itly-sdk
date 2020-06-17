/* eslint-disable no-unused-vars, class-methods-use-this, no-constant-condition, no-await-in-loop */
import fetch from 'node-fetch';
import {
  Event, Properties, PluginBase, ValidationResponse,
} from '@itly/sdk-node';

export type DebuggerPluginOptions = {
  url: string,
  debugLevel?: 'full' | 'metadataOnly',
  batchSize?: number,
  flushAt?: number,
  flushInterval?: number
};

enum TrackType {
  track = 'track',
  group = 'group',
  identify = 'identify',
  page = 'page',
}

type TrackModel = {
  type: TrackType;
  dateSent: Date;
  eventId?: string;
  eventSchemaVersion?: string;
  eventName?: string;
  properties: Properties,
  valid: boolean;
  validation: {
    details: string;
  };
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class DebuggerNodePlugin extends PluginBase {
  static ID: string = 'debugger-node';

  private buffer: TrackModel[] = [];

  private config: Required<DebuggerPluginOptions> = {
    url: '',
    debugLevel: 'full',
    batchSize: 100,
    flushAt: 10,
    flushInterval: 1000,
  };

  constructor(private apiKey: string, debuggerOptions: DebuggerPluginOptions) {
    super();
    this.config = { ...this.config, ...debuggerOptions };

    this.startCheck();
  }

  // overrides PluginBase.id
  id = () => DebuggerNodePlugin.ID;

  // overrides PluginBase.track
  track(userId: string | undefined, event: Event): void {
    this.push(
      this.toTrackModel(TrackType.track, event, { ...event.properties, userId }),
    );
  }

  // overrides PluginBase.validationError
  validationError(validationResponse: ValidationResponse, event: Event): void {
    this.push(
      this.toTrackModel(TrackType.track, event, event.properties, validationResponse),
    );
  }

  // overrides PluginBase.group
  group(userId: string | undefined, groupId: string, properties?: Properties): void {
    this.push(
      this.toTrackModel(TrackType.group, undefined, { ...properties, userId, groupId }),
    );
  }

  // overrides PluginBase.identify
  identify(userId?: string, properties?: Properties): void {
    this.push(
      this.toTrackModel(TrackType.identify, undefined, { ...properties, userId }),
    );
  }

  // overrides PluginBase.page
  page(userId?: string, category?: string, name?: string, properties?: Properties): void {
    this.push(
      this.toTrackModel(TrackType.page, undefined, {
        ...properties, userId, category, name,
      }),
    );
  }

  private toTrackModel(type: TrackType, event?: Event, properties?: Properties,
    validation?: ValidationResponse): TrackModel {
    const model = {
      type,
      dateSent: new Date(new Date().getTime()),
      eventId: event ? event.id : undefined,
      eventSchemaVersion: event ? event.version : undefined,
      eventName: event ? event.name : undefined,
      properties: {},
      valid: true,
      validation: {
        details: '',
      },
    };

    if (properties) {
      if (this.config.debugLevel === 'full') {
        model.properties = properties;
      } else {
        model.properties = Object.keys(properties).reduce((o, key) => ({ ...o, [key]: null }), {});
      }
    }

    if (validation) {
      model.valid = validation.valid;
      if (this.config.debugLevel === 'full') {
        model.validation.details = `${validation.pluginId}: ${validation.message}`;
      }
    }

    return model;
  }

  private async flush() {
    while (this.buffer.length > 0) {
      const objects = this.buffer.splice(0, this.config.batchSize);
      await fetch(this.config.url, {
        method: 'post',
        headers: {
          authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objects,
        }),
      });
    }
  }

  private push(model: TrackModel) {
    this.buffer.push(model);
    if (this.buffer.length >= this.config.flushAt) {
      this.flush();
    }
  }

  private async startCheck() {
    while (true) {
      await this.check();
    }
  }

  private async check() {
    if (this.buffer.length > 0) {
      this.flush();
    }
    await wait(this.config.flushInterval);
  }
}
