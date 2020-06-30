/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

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

export type Event = {
  name: string;
  properties?: Properties;
  id?: string;
  version?: string;
};

export type ValidationOptions = {
  disabled: boolean,
  trackInvalid: boolean;
  errorOnInvalid: boolean;
}

export type ValidationResponse = {
  valid: boolean;
  message?: string;
  pluginId?: string;
};

export interface Plugin {
  id(): string;

  // Tracking methods
  load(options: Options): void;
  alias(userId: string, previousId: string | undefined): void;
  identify(userId: string | undefined, properties: Properties | undefined): void;
  group(
    userId: string | undefined,
    groupId: string,
    properties?: Properties | undefined
  ): void;
  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined
  ): void;
  track(userId: string | undefined, event: Event): void;
  reset(): void;

  // Validation methods
  validate(event: Event): ValidationResponse;
  validationError(validation: ValidationResponse, event: Event): void;
}

export class PluginBase implements Plugin {
  id(): string { throw new Error('Plugin id() is required. Overide id() method returning a unique id.'); }

  load(options: Options): void {}

  alias(userId: string, previousId: string | undefined): void {}

  identify(userId: string | undefined, properties: Properties | undefined): void {}

  group(
    userId: string | undefined,
    groupId: string,
    properties?: Properties | undefined,
  ): void {}

  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
  ): void {}

  track(userId: string | undefined, event: Event): void {}

  reset(): void {}

  // Validation methods
  validate(event: Event): ValidationResponse {
    return {
      valid: true,
      pluginId: this.id(),
    };
  }

  validationError(validationResponse: ValidationResponse, event: Event): void {}
}

const DEFAULT_OPTIONS: Options = {
  environment: 'development',
  context: undefined,
  plugins: [],
  validation: {
    disabled: false,
    trackInvalid: false,
    errorOnInvalid: false,
  },
  disabled: false,
};

class Itly {
  private options: Options | undefined = undefined;

  private plugins = DEFAULT_OPTIONS.plugins!;

  private validationOptions = DEFAULT_OPTIONS.validation!;

  load(options: Options) {
    if (this.options) {
      throw new Error('Itly is already initialized.');
    }

    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.plugins = this.options.plugins!;
    this.validationOptions = this.options.validation!;

    this.plugins.forEach((p) => p.load(options));

    const contextEvent = {
      name: 'context',
      properties: options.context || {},
      id: 'context',
      version: '0-0-0',
    };
    this.validate(contextEvent);
  }

  alias(userId: string, previousId?: string) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.plugins.forEach((p) => p.alias(userId, previousId));
  }

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   */
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

    this.runIfValid(identifyEvent, () => this.plugins.forEach(
      (p) => p.identify(userId, identifyProperties),
    ));
  }

  group(userId:string | undefined, groupId: string, groupProperties?: Properties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const groupEvent = {
      name: 'group',
      properties: groupProperties || {},
      id: 'group',
      version: '0-0-0',
    };

    this.runIfValid(groupEvent, () => this.plugins.forEach(
      (p) => p.group(userId, groupId, groupProperties),
    ));
  }

  page(
    userId: string | undefined,
    category: string,
    name: string,
    pageProperties?: Properties,
  ) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const pageEvent = {
      name: 'page',
      properties: pageProperties || {},
      id: 'page',
      version: '0-0-0',
    };

    this.runIfValid(pageEvent, () => this.plugins.forEach(
      (p) => p.page(userId, category, name, pageProperties),
    ));
  }

  track(userId: string | undefined, event: Event) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.runIfValid(event, () => {
      const mergedEvent = (!this.options!.context)
        ? event
        : {
          ...event,
          properties: {
            ...this.options!.context,
            ...event.properties,
          },
        };

      this.plugins.forEach((p) => p.track(userId, mergedEvent));
    });
  }

  reset() {
    this.plugins.forEach((p) => p.reset());
  }

  getPlugin(id: string): Plugin | undefined {
    return this.plugins.find((p) => p.id() === id);
  }

  private validate(event: Event): boolean {
    let pluginId = 'sdk-core';

    // Default to true
    let validation: ValidationResponse = {
      valid: true,
      pluginId,
    };

    // Loop over plugins and stop if valid === false
    try {
      this.plugins.every((p) => {
        pluginId = p.id();
        validation = p.validate(event);
        return validation.valid;
      });
    } catch (e) {
      // Catch errors in validate() method
      validation = {
        valid: false,
        pluginId,
        message: e.message,
      };
    }

    // If validation failed call validationError hook
    if (!validation.valid) {
      this.plugins.forEach((p) => p.validationError(validation, event));

      if (this.validationOptions.errorOnInvalid) {
        throw new Error(`Validation Error: ${validation.message}`);
      }
    }

    return validation.valid;
  }

  private isInitializedAndEnabled() {
    if (!this.options) {
      throw new Error('Itly is not yet initialized. Have you called `itly.load()` on app start?');
    }

    return !this.options.disabled;
  }

  private runIfValid(event: Event, cb: () => any): void {
    let shouldRun = true;
    if (!this.validationOptions.disabled) {
      shouldRun = this.validate(event);
      if (this.validationOptions.trackInvalid) {
        shouldRun = true;
      }
    }
    if (shouldRun) {
      cb();
    }
  }
}

export default new Itly();
