/**
 * Tests for Node version of plugin-schema-validator
 * @jest-environment node
 */
/* eslint-disable import/no-unresolved */
import SchemaValidatorPlugin from '../index';

const testSchemas = require('../../../../__tests__/data/basic-schema.json');

const systemEvents = ['identify', 'context', 'group', 'page'];

describe('load', () => {
  test('should not throw error', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    expect(() => plugin.load()).not.toThrow();
  });
});

describe('schema found', () => {
  test('should be valid for a valid event', () => {
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

  test('should not be valid for an event with invalid property', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'EventMaxIntForTest',
      properties: { intMax10: 11 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Passed in EventMaxIntForTest properties did not validate against your tracking plan. `properties.intMax10` must be less than or equal to 10.',
      pluginId: 'schema-validator',
    });
  });

  test('should not be valid for an event without required property', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'context',
      properties: { optionalEnum: 'Value 1' },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Passed in context properties did not validate against your tracking plan. `properties` requires property "requiredString".',
      pluginId: 'schema-validator',
    });
  });

  test('should not be valid for an event with additional property', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'context',
      properties: { requiredString: 'abc', extraNumber: 123 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      message: 'Passed in context properties did not validate against your tracking plan. `properties` is not allowed to have the additional property "extraNumber".',
      pluginId: 'schema-validator',
    });
  });

  test('should be valid for an event without properties if properties were not passed', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event No Properties',
    });

    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });

  test('should be valid for an event without required properties if properties were not passed', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event With Optional Properties',
    });

    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });

  test('should not be valid for an event with required properties if properties were not passed', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event With All Properties',
    });

    expect(validationResponse).toEqual({
      valid: false,
      pluginId: 'schema-validator',
      message: 'Passed in Event With All Properties properties did not validate against your tracking plan. `properties` requires property "requiredConst". `properties` requires property "requiredInteger". `properties` requires property "requiredNumber". `properties` requires property "requiredString". `properties` requires property "requiredArray". `properties` requires property "requiredEnum". `properties` requires property "requiredBoolean".',
    });
  });
});

describe('schema not found', () => {
  test.each(
    systemEvents,
  )('should be valid for a system event "%s" without properties', (eventName) => {
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
  )('should not be valid for a system event "%s" with properties', (eventName) => {
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

  test('should not be valid for an unknown event without properties', () => {
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

  test('should not be valid for an unknown event with properties', () => {
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

describe('event should be valid', () => {
  test('Event No Properties', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event No Properties',
      properties: {},
    });
    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });

  test('Event With All Properties', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event With All Properties',
      properties: {
        optionalString: 'optional-string',
        requiredArray: ['a', 'bc'],
        requiredBoolean: true,
        requiredConst: 'some-const-value',
        requiredEnum: 'Enum1',
        requiredInteger: 123,
        requiredNumber: 45.67,
        requiredString: 'required-string',
      },
    });
    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });

  test('Event Object Types', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event Object Types',
      properties: {
        requiredObject: { a: 1, b: 'zx' },
        requiredObjectArray: [{ a: 1, b: 'zx' }, { a: 2, c: true }],
      },
    });
    expect(validationResponse).toEqual({
      valid: true,
      pluginId: 'schema-validator',
    });
  });
});

describe('event should not be valid', () => {
  test('Event No Properties', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event No Properties',
      properties: { a: 1 },
    });
    expect(validationResponse).toEqual({
      valid: false,
      pluginId: 'schema-validator',
      message: 'Passed in Event No Properties properties did not validate against your tracking plan. `properties` is not allowed to have the additional property "a".',
    });
  });

  test('Event With All Properties', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event With All Properties',
      properties: {
        optionalString: 'optional-string',
        requiredArray: ['a', 'bc'],
        requiredBoolean: true,
        requiredEnum: 'Enum1',
        requiredInteger: 123.45,
        requiredNumber: 45.67,
        requiredString: 'required-string',
        newProp: 'qwerty',
      },
    });
    expect(validationResponse).toEqual({
      valid: false,
      pluginId: 'schema-validator',
      message: 'Passed in Event With All Properties properties did not validate against your tracking plan. `properties.requiredInteger` is not of a type(s) integer. `properties` is not allowed to have the additional property "newProp". `properties` requires property "requiredConst".',
    });
  });

  test('Event Object Types', () => {
    const plugin = new SchemaValidatorPlugin(testSchemas);
    plugin.load();

    const validationResponse = plugin.validate({
      name: 'Event Object Types',
      properties: {
        requiredObject: 123,
        requiredObjectArray: ['zx', 'abc'],
      },
    });
    expect(validationResponse).toEqual({
      valid: false,
      pluginId: 'schema-validator',
      message: 'Passed in Event Object Types properties did not validate against your tracking plan. `properties.requiredObject` is not of a type(s) object. `properties.requiredObjectArray[0]` is not of a type(s) object. `properties.requiredObjectArray[1]` is not of a type(s) object.',
    });
  });
});
