---
to: packages/sdk-<%= name %>/package.json
---
{
  "name": "@itly/sdk-<%= h.changeCase.lower(name) %>",
  "version": "0.0.0",
  "description": "<%= h.changeCase.title(name) %> Iteratively SDK ",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "prepublish": "yarn run build",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "itly",
    "sdk",
    "iteratively",
    "sdk"
  ],
  "author": "<%= author %>",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^3.9.3"
  },
  "dependencies": {
    "<%= itlySdkModule %>": "<%= itlySdkVersion %>"
  }
}
