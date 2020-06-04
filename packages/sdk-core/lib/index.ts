import Ajv from 'ajv';

export interface ItlyLogger {
    debug: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
}

export interface ItlyCoreOptions {
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
    destinations?: ItlyDestination[];
    /**
     * Additional context properties to add to all events. Set to object or an object resolver.
     * Default is none.
     */
    context?: ItlyProperties,
    /**
     * Custom logger to use for debug, info, warn, and error messages. Default is console.
     */
    logger?: ItlyLogger;
}

export interface ItlyOptions extends ItlyCoreOptions {
    /**
     * Schemas indexed by eventId
     */
    schemas: { [eventId: string]: any };
    /**
     * Analytics provider-specific configuration. Default is null.
     */
    destinations: ItlyDestination[];
}

export type ItlyProperties = {
    [name: string]: any;
};

export interface ItlyDestination {
    id(): string;
    init(): void;
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
    track(
        userId: string | undefined,
        eventName: string,
        properties: ItlyProperties,
        eventId: string,
        eventVersion: string
    ): void;
    reset(): void;
}

const LOG_TAG = '[itly]';
const defaultLogger: ItlyLogger = {
  // eslint-disable-next-line no-console
  debug: (message) => console.debug(LOG_TAG, message),
  // eslint-disable-next-line no-console
  info: (message) => console.info(LOG_TAG, message),
  // eslint-disable-next-line no-console
  warn: (message) => console.warn(LOG_TAG, message),
  // eslint-disable-next-line no-console
  error: (message) => console.error(LOG_TAG, message),
};

class Itly {
    private options: ItlyOptions | undefined = undefined;

    private destinations: ItlyDestination[] = [];

    private logger: ItlyLogger = defaultLogger;

    private schemas: any;

    private validators: { [eventId: string]: any } = {};

    private ajv: any;

    load(options: ItlyOptions) {
      if (this.options) {
        throw new Error('Itly is already initialized.');
      }

      this.options = options;

      if (!this.isInitializedAndEnabled()) {
        return;
      }

      if (options.logger) this.logger = options.logger;

      this.schemas = options.schemas;
      this.ajv = new Ajv();

      if (options.context) {
        this.validate('context', 'context', options.context);
      }

      this.destinations = options.destinations;

      this.destinations.forEach((d) => d.init());
    }

    alias(userId: string, previousId?: string) {
      if (!this.isInitializedAndEnabled()) {
        return;
      }

      this.destinations.forEach((d) => d.alias(userId, previousId));
    }

    /**
     * Identify a user and set or update that user's properties.
     * @param userId The user's ID.
     */
    identify(userId: string | undefined, identifyProperties?: ItlyProperties) {
      if (!this.isInitializedAndEnabled()) {
        return;
      }

      this.validate('identify', 'identify', identifyProperties);

      this.destinations.forEach((d) => d.identify(userId, identifyProperties));
    }

    group(userId:string | undefined, groupId: string, groupProperties?: ItlyProperties) {
      if (!this.isInitializedAndEnabled()) {
        return;
      }

      this.validate('group', 'group', groupProperties);

      this.destinations.forEach((d) => d.group(userId, groupId, groupProperties));
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

      this.validate('page', 'page', pageProperties);

      this.destinations.forEach((d) => d.page(userId, category, name, pageProperties));
    }

    track(
      userId: string | undefined,
      eventName: string,
      properties: ItlyProperties | undefined,
      eventId: string,
      eventVersion: string,
    ) {
      if (!this.isInitializedAndEnabled()) {
        return;
      }

      this.logger.debug(`[Itly] Tracking event "${eventName}"`);

      this.validate(eventName, eventId, properties);

      this.destinations.forEach((d) => d.track(
        userId, eventName, { ...properties }, eventId, eventVersion,
      ));
    }

    reset() {
      this.destinations.forEach((d) => d.reset());
    }

    private validate(
      name: string,
      eventId: string,
      properties?: ItlyProperties,
    ) {
      // Check that we have a schema for this event
      if (!this.schemas[eventId]) {
        this.handleValidationError(`Event ${name} not found in tracking plan.`);
        return;
      }

      // Compile validator for this event if needed
      if (!this.validators[eventId]) {
        this.validators[eventId] = this.ajv.compile(this.schemas[eventId]);
      }

      const validator = (this.validators[eventId]);
      if (properties && !(validator(properties) === true)) {
        const errors = validator.errors.map((e: any) => {
          let extra = '';
          if (e.keyword === 'additionalProperties') {
            extra = ` (${e.params.additionalProperty})`;
          }
          return `\`properties${e.dataPath}\` ${e.message}${extra}.`;
        }).join(' ');
        this.handleValidationError(`Passed in ${name} properties did not validate against your tracking plan. ${errors}`);
      }
    }

    private isInitializedAndEnabled() {
      if (!this.options) {
        throw new Error('Itly is not yet initialized. Have you called `itly.init()` on app start?');
      }

      return !this.options.disabled;
    }

    private handleValidationError(message: string) {
      if (this.options!.environment === 'production') {
        this.logger.error(message);
      } else {
        throw new Error(message);
      }
    }
}

export default new Itly();
