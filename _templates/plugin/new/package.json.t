---
to: packages/plugin-<%= name %>/package.json
---
{
  "name": "@itly/plugin-<%= h.changeCase.lower(name) %>",
  "version": "0.0.0",
  "description": "<%= h.changeCase.title(name) %> Plugin",
  "main": "dist/cjs/index.js",
  "types": "dist/cjs/index.d.ts",
  "module": "dist/esm/index.js",
  "scripts": {
    "prepublish": "yarn run build",
    "build": "tsc -p tsconfig.json && tsc -p tsconfig-esm.json",
    "test": "jest --runInBand"
  },
  "files": [
    "LICENSE",
    "CHANGELOG.md",
    "README.md",
    "dist/",
    "package.json"
  ],
  "keywords": [
    "itly",
    "sdk",
    "iteratively",
    "plugin"
  ],
  "author": "<%= author %>",
  "license": "MIT",
  "homepage": "https://github.com/amplitude/itly-sdk/tree/master/packages/plugin-<%= name %>",
  "bugs": {
    "url": "https://github.com/amplitude/itly-sdk/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/amplitude/itly-sdk.git"
  },
  "devDependencies": {
    "<%= itlySdkModule %>": "<%= itlySdkVersion %>",
    "@types/jest": "^26.0.0",
    "jest": "^26.0.1",
    "ts-jest": "^26.1.0",
    "typescript": "^4.3.5"
  },
  "dependencies": {
  },
  "peerDependencies": {
    "<%= itlySdkModule %>": "<%= itlySdkVersion %>"
  }
}
