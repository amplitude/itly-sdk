/* eslint-disable no-unused-vars, class-methods-use-this, no-constant-condition, no-await-in-loop */
import {
  Environment, Event, Properties, PluginBase, ValidationResponse,
} from '@itly/sdk-core';

export type IterativelyOptions = {
  url: string,
  environment: Environment,
  redactValues?: boolean,
  batchSize?: number,
  flushAt?: number,
  flushInterval?: number,
  disabled?: boolean,
};

enum TrackType {
  track = 'track',
  group = 'group',
  identify = 'identify',
  page = 'page',
}

type TrackModel = {
  type: TrackType;
  dateSent: string;
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

export default class IterativelyPlugin extends PluginBase {
  static ID: string = 'iteratively';

  private buffer: TrackModel[] = [];

  private config: Required<IterativelyOptions> = {
    url: '',
    environment: 'development',
    redactValues: false,
    batchSize: 100,
    flushAt: 10,
    flushInterval: 1000,
    disabled: false,
  };

  constructor(private apiKey: string, iterativelyOptions: IterativelyOptions) {
    super();

    // adjusts config values in accordance with provided environment value
    if (iterativelyOptions.environment === 'production') {
      this.config.disabled = true;
    }

    // allows consumer to override any config value
    this.config = { ...this.config, ...iterativelyOptions };
  }

  // overrides PluginBase.id
  id = () => IterativelyPlugin.ID;

  load = () => {
    if (this.config.disabled) {
      return;
    }

    this.startCheck();
  }

  // overrides PluginBase.track
  track(userId: string | undefined, event: Event): void {
    this.push(
      this.toTrackModel(TrackType.track, event, event.properties),
    );
  }

  // overrides PluginBase.validationError
  validationError(validationResponse: ValidationResponse, event: Event): void {
    switch (event.id) {
      case TrackType.group:
      case TrackType.identify:
      case TrackType.page:
        this.push(
          this.toTrackModel(event.id, undefined, event.properties, validationResponse),
        );
        break;
      default:
        this.push(
          this.toTrackModel(TrackType.track, event, event.properties, validationResponse),
        );
    }
  }

  // overrides PluginBase.group
  group(userId: string | undefined, groupId: string, properties?: Properties): void {
    this.push(
      this.toTrackModel(TrackType.group, undefined, properties),
    );
  }

  // overrides PluginBase.identify
  identify(userId?: string, properties?: Properties): void {
    this.push(
      this.toTrackModel(TrackType.identify, undefined, properties),
    );
  }

  // overrides PluginBase.page
  page(userId?: string, category?: string, name?: string, properties?: Properties): void {
    this.push(
      this.toTrackModel(TrackType.page, undefined, properties),
    );
  }

  private toTrackModel(type: TrackType, event?: Event, properties?: Properties,
    validation?: ValidationResponse): TrackModel {
    const model: TrackModel = {
      type,
      dateSent: (new Date()).toISOString(),
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
      if (this.config.redactValues) {
        model.properties = Object.keys(properties).reduce((o, key) => ({ ...o, [key]: null }), {});
      } else {
        model.properties = properties || {};
      }
    }

    if (validation) {
      model.valid = validation.valid;
      if (!this.config.redactValues) {
        model.validation.details = validation.message || '';
      }
    }

    return model;
  }

  private async flush() {
    while (this.buffer.length > 0) {
      const objects = this.buffer.splice(0, this.config.batchSize);
      try {
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
      } catch (e) {
        // do nothing
      }
    }
  }

  private push(model: TrackModel) {
    if (this.config.disabled) {
      return;
    }

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
