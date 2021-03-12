/* eslint-disable no-unused-vars, class-methods-use-this, max-classes-per-file */

export type Environment = 'development' | 'production';

export type Properties = {
  [name: string]: any;
};

export type CallOptions = Record<string, any>;
export interface AliasOptions extends CallOptions {}
export interface IdentifyOptions extends CallOptions {}
export interface GroupOptions extends CallOptions {}
export interface PageOptions extends CallOptions {}
export interface TrackOptions extends CallOptions {}

export type Event = {
  name: string;
  properties?: Properties;
  plugins?: Record<string, boolean>
  id?: string;
  version?: string;
};

export enum Validation {
  Disabled,
  TrackOnInvalid,
  ErrorOnInvalid,
}

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

export type PluginLoadOptions = {
  environment: Environment;
  logger: Logger;
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

  async alias(
    userId: string,
    previousId: string | undefined,
    options?: AliasOptions,
  ): Promise<unknown> {
    return Promise.resolve();
  }

  async identify(
    userId: string | undefined,
    properties: Properties | undefined,
    options?: IdentifyOptions,
  ): Promise<unknown> {
    return Promise.resolve();
  }

  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {}

  async group(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    options?: GroupOptions,
  ): Promise<unknown> {
    return Promise.resolve();
  }

  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {}

  async page(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    options?: PageOptions,
  ): Promise<unknown> {
    return Promise.resolve();
  }

  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {}

  async track(userId: string | undefined, event: Event, options?: TrackOptions): Promise<unknown> {
    return Promise.resolve();
  }

  postTrack(userId: string | undefined, event: Event, validationResponses: ValidationResponse[]): void {}

  reset(): void {}

  async flush(): Promise<unknown> {
    return Promise.resolve();
  }

  /**
   * Returns call options specific to this plugin
   * @param options
   * @protected
   */
  protected getPluginCallOptions<T>(options: CallOptions | undefined): Partial<T> {
    return (options?.[this.id] ?? {}) as Partial<T>;
  }
}

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
   * Extend the Itly SDK by adding plugins for common analytics trackers, validation and more.
   */
  plugins?: Plugin[];
  /**
   * Configure validation handling. Default is to track invalid events in production, but throw in other environments.
   */
  validation?: Validation;
  /**
   * Logger. Default is no logging.
   */
  logger?: Logger;
}

export interface LoadOptions extends Options {
  /**
   * Additional context properties to add to all events.
   */
  context?: Properties,
}

