/* eslint-disable no-unused-vars, class-methods-use-this */
import { Validator } from 'jsonschema';
import {
  Event,
  Plugin,
  ValidationResponse,
} from '@itly/sdk';

export type SchemaMap = { [schemaKey: string]: any };

const SYSTEM_EVENTS = ['identify', 'context', 'group', 'page'];
function isSystemEvent(name: string) {
  return SYSTEM_EVENTS.includes(name);
}

function isEmpty(obj: any) {
  return obj === undefined || Object.keys(obj).length === 0;
}

/**
 * Schema Validator Plugin for Iteratively SDK
 */
export class SchemaValidatorPlugin extends Plugin {
  private validator?: Validator;

  constructor(
    private schemas: SchemaMap,
  ) {
    super('schema-validator');
  }

  // overrides Plugin.load
  load() {
    this.validator = new Validator();
  }

  // overrides Plugin.validate
  validate(event: Event): ValidationResponse {
    const schemaKey = this.getSchemaKey(event);
    const schema = this.schemas[schemaKey];
    // Check that we have a schema for this event
    if (!schema) {
      if (isSystemEvent(schemaKey)) {
        // pass system events by default
        if (isEmpty(event.properties)) {
          return {
            valid: true,
            pluginId: this.id,
          };
        }

        return {
          valid: false,
          message: `'${event.name}' schema is empty but properties were found. properties=${JSON.stringify(event.properties)}`,
          pluginId: this.id,
        };
      }

      return {
        valid: false,
        message: `Event ${event.name} not found in tracking plan.`,
        pluginId: this.id,
      };
    }

    const result = this.validator!.validate(event.properties ?? {}, schema);
    if (!result.valid) {
      const errorMessage = result.errors.length > 0
        ? result.errors.map((e: any) => `\`${e.property.replace(/\binstance/, 'properties')}\` ${e.message}.`).join(' ')
        : 'An unknown error occurred during validation.';

      return {
        valid: false,
        message: `Passed in ${event.name} properties did not validate against your tracking plan. ${errorMessage}`,
        pluginId: this.id,
      };
    }

    return {
      valid: true,
      pluginId: this.id,
    };
  }

  getSchemaKey(event: Event) {
    return event.name;
  }
}

export default SchemaValidatorPlugin;
