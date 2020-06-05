/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

export interface ItlyOptions {
  /**
   * The current environment (development or production). Default is development.
   */
  environment?: 'development' | 'production';
  /**
   * Whether calls to the Itly SDK should be no-ops. Default is false.
   */
  disabled?: boolean;
  /**
   * Analytics provider-specific configuration. Default is null.
   */
  plugins?: ItlyPlugin[];
  /**
   * Additional context properties to add to all events. Set to object or an object resolver.
   * Default is none.
   */
  context?: ItlyProperties;
}

export type ItlyProperties = {
  [name: string]: any;
};

export type ItlyEvent = {
  name: string;
  properties: ItlyProperties;
  id: string;
  version: string;
};

export type ValidationResponse = {
  valid: boolean;
  message?: string;
  pluginId?: string;
};

export interface ItlyPlugin {
  id(): string;

  // Tracking methods
  load(options: ItlyOptions): void;
  alias(userId: string, previousId: string | undefined): void;
  identify(userId: string | undefined, properties: ItlyProperties | undefined): void;
  group(
    userId: string | undefined,
    groupId: string,
    properties?: ItlyProperties | undefined
  ): void;
  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: ItlyProperties | undefined
  ): void;
  track(userId: string | undefined, event: ItlyEvent): void;
  reset(): void;

  // Validation methods
  validate(event: ItlyEvent): ValidationResponse;
  validationError(validation: ValidationResponse, event: ItlyEvent): void;
}

export class ItlyPluginBase implements ItlyPlugin {
  id(): string { throw new Error('ItlyPlugin id() is required. Overide id() method returning a unique id.'); }

  load(options: ItlyOptions): void {}

  alias(userId: string, previousId: string | undefined): void {}

  identify(userId: string | undefined, properties: ItlyProperties | undefined): void {}

  group(
    userId: string | undefined,
    groupId: string,
    properties?: ItlyProperties | undefined,
  ): void {}

  page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: ItlyProperties | undefined,
  ): void {}

  track(userId: string | undefined, event: ItlyEvent): void {}

  reset(): void {}

  // Validation methods
  validate(event: ItlyEvent): ValidationResponse {
    return { valid: true };
  }

  validationError(validationResponse: ValidationResponse, event: ItlyEvent): void {}
}

class Itly {
  private options: ItlyOptions | undefined = undefined;

  private plugins: ItlyPlugin[] = [];

  load(options: ItlyOptions) {
    if (this.options) {
      throw new Error('Itly is already initialized.');
    }

    this.options = options;

    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.plugins = options.plugins || [];

    if (options.context) {
      this.validate({
        name: 'context',
        properties: options.context,
        id: 'context',
        version: '0-0-0',
      });
    }

    this.plugins.forEach((p) => p.load(options));
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
  identify(userId: string | undefined, identifyProperties?: ItlyProperties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.validate({
      name: 'identify',
      properties: identifyProperties || {},
      id: 'identify',
      version: '0-0-0',
    });

    this.plugins.forEach((p) => p.identify(userId, identifyProperties));
  }

  group(userId:string | undefined, groupId: string, groupProperties?: ItlyProperties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.validate({
      name: 'group',
      properties: groupProperties || {},
      id: 'group',
      version: '0-0-0',
    });

    this.plugins.forEach((p) => p.group(userId, groupId, groupProperties));
  }

  page(
    userId: string | undefined,
    category: string,
    name: string,
    pageProperties?: ItlyProperties,
  ) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.validate({
      name: 'page',
      properties: pageProperties || {},
      id: 'page',
      version: '0-0-0',
    });

    this.plugins.forEach((p) => p.page(userId, category, name, pageProperties));
  }

  track(userId: string | undefined, event: ItlyEvent) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.validate(event);

    this.plugins.forEach((p) => p.track(userId, event));
  }

  reset() {
    this.plugins.forEach((p) => p.reset());
  }

  private validate(event: ItlyEvent): boolean {
    let pluginId = 'sdk-core';
    let caughtError;

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
      caughtError = e;
      validation = {
        valid: false,
        pluginId,
        message: e.message,
      };
    }

    // If validation failed call validationError hook
    if (!validation.valid) {
      this.plugins.forEach((p) => p.validationError(validation, event));
    }

    // If we caught an Error pay it forward
    if (caughtError) {
      throw caughtError;
    }

    return validation.valid;
  }

  private isInitializedAndEnabled() {
    if (!this.options) {
      throw new Error('Itly is not yet initialized. Have you called `itly.init()` on app start?');
    }

    return !this.options.disabled;
  }
}

export default new Itly();
