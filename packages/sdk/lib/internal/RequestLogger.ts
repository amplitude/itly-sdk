/* eslint-disable no-unused-vars, max-classes-per-file, import/no-unresolved */
import { Logger, Plugin, PluginLoadOptions } from '../base';

export type ResponseLogger = {
  success: (data?: string) => void;
  error: (data?: string) => void;
};

export class RequestLogger implements Logger {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly plugin: Plugin,
    private readonly logger: Logger,
    // eslint-disable-next-line no-empty-function
  ) { }

  logRequest(action: string, requestData?: string): ResponseLogger {
    const {
      logger,
      plugin: { id },
    } = this;
    const requestId = +new Date();
    logger.debug(`${id}: ${action}(request) ${requestId}: ${requestData || ''}`);
    return {
      success: (data?: string) =>
        logger.debug(`${id}: ${action}(response) ${requestId}: ${data || ''}`),
      error: (data?: string) =>
        logger.error(`${id}: ${action}(response) ${requestId}: ${data || ''}`),
    };
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}

/**
 * Base class for Plugin's that need request/response logging
 */
export abstract class RequestLoggerPlugin extends Plugin {
  private requestLogger: RequestLogger | undefined;

  get logger(): RequestLogger {
    return this.requestLogger!;
  }

  load(options: PluginLoadOptions): void {
    this.requestLogger = new RequestLogger(this, options.logger);
  }
}
