---
to: packages/plugin-<%= name %>/package.json
---
{
  "name": "@itly/plugin-<%= h.changeCase.lower(name) %>",
  "version": "0.0.0",
  "description": "<%= h.changeCase.title(name) %> Plugin",
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
    "plugin"
  ],
  "author": "<%= author %>",
  "license": "ISC",
  "devDependencies": {
    "<%= itlySdkModule %>": "<%= itlySdkVersion %>",
    "@types/jest": "^26.0.0",
    "jest": "^26.0.1",
    "ts-jest": "^26.1.0",
    "typescript": "^3.9.3"
  },
  "dependencies": {
  },
  "peerDependencies": {
    "<%= itlySdkModule %>": "<%= itlySdkVersion %>"
  }
}
