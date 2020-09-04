/* eslint-disable no-unused-vars, class-methods-use-this, max-classes-per-file */

export interface Options {
  /**
   * The current environment (development or production). Default is development.
   */
  environment?: Environment;
  /**
   * Whether calls to the Itly SDK should be no-ops. Default is false.
   */
  disabled?: boolean;
  /**
   * Analytics provider-specific configuration. Default is null.
   */
  plugins?: Plugin[];
  /**
   * Additional context properties to add to all events. Set to object or an object resolver.
   * Default is none.
   */
  context?: Properties;
  /**
   * Configure validation handling
   */
  validation?: ValidationOptions;
}

export type Environment = 'development' | 'production';

export type Properties = {
  [name: string]: any;
};

export type EventMetadata = {
  [name: string]: {
    [name: string]: any;
  };
};

export type Event = {
  name: string;
  properties?: Properties;
  id?: string;
  version?: string;
  metadata?: EventMetadata;
};

export type ValidationOptions = {
  disabled: boolean;
  trackInvalid: boolean;
  errorOnInvalid: boolean;
};

export type ValidationResponse = {
  valid: boolean;
  message?: string;
  pluginId?: string;
};

export interface Plugin {
  id(): string;

  load(options: Options): void;

  // validation methods
  validate(event: Event): ValidationResponse;

  // tracking methods
  alias(userId: string, previousId: string | undefined): void;

  identify(userId: string | undefined, properties: Properties | undefined): void;

  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void;

  group(userId: string | undefined, groupId: string, properties?: Properties | undefined): void;

  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void;

  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
  ): void;

  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void;

  track(userId: string | undefined, event: Event): void;

  postTrack(
    userId: string | undefined,
    event: Event,
    validationResponses: ValidationResponse[],
  ): void;

  reset(): void;
}

export class PluginBase implements Plugin {
  id(): string {
    throw new Error('Plugin id() is required. Override id() method returning a unique id.');
  }

  load(options: Options): void {}

  // validation methods
  validate(event: Event): ValidationResponse {
    return {
      valid: true,
    };
  }

  alias(userId: string, previousId: string | undefined): void {}

  identify(userId: string | undefined, properties: Properties | undefined): void {}

  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {}

  group(userId: string | undefined, groupId: string, properties?: Properties | undefined): void {}

  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {}

  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
  ): void {}

  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {}

  track(userId: string | undefined, event: Event): void {}

  postTrack(userId: string | undefined, event: Event, validationResponses: ValidationResponse[]): void {}

  reset(): void {}
}

const DEFAULT_DEV_VALIDATION_OPTIONS: ValidationOptions = {
  disabled: false,
  trackInvalid: false,
  errorOnInvalid: true,
};

const DEFAULT_PROD_VALIDATION_OPTIONS: ValidationOptions = {
  ...DEFAULT_DEV_VALIDATION_OPTIONS,
  trackInvalid: true,
  errorOnInvalid: false,
};

const DEFAULT_DEV_OPTIONS: Options = {
  environment: 'development',
  context: undefined,
  plugins: [],
  validation: DEFAULT_DEV_VALIDATION_OPTIONS,
  disabled: false,
};

const DEFAULT_PROD_OPTIONS: Options = {
  ...DEFAULT_DEV_OPTIONS,
  environment: 'production',
  validation: DEFAULT_PROD_VALIDATION_OPTIONS,
};

class Itly {
  private options: Options | undefined = undefined;

  private plugins = DEFAULT_DEV_OPTIONS.plugins!;

  private validationOptions = DEFAULT_DEV_OPTIONS.validation!;

  load(options: Options) {
    if (this.options) {
      throw new Error('Itly is already initialized.');
    }

    this.options = {
      ...(options?.environment === 'production' ? DEFAULT_PROD_OPTIONS : DEFAULT_DEV_OPTIONS),
      ...options,
      validation: {
        ...(options?.environment === 'production' ? DEFAULT_PROD_VALIDATION_OPTIONS : DEFAULT_DEV_VALIDATION_OPTIONS),
        ...options?.validation,
      },
    };

    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.plugins = this.options.plugins!;
    this.validationOptions = this.options.validation!;

    // invoke load() on every plugin
    this.plugins.forEach((p) => p.load(options));
  }

