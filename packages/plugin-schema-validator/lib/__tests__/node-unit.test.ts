/**
 * Tests for Node version of plugin-schema-validator
 * @jest-environment node
 */
/* eslint-disable import/no-unresolved */
import SchemaValidatorPlugin from '../index';

const testSchemas = require('../../../../__tests__/data/basic-schema.json');

const systemEvents = ['identify', 'context', 'group', 'page'];

describe('schema found', () => {
  test('valid for a valid event', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'EventMaxIntForTest',
      properties: { intMax10: 5 },
    });
    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });

  test('not valid for an event with invalid property', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'EventMaxIntForTest',
      properties: { intMax10: 11 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Passed in EventMaxIntForTest properties did not validate against your tracking plan. `properties.intMax10` should be <= 10.',
      pluginId: 'schema-validator',
    });
  });

  test('not valid for an event without required property', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'context',
      properties: { optionalEnum: 'Value 1' },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Passed in context properties did not validate against your tracking plan. `properties` should have required property \'requiredString\'.',
      pluginId: 'schema-validator',
    });
  });

  test('not valid for an event with additional property', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'context',
      properties: { requiredString: 'abc', extraNumber: 123 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Passed in context properties did not validate against your tracking plan. `properties` should NOT have additional properties (extraNumber).',
      pluginId: 'schema-validator',
    });
  });
});

describe('schema not found', () => {
  test.each(
    systemEvents,
  )('valid for a system event "%s" without properties', (eventName) => {
    const { [eventName]: _, ...schemas } = testSchemas;
    const plugin = new SchemaValidatorPlugin(schemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: eventName,
    });
    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });

  test.each(
    systemEvents,
  )('not valid for a system event "%s" with properties', (eventName) => {
    const { [eventName]: _, ...schemas } = testSchemas;
    const plugin = new SchemaValidatorPlugin(schemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: eventName,
      properties: { a: 1 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: `'${eventName}' schema is empty but properties were found. properties={"a":1}`,
      pluginId: 'schema-validator',
    });
  });

  test('not valid for an unknown event without properties', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'unknown-event',
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Event unknown-event not found in tracking plan.',
      pluginId: 'schema-validator',
    });
  });

  test('not valid for an unknown event with properties', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'unknown-event',
      properties: { a: 1 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Event unknown-event not found in tracking plan.',
      pluginId: 'schema-validator',
    });
  });
});
