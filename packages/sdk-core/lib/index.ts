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
  /**
   * Configure validation handling
   */
  validationOptions?: ValidationOptions;
}

export type ItlyProperties = {
  [name: string]: any;
};

export type ItlyEvent = {
  name: string;
  properties?: ItlyProperties;
  id: string;
  version: string;
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
    return {
      valid: true,
      pluginId: this.id(),
    };
  }

  validationError(validationResponse: ValidationResponse, event: ItlyEvent): void {}
}

class Itly {
  private options: ItlyOptions | undefined = undefined;

  private plugins: ItlyPlugin[] = [];

  private validationOptions: ValidationOptions = {
    disabled: false,
    trackInvalid: false,
    errorOnInvalid: false,
  };

  load(options: ItlyOptions) {
    if (this.options) {
      throw new Error('Itly is already initialized.');
    }

    this.options = options;

    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.plugins = options.plugins || this.plugins;
    this.validationOptions = options.validationOptions || this.validationOptions;

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

    const identifyEvent = {
      name: 'identify',
      properties: identifyProperties || {},
      id: 'identify',
      version: '0-0-0',
    };

    this.runIfValid(identifyEvent, () => {
      this.plugins.forEach((p) => p.identify(userId, identifyProperties));
    });
  }

  group(userId:string | undefined, groupId: string, groupProperties?: ItlyProperties) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const groupEvent = {
      name: 'group',
      properties: groupProperties || {},
      id: 'group',
      version: '0-0-0',
    };

    this.runIfValid(groupEvent, () => {
      this.plugins.forEach((p) => p.group(userId, groupId, groupProperties));
    });
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

    const pageEvent = {
      name: 'page',
      properties: pageProperties || {},
      id: 'page',
      version: '0-0-0',
    };

    this.runIfValid(pageEvent, () => {
      this.plugins.forEach((p) => p.page(userId, category, name, pageProperties));
    });
  }

  track(userId: string | undefined, event: ItlyEvent) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.runIfValid(event, () => {
      this.plugins.forEach((p) => p.track(userId, event));
    });
  }

  reset() {
    this.plugins.forEach((p) => p.reset());
  }

  getPlugin(id: string): ItlyPlugin | undefined {
    return this.plugins.find((p) => p.id() === id);
  }

  private validate(event: ItlyEvent): boolean {
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
      throw new Error('Itly is not yet initialized. Have you called `itly.init()` on app start?');
    }

    return !this.options.disabled;
  }

  private runIfValid(event: ItlyEvent, cb: () => any): void {
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
