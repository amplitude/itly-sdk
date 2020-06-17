---
to: packages/plugin-<%= name %>/lib/__tests__/smoke.test.ts
---
<%
  ClassName = h.changeCase.pascal(name) + 'Plugin'
  VarName = h.changeCase.camel(name) + 'Plugin'
%>
/* eslint-disable no-unused-vars, global-require */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import {
  ItlyOptions, ItlyPlugin, ItlyEvent, ValidationResponse,
} from '@itly/sdk-core';
import CustomPlugin from '../../../../__tests__/src/CustomPlugin';
import {
  TestParams,
  requireForTestEnv,
} from '../../../../__tests__/util';

const <%= ClassName %> = requireForTestEnv(__dirname);

let spyConsoleLog: jest.SpyInstance;
const plugins: ItlyPlugin[] = [
  new <%= ClassName %>(),
];

const testParams: TestParams[] = [
  {
    name: '<%= ClassName %> test',
    options: {
      environment: 'production',
      plugins,
    },
  },
];

beforeEach(() => {
  jest.resetModules();
  spyConsoleLog = jest.spyOn(console, 'log');
});

afterEach(() => {
  spyConsoleLog.mockRestore();
});

test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
  async (name: string, { options }: TestParams) => {
    const { default: itly } = require('@itly/sdk-core');

    itly.load(options);

    expect(spyConsoleLog.mock.calls).toMatchSnapshot();
  });