  alias(userId: string, previousId?: string) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.plugins.forEach((p) => p.alias(userId, previousId));
  }

  identify(userId: string | undefined, identifyProperties?: Properties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const identifyEvent = {
      name: 'identify',
      properties: identifyProperties || {},
      id: 'identify',
      version: '0-0-0',
    };

    this.runIfValid(
      identifyEvent,
      () => this.plugins.forEach((p) => p.identify(userId, identifyProperties)),
      (validationResponses) =>
        this.plugins.forEach((p) => p.postIdentify(userId, identifyProperties, validationResponses)),
    );
  }

  group(userId: string | undefined, groupId: string, groupProperties?: Properties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const groupEvent = {
      name: 'group',
      properties: groupProperties || {},
      id: 'group',
      version: '0-0-0',
    };

    this.runIfValid(
      groupEvent,
      () => this.plugins.forEach((p) => p.group(userId, groupId, groupProperties)),
      (validationResponses) =>
        this.plugins.forEach((p) => p.postGroup(userId, groupId, groupProperties, validationResponses)),
    );
  }

  page(userId: string | undefined, category: string, name: string, pageProperties?: Properties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const pageEvent = {
      name: 'page',
      properties: pageProperties || {},
      id: 'page',
      version: '0-0-0',
    };

    this.runIfValid(
      pageEvent,
      () => this.plugins.forEach((p) => p.page(userId, category, name, pageProperties)),
      (validationResponses) =>
        this.plugins.forEach((p) => p.postPage(userId, category, name, pageProperties, validationResponses)),
    );
  }

  track(userId: string | undefined, event: Event) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const context = this.options?.context;
    const mergedEvent = this.mergeContext(event, context);

    this.runIfValid(
      event,
      () => this.plugins.forEach((p) => p.track(userId, mergedEvent)),
      (validationResponses) => this.plugins.forEach((p) => p.postTrack(userId, mergedEvent, validationResponses)),
      context,
    );
  }

  reset() {
    this.plugins.forEach((p) => p.reset());
  }

  getPlugin(id: string): Plugin | undefined {
    return this.plugins.find((p) => p.id() === id);
  }

  private validate(event: Event): ValidationResponse[] {
    const pluginId = 'sdk-core';
    const validationResponses: ValidationResponse[] = [];

    try {
      validationResponses.push(
        ...this.plugins.map<ValidationResponse>((p) => ({
          ...p.validate(event),
          pluginId: p.id(),
        })),
      );
    } catch (e) {
      // catch errors in validate() method
      validationResponses.push({
        valid: false,
        pluginId,
        message: e.message,
      });
    }

    return validationResponses;
  }

  private isInitializedAndEnabled() {
    if (!this.options) {
      throw new Error('Itly is not yet initialized. Have you called `itly.load()` on app start?');
    }

    return !this.options.disabled;
  }

  private runIfValid(
    event: Event,
    run: () => any,
    postRun: (validationResponses: ValidationResponse[]) => any,
    context?: Properties,
  ): void {
    // #1 validation phase
    let shouldRun = true;

    // invoke validate() on every plugin if required
    let validationResponses: ValidationResponse[] = [];
    if (!this.validationOptions.disabled) {
      validationResponses = [
        ...this.validate(event),
        ...context ? this.validate(this.getContextEvent(context)) : [],
      ];
      shouldRun = this.validationOptions.trackInvalid || validationResponses.every((vr) => vr.valid);
    }

    // #2 track phase
    // invoke track(), group(), identify(), page() on every plugin if allowed
    if (shouldRun) {
      run();
    }

    // invoke postTrack(), postGroup(), postIdentify(), postPage() on every plugin
    postRun(validationResponses);

    // #3 response phase
    if (this.validationOptions.errorOnInvalid) {
      const invalidResult = validationResponses.find((vr) => !vr.valid);
      if (invalidResult) {
        throw new Error(`Validation Error: ${invalidResult.message}`);
      }
    }
  }

  private mergeContext(event: Event, context?: Properties): Event {
    return context
      ? {
        ...event,
        properties: {
          ...context,
          ...event.properties,
        },
      }
      : event;
  }

  private getContextEvent(context: Properties): Event {
    return {
      name: 'context',
      properties: context || {},
      id: 'context',
      version: '0-0-0',
    };
  }
}

const itly = new Itly();
export { itly };
export default itly;
