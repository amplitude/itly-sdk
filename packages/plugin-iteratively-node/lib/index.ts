/* eslint-disable no-unused-vars, class-methods-use-this, no-constant-condition, no-await-in-loop */
import fetch from 'node-fetch';
import {
  Environment, Event, Properties, PluginBase, ValidationResponse,
} from '@itly/sdk';

export type IterativelyOptions = {
  url: string,
  environment: Environment,
  omitValues?: boolean,
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

/**
 * Iteratively Node Plugin for Iteratively SDK
 */
export class IterativelyPlugin extends PluginBase {
  static ID: string = 'iteratively';

  private buffer: TrackModel[] = [];

  private timer: ReturnType<typeof setTimeout> | null = null;

  private config: Required<IterativelyOptions> = {
    url: '',
    environment: 'development',
    omitValues: false,
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

  // overrides PluginBase.postIdentify
  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.identify, undefined, properties, validationResponses));
  }

  // overrides PluginBase.postGroup
  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.group, undefined, properties, validationResponses));
  }

  // overrides PluginBase.postPage
  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.page, undefined, properties, validationResponses));
  }

  // overrides PluginBase.postTrack
  postTrack(
    userId: string | undefined,
    event: Event,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.track, event, event.properties, validationResponses));
  }

  private toTrackModel(
    type: TrackType,
    event?: Event,
    properties?: Properties,
    validationResponses?: ValidationResponse[],
  ): TrackModel {
    const model: TrackModel = {
      type,
      dateSent: new Date().toISOString(),
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
      if (this.config.omitValues) {
        model.properties = Object.keys(properties).reduce((o, key) => ({ ...o, [key]: null }), {});
      } else {
        model.properties = properties;
      }
    }

    if (validationResponses) {
      const invalidResult = validationResponses.find((vr) => !vr.valid);
      model.valid = !invalidResult;
      if (!this.config.omitValues) {
        model.validation.details = invalidResult?.message || '';
      }
    }

    return model;
  }

  private async flush() {
    if (this.config.disabled) {
      return;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

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

    this.timer = null;
  }

  private push(model: TrackModel) {
    if (this.config.disabled) {
      return;
    }

    this.buffer.push(model);

    if (this.buffer.length >= this.config.flushAt) {
      this.flush();
      return;
    }

    if (!this.timer && this.config.flushInterval) {
      this.timer = setTimeout(this.flush.bind(this), this.config.flushInterval);
    }
  }
}

export default IterativelyPlugin;
