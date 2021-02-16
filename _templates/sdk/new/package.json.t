---
to: packages/sdk-<%= name %>/package.json
---
{
  "name": "@itly/sdk-<%= h.changeCase.lower(name) %>",
  "version": "0.0.0",
  "description": "<%= h.changeCase.title(name) %> Iteratively SDK ",
  "main": "dist/cjs/index.js",
  "types": "dist/cjs/index.d.ts",
  "module": "dist/esm/index.js",
  "scripts": {
    "prepublish": "tsc -p tsconfig.json && tsc -p tsconfig-esm.json",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
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