export const LOGGERS: Readonly<Record<'NONE' | 'CONSOLE', Logger>> = Object.freeze({
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

const DEFAULT_DEV_OPTIONS: Required<Options> = {
  environment: 'development',
  plugins: [],
  validation: Validation.ErrorOnInvalid,
  disabled: false,
  logger: LOGGERS.NONE,
};

const DEFAULT_PROD_OPTIONS: Required<Options> = {
  ...DEFAULT_DEV_OPTIONS,
  environment: 'production',
  validation: Validation.TrackOnInvalid,
};

type CallResponse = {
  promise: Promise<void>,
};

export class Itly {
  private options: Required<Options> | undefined = undefined;

  private plugins = DEFAULT_DEV_OPTIONS.plugins;

  private validation = DEFAULT_DEV_OPTIONS.validation;

  private logger: Logger = LOGGERS.NONE;

  private context: Properties | undefined = undefined;

  /**
   * Initialize the Itly SDK. Call once when your application starts.
   * @param loadOptions Configuration options to initialize the Itly SDK with.
   */
  load(loadOptions: LoadOptions = {}) {
    if (this.options) {
      throw new Error('Itly is already initialized.');
    }

    const {
      context,
      ...options
    } = loadOptions;

    this.options = {
      ...(options?.environment === 'production' ? DEFAULT_PROD_OPTIONS : DEFAULT_DEV_OPTIONS),
      ...options,
    };

    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.logger = this.options.logger || this.logger;
    this.plugins = this.options.plugins;
    this.validation = this.options.validation;
    this.context = context;

    // invoke load() on every plugin
    this.runOnAllPlugins('load', (p) => p.load({
      environment: this.options!.environment,
      logger: this.logger,
    }));
  }

  /**
   * Alias a user ID to another user ID.
   * @param userId The user's new ID.
   * @param previousId The user's previous ID.
   * @param options Options for this Alias call.
   */
  alias(
    userId: string,
    previousId?: string,
    options?: AliasOptions,
  ): CallResponse {
    if (!this.isInitializedAndEnabled()) {
      return { promise: Promise.resolve() };
    }

    return {
      promise: this.runOnAllPluginsAsync('alias', (p) => p.alias(userId, previousId, options)),
    };
  }

  /**
   * Identify a user and set or update that user's properties.
   * @param userId The user's ID.
   * @param identifyProperties The user's properties.
   * @param options Options for this Identify call.
   */
  identify(
    userId: string | undefined,
    identifyProperties?: Properties,
    options?: IdentifyOptions,
  ): CallResponse {
    if (!this.isInitializedAndEnabled()) {
      return { promise: Promise.resolve() };
    }

    const identifyEvent = {
      name: 'identify',
      properties: identifyProperties || {},
      id: 'identify',
      version: '0-0-0',
    };

    return {
      promise: this.validateAndRunOnAllPlugins(
        'identify',
        identifyEvent,
        (p, e) => p.identify(userId, identifyProperties, options),
        (p, e, validationResponses) => p.postIdentify(
          userId, identifyProperties, validationResponses,
        ),
      ),
    };
  }

  /**
   * Associate a user with a group and set or update that group's properties.
   * @param userId The user's ID.
   * @param groupId The group's ID.
   * @param groupProperties The group's properties.
   * @param options Options for this Group call.
   */
  group(
    userId: string | undefined,
    groupId: string,
    groupProperties?: Properties,
    options?: GroupOptions,
  ): CallResponse {
    if (!this.isInitializedAndEnabled()) {
      return { promise: Promise.resolve() };
    }

    const groupEvent = {
      name: 'group',
      properties: groupProperties || {},
      id: 'group',
      version: '0-0-0',
    };

    return {
      promise: this.validateAndRunOnAllPlugins(
        'group',
        groupEvent,
        (p, e) => p.group(userId, groupId, groupProperties, options),
        (p, e, validationResponses) => p.postGroup(
          userId, groupId, groupProperties, validationResponses,
        ),
      ),
    };
  }

  /**
   * Track a page view.
   * @param userId The user's ID.
   * @param category The page's category.
   * @param name The page's name.
   * @param pageProperties The page's properties.
   * @param options Options for this Page call.
   */
  page(
    userId: string | undefined,
    category: string, name: string,
    pageProperties?: Properties,
    options?: PageOptions,
  ): CallResponse {
    if (!this.isInitializedAndEnabled()) {
      return { promise: Promise.resolve() };
    }

    const pageEvent = {
      name: 'page',
      properties: pageProperties || {},
      id: 'page',
      version: '0-0-0',
    };

    return {
      promise: this.validateAndRunOnAllPlugins(
        'page',
        pageEvent,
        (p, e) => p.page(userId, category, name, pageProperties, options),
        (p, e, validationResponses) => p.postPage(
          userId, category, name, pageProperties, validationResponses,
        ),
      ),
    };
  }

  /**
   * Track any event.
   * @param userId The user's ID.
   * @param event The event.
   * @param event.name The event's name.
   * @param event.properties The event's properties.
   * @param event.id The event's ID.
   * @param event.version The event's version.
   * @param options Options for this Track call.
   */
  track(
    userId: string | undefined,
    event: Event,
    options?: TrackOptions,
  ): CallResponse {
    if (!this.isInitializedAndEnabled()) {
      return { promise: Promise.resolve() };
    }

    const mergedEvent = this.mergeContext(event, this.context);

    return {
      promise: this.validateAndRunOnAllPlugins(
        'track',
        event,
        (p, e) => p.track(userId, mergedEvent, options),
        (p, e, validationResponses) => p.postTrack(
          userId, mergedEvent, validationResponses,
        ),
        this.context,
      ),
    };
  }

  /**
   * Reset (e.g. on logout) all analytics state for the current user and group.
   */
  reset() {
    this.runOnAllPlugins('reset', (p) => p.reset());
  }

  flush(): CallResponse {
    const flushPromises = this.plugins.map(async (plugin) => {
      try {
        await plugin.flush();
      } catch (e) {
        this.logger.error(`Error in ${plugin.id}.flush(). ${e.message}.`);
      }
    });
    return {
      promise: Promise.all(flushPromises).then(),
    };
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
    method: (plugin: Plugin, event: Event) => Promise<unknown>,
    postMethod: (plugin: Plugin, event: Event, validationResponses: ValidationResponse[]) => any,
    context?: Properties,
  ): Promise<void> {
    // #1 validation phase
    let shouldRun = true;

    // invoke validate() on every plugin if required
    let validationResponses: ValidationResponse[] = [];
    if (this.validation !== Validation.Disabled) {
      validationResponses = [
        ...this.validate(event),
        ...context ? this.validate(this.getContextEvent(context)) : [],
      ];
      shouldRun = this.validation === Validation.TrackOnInvalid
        || validationResponses.every((vr) => vr.valid);
    }

    // #2 track phase
    // invoke track(), group(), identify(), page() on every plugin if allowed
    const callPromise = shouldRun
      ? this.runOnAllPluginsAsync(op, async (p) => {
        if (this.canRunEventOnPlugin(event, p)) {
          await method(p, event);
        }
      })
      : Promise.resolve();

    // invoke postTrack(), postGroup(), postIdentify(), postPage() on every plugin
    this.runOnAllPlugins(
      `post${this.capitalize(op)}`,
      (p) => {
        if (this.canRunEventOnPlugin(event, p)) {
          postMethod(p, event, validationResponses);
        }
      },
    );

    // #3 response phase
    if (this.validation === Validation.ErrorOnInvalid) {
      const invalidResult = validationResponses.find((vr) => !vr.valid);
      if (invalidResult) {
        throw new Error(`Validation Error: ${invalidResult.message}`);
      }
    }

    return callPromise;
  }

  private canRunEventOnPlugin(event: Event, plugin: Plugin) {
    return !event.plugins || (event.plugins[plugin.id] ?? true);
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

  private runOnAllPluginsAsync(op: string, method: (p: Plugin) => Promise<unknown>) {
    const promises = this.plugins.map(async (plugin) => {
      try {
        await method(plugin);
      } catch (e) {
        this.logger.error(`Error in ${plugin.id}.${op}(). ${e.message}.`);
      }
    });
    let timeout: ReturnType<typeof setTimeout>;
    return Promise.race([
      Promise.all(promises),
      new Promise((resolve) => {
        timeout = setTimeout(resolve, 3000);
      }),
    ]).then(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
  }

  private capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default Itly;
