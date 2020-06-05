---
to: packages/plugin-<%= name %>/lib/index.ts
---
<%
  ClassName = h.changeCase.pascal(name) + 'Plugin'
%>
/* eslint-disable no-unused-vars, class-methods-use-this */
import { ItlyOptions, ItlyProperties, ItlyPluginBase } from '<%= itlySdkModule %>';

export default class <%= ClassName %> extends ItlyPluginBase {
  static ID: string = '<%= name %>';

  id = () => <%= ClassName %>.ID;
}
