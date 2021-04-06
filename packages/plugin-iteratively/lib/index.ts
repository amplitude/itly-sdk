/* eslint-disable no-unused-vars, class-methods-use-this, no-constant-condition, no-await-in-loop, no-bitwise, no-mixed-operators */
import { v4 as uuid } from '@lukeed/uuid/secure';
import {
  Environment, Event, Properties, RequestLoggerPlugin, ValidationResponse, PluginLoadOptions,
} from '@itly/sdk';

export type IterativelyOptions = {
  /**
   * The server endpoint to send messages.
   * @default: https://data-us-east1.iterative.ly/t
   */
  url?: string;

  /**
   * Tracking plan branch name (e.g. feature/demo).
   */
  branch?: string;

  /**
   * Tracking plan version number (e.g. 1.0.0).
   */
  version?: string;

  /**
   * Remove all property values and validation error details from messages before enqueueing.
   * @default: false
   */
  omitValues?: boolean;

  /**
   * The maximum number of messages grouped together into a single network request.
   * @default: 100
   */
  batchSize?: number;

  /**
   * The number of messages that triggers unconditional queue flushing.
   * It works independently from flushInterval.
   * @default: 10
   */
  flushAt?: number;

  /**
   * Time in milliseconds to wait before flushing the queue.
   * @default: 1000
   */
  flushInterval?: number;

  /**
   * Disable the plugin. When disabled it doesn't enqueue or send messages.
   * Default value depends on the environment option provided to the load() method:
   * - If development: false
   * - If production: true (the plugin is disabled by default)
   */
  disabled?: boolean;

  /**
   * @deprecated left for backward compatibility only and should be removed in one of the next versions.
   */
  environment?: Environment;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type RequiredExcept<T, K extends keyof T> = Required<Omit<T, K>> & Partial<Pick<T, K>>;
export type IterativelyOptionsPartial = IterativelyOptions;

enum TrackType {
  track = 'track',
  group = 'group',
  identify = 'identify',
  page = 'page',
}

type TrackModel = {
  type: TrackType;
  messageId: string;
  dateSent: string;
  eventId?: string;
  eventSchemaVersion?: string;
  eventName?: string;
  properties: Properties;
  valid: boolean;
  validation: {
    details: string;
  };
};

/**
 * Iteratively Browser Plugin for Iteratively SDK
 */
export class IterativelyPlugin extends RequestLoggerPlugin {
  private buffer: TrackModel[] = [];

  private timer: ReturnType<typeof setTimeout> | null = null;

  private config: RequiredExcept<IterativelyOptions, 'branch' | 'version' | 'environment' | 'disabled'> = {
    url: 'https://data-us-east1.iterative.ly/t',
    omitValues: false,
    batchSize: 100,
    flushAt: 10,
    flushInterval: 1000,
  };

  constructor(private apiKey: string, iterativelyOptions?: IterativelyOptions) {
    super('iteratively');

    // allows consumer to override any config value
    this.config = { ...this.config, ...iterativelyOptions };
  }

  // overrides Plugin.load
  load(options: PluginLoadOptions) {
    super.load(options);

    // adjusts config values in accordance with provided environment value
    if (this.config.disabled === undefined && options?.environment === 'production') {
      this.config.disabled = true;
    }
  }

  // overrides Plugin.postIdentify
  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.identify, undefined, properties, validationResponses));
  }

  // overrides Plugin.postGroup
  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.group, undefined, properties, validationResponses));
  }

  // overrides Plugin.postPage
  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.push(this.toTrackModel(TrackType.page, undefined, properties, validationResponses));
  }

  // overrides Plugin.postTrack
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
      messageId: this.getNewMessageId(),
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

  async flush() {
    if (this.config.disabled) {
      return;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    while (this.buffer.length > 0) {
      const objects = this.buffer.splice(0, this.config.batchSize);
      const responseLogger = this.logger!.logRequest('flush', `${objects.length} objects`);
      try {
        const response = await fetch(this.config.url, {
          method: 'post',
          headers: {
            authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trackingPlanVersion: this.config.version,
            branchName: this.config.branch,
            objects,
          }),
        });
        if (response.status < 300) {
          responseLogger.success(`${response.status}`);
        } else {
          const responseBody = await response.text();
          responseLogger.error(`unexpected status: ${response.status}. ${responseBody}`);
        }
      } catch (e) {
        responseLogger.error(e.toString());
      }
    }

    this.timer = null;
  }

  private push(model: TrackModel) {
    if (this.config.disabled) {
      return;
    }

    this.logger!.debug(`${this.id}: push(): ${JSON.stringify(model)}`);

    this.buffer.push(model);

    if (this.buffer.length >= this.config.flushAt) {
      this.flush();
      return;
    }

    if (!this.timer && this.config.flushInterval) {
      this.timer = setTimeout(this.flush.bind(this), this.config.flushInterval);
    }
  }

  private getNewMessageId() {
    return uuid();
  }
}

export default IterativelyPlugin;
