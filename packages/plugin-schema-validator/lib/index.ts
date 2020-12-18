
/* eslint-disable no-unused-vars, class-methods-use-this */
import Ajv from 'ajv';
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
  private ajv?: Ajv.Ajv;

  private validators?: { [schemaKey: string]: Ajv.ValidateFunction };

  constructor(
    private schemas: SchemaMap,
  ) {
    super('schema-validator');
  }

  // overrides Plugin.load
  load() {
    this.ajv = new Ajv();
    this.validators = {};
  }

  // overrides Plugin.validate
  validate(event: Event): ValidationResponse {
    const schemaKey = this.getSchemaKey(event);
    // Check that we have a schema for this event
    if (!this.schemas[schemaKey]) {
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

    // Compile validator for this event if needed
    const validators = this.validators!;
    if (!validators[schemaKey]) {
      validators[schemaKey] = this.ajv!.compile(this.schemas[schemaKey]);
    }

    const validator = validators[schemaKey]!;
    if (event.properties && !(validator(event.properties) === true)) {
      const errorMessage = validator.errors
        ? validator.errors.map((e: any) => {
          let extra = '';
          if (e.keyword === 'additionalProperties') {
            extra = ` (${e.params.additionalProperty})`;
          }
          return `\`properties${e.dataPath}\` ${e.message}${extra}.`;
        }).join(' ')
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
