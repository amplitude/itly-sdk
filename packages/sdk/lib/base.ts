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
   * Configure validation handling
   */
  validation?: ValidationOptions;
  /**
   * Logger to use for Iteratively output messages
   */
  logger?: Logger;
}

export type PluginLoadOptions = {
  environment: Environment;
  logger: Logger;
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

export interface Logger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export abstract class Plugin {
  protected constructor(readonly id: string) {
    this.id = id;
  }

  load(options: PluginLoadOptions): void {}

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
  plugins: [],
  validation: DEFAULT_DEV_VALIDATION_OPTIONS,
  disabled: false,
};

const DEFAULT_PROD_OPTIONS: Options = {
  ...DEFAULT_DEV_OPTIONS,
  environment: 'production',
  validation: DEFAULT_PROD_VALIDATION_OPTIONS,
};

const LOGGERS: Readonly<Record<'NONE' | 'CONSOLE', Logger>> = Object.freeze({
  NONE: {
    debug(message: string) {},
    info(message: string) {},
    warn(message: string) {},
    error(message: string) {},
  },
  CONSOLE: {
    // eslint-disable-next-line no-console
    debug(message: string) { console.debug(message); },
    // eslint-disable-next-line no-console
    info(message: string) { console.info(message); },
    // eslint-disable-next-line no-console
    warn(message: string) { console.warn(message); },
    // eslint-disable-next-line no-console
    error(message: string) { console.error(message); },
  },
});

class Itly {
  private options: Options | undefined = undefined;

  private plugins = DEFAULT_DEV_OPTIONS.plugins!;

  private validationOptions = DEFAULT_DEV_OPTIONS.validation!;

  private logger: Logger = LOGGERS.NONE;

  private context: Properties | undefined = undefined;

  load(context?: Properties, options?: Options) {
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

    this.logger = this.options.logger || this.logger;
    this.plugins = this.options.plugins!;
    this.validationOptions = this.options.validation!;
    this.context = context;

    // invoke load() on every plugin
    this.runOnAllPlugins('load', (p) => p.load({
      environment: this.options!.environment!,
      logger: this.logger,
    }));
  }

  alias(userId: string, previousId?: string) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.runOnAllPlugins('alias', (p) => p.alias(userId, previousId));
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

    this.validateAndRunOnAllPlugins(
      'identify',
      identifyEvent,
      (p, e) => p.identify(userId, identifyProperties),
      (p, e, validationResponses) => p.postIdentify(
        userId, identifyProperties, validationResponses,
      ),
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

    this.validateAndRunOnAllPlugins(
      'group',
      groupEvent,
      (p, e) => p.group(userId, groupId, groupProperties),
      (p, e, validationResponses) => p.postGroup(
        userId, groupId, groupProperties, validationResponses,
      ),
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

    this.validateAndRunOnAllPlugins(
      'page',
      pageEvent,
      (p, e) => p.page(userId, category, name, pageProperties),
      (p, e, validationResponses) => p.postPage(
        userId, category, name, pageProperties, validationResponses,
      ),
    );
  }

  track(userId: string | undefined, event: Event) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const mergedEvent = this.mergeContext(event, this.context);

    this.validateAndRunOnAllPlugins(
      'track',
      event,
      (p, e) => p.track(userId, mergedEvent),
      (p, e, validationResponses) => p.postTrack(
        userId, mergedEvent, validationResponses,
      ),
      this.context,
    );
  }

  reset() {
    this.runOnAllPlugins('reset', (p) => p.reset());
  }

  getPlugin(id: string): Plugin | undefined {
    return this.plugins.find((p) => p.id === id);
  }

  private validate(event: Event): ValidationResponse[] {
    const pluginId = 'sdk-core';
    const validationResponses: ValidationResponse[] = [];

    try {
      validationResponses.push(
        ...this.plugins.map<ValidationResponse>((p) => ({
          ...p.validate(event),
          pluginId: p.id,
        })),
      );
    } catch (e) {
      this.logger.error(`Error validating '${event.name}'. ${e.message}`);
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

  private validateAndRunOnAllPlugins(
    op: string,
    event: Event,
    method: (plugin: Plugin, event: Event) => any,
    postMethod: (plugin: Plugin, event: Event, validationResponses: ValidationResponse[]) => any,
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
      this.runOnAllPlugins(op, (p) => method(p, event));
    }

    // invoke postTrack(), postGroup(), postIdentify(), postPage() on every plugin
    this.runOnAllPlugins(
      `post${this.capitalize(op)}`,
      (p) => postMethod(p, event, validationResponses),
    );

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
      ? Object.assign(Object.create(Object.getPrototypeOf(event)), event, {
        properties: { ...context, ...event.properties },
      })
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

  private runOnAllPlugins(op: string, method: (p: Plugin) => any) {
    this.plugins.forEach((plugin) => {
      try {
        method(plugin);
      } catch (e) {
        this.logger.error(`Error in ${plugin.id}.${op}(). ${e.message}.`);
      }
    });
  }

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

const itly = new Itly();
export { itly, LOGGERS };
export default itly;
