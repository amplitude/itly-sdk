// eslint-disable-next-line no-unused-vars
import { ItlyLogger } from '../../dist/index';

export default class CustomLogger implements ItlyLogger {
  static LOG_TAG = 'CustomLogger';

  // eslint-disable-next-line no-console
  log = (level: string, message: string) => console.log(
    `${CustomLogger.LOG_TAG}.${level}:`, message,
  );

  debug = (message: string) => this.log('debug', message);

  info = (message: string) => this.log('info:', message);

  warn = (message: string) => this.log('warn:', message);

  error = (message: string) => this.log('error:', message);
}
