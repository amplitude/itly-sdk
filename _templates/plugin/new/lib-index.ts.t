---
to: packages/plugin-<%= name %>/lib/index.ts
---
<%
  ClassName = h.changeCase.pascal(name) + 'Plugin'
%>
/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Options, Event, Properties, Plugin,
} from '<%= itlySdkModule %>';

export default class <%= ClassName %> extends Plugin {
  constructor() {
    super('<%= name %>');
  }
}
