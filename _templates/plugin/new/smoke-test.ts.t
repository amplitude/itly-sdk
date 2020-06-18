---
to: packages/plugin-<%= name %>/lib/__tests__/smoke.test.ts
---
<%
  ClassName = h.changeCase.pascal(name) + 'Plugin'
  VarName = h.changeCase.camel(name) + 'Plugin'
%>
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';

const <%= ClassName %> = requireForTestEnv(__dirname);

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = require('<%= itlySdkModule %>').default;
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const <%= VarName %> = new <%= ClassName %>();

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [<%= VarName %>],
    });
  }).not.toThrow();
});
