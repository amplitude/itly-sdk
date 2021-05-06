# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.1...v2.2.2) (2021-05-06)

**Note:** Version bump only for package @itly/plugin-iteratively





## [2.2.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.0...v2.2.1) (2021-04-24)

**Note:** Version bump only for package @itly/plugin-iteratively





# [2.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.1.0...v2.2.0) (2021-04-08)

**Note:** Version bump only for package @itly/plugin-iteratively





# [2.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.9...v2.1.0) (2021-04-01)


### Features

* added data plane support to Iteratively plugin ([88557ad](https://github.com/iterativelyhq/itly-sdk/commit/88557ad83b8e6d3f0bf64bcffbd868435b1ad3a5))





## [2.0.9](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.8...v2.0.9) (2021-04-01)

**Note:** Version bump only for package @itly/plugin-iteratively





## [2.0.8](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.7...v2.0.8) (2021-03-25)

**Note:** Version bump only for package @itly/plugin-iteratively





## [2.0.7](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.6...v2.0.7) (2021-03-19)

**Note:** Version bump only for package @itly/plugin-iteratively





## [2.0.6](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.5...v2.0.6) (2021-03-15)

**Note:** Version bump only for package @itly/plugin-iteratively





## [2.0.5](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.4...v2.0.5) (2021-03-11)


### Features

* added partial IterativelyOptions ([7fef3eb](https://github.com/iterativelyhq/itly-sdk/commit/7fef3ebb78598849a265592a9b51655af5ff3b96))





## [2.0.4](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.3...v2.0.4) (2021-03-08)


### Bug Fixes

* log http response statuses ([06691e7](https://github.com/iterativelyhq/itly-sdk/commit/06691e7f70054e66127d57c37656cfd1d018305e))





## [2.0.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.1...v2.0.2) (2021-02-26)


### Bug Fixes

* added explicit "files" to package.json files ([3ca0c55](https://github.com/iterativelyhq/itly-sdk/commit/3ca0c55b828c66244a26738571aae5dca31425cf))
* added typed ItlyBrowser and ItlyNode ([77bee56](https://github.com/iterativelyhq/itly-sdk/commit/77bee562676845445e0aa63675990a6c003a3d92))


### Features

* added base class for plugins that need request/response logging ([f043add](https://github.com/iterativelyhq/itly-sdk/commit/f043add64e59c7662fb251de349e255accb0c477))
* added ESM support ([c265689](https://github.com/iterativelyhq/itly-sdk/commit/c2656892daddb36459e2a061b553890e616d04c2))
* added PluginLogger ([2d8c764](https://github.com/iterativelyhq/itly-sdk/commit/2d8c764eab480e9c392545cf1f77fff5753a2e15))
* log Iteratively requests ([c907b2a](https://github.com/iterativelyhq/itly-sdk/commit/c907b2a1b8c53ae943c1316c45d29aa0709c0b19))





## [2.0.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.0...v2.0.1) (2021-02-02)


### Bug Fixes

* introduce LoadOptions for itly.load() ([e16eeb8](https://github.com/iterativelyhq/itly-sdk/commit/e16eeb8260419cc8f2ca5c449a8000ea74028e3b))
* use typed object params for itly.load() ([1d76ce1](https://github.com/iterativelyhq/itly-sdk/commit/1d76ce16a44a52afa7751078d92a2c7a6354e071))





# [2.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.6.0...v2.0.0) (2021-01-20)


### Bug Fixes

* added " for Iteratively SDK" suffix to plugin titles/descriptions ([12876a5](https://github.com/iterativelyhq/itly-sdk/commit/12876a508ae19006d76374b9bf48dfd0d9eb94af))
* added explicit exports in addition to default exports ([401637e](https://github.com/iterativelyhq/itly-sdk/commit/401637e61ee63714d4db1ccabebfa31b73c15842))
* added simple README's to all  packages ([b3a6eb2](https://github.com/iterativelyhq/itly-sdk/commit/b3a6eb2f7083f0e6e4107b2aa740e962c77128c6))
* core Itly shouldn’t be a singleton ([79c0e63](https://github.com/iterativelyhq/itly-sdk/commit/79c0e63fb938a6e1741cf36bec477c0733bf7a8e))
* removed the Node and Browser terms from all the Plugin class names ([a1e2f4b](https://github.com/iterativelyhq/itly-sdk/commit/a1e2f4b74dd4c879c28eba18e583557c1c763b92))
* separate context from Options ([dc6aeb6](https://github.com/iterativelyhq/itly-sdk/commit/dc6aeb6d24df060900e6e7c568d9f7854bf621a5))
* update Plugin to accept id in constructor ([86be0ef](https://github.com/iterativelyhq/itly-sdk/commit/86be0ef59b950c68c9f1fa842fbfa70ec9c73bb6))


### Features

* added flush method ([0213284](https://github.com/iterativelyhq/itly-sdk/commit/0213284a8fab0b3f3beb1d12e14358c873d31027))
* new version 2.0.0 ([8843dc2](https://github.com/iterativelyhq/itly-sdk/commit/8843dc26d6bdb1854101e871007c72d55b27170c))


### BREAKING CHANGES

* separated context from Options in itly.load()
* browser and node Itly no longer a singleton





# [1.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.5.0...v1.6.0) (2020-12-04)

**Note:** Version bump only for package @itly/plugin-iteratively





## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)

**Note:** Version bump only for package @itly/plugin-iteratively





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)

**Note:** Version bump only for package @itly/plugin-iteratively





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)


### Features

* extended Plugin interface with post* lifecycle methods (ITLY-1041) ([1ea87db](https://github.com/iterativelyhq/itly-sdk/commit/1ea87dba2649ffe9c6a850a98d673de0189844fd))


### BREAKING CHANGES

* validationError method removed, validationErrorHandler removed in plugin-schema-validator





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)

**Note:** Version bump only for package @itly/plugin-iteratively





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)

**Note:** Version bump only for package @itly/plugin-iteratively





## [1.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.0...v1.1.1) (2020-07-28)


### Bug Fixes

* removed buffer check loop from plugin-iteratively-node ([1f3c4dc](https://github.com/iterativelyhq/itly-sdk/commit/1f3c4dc7dd0f6b1b18b07e849e97d0f58ba7d6ef))





# [1.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.0.0...v1.1.0) (2020-07-06)


### Features

* renamed 'sdk-core' 'sdk' ([5e596ab](https://github.com/iterativelyhq/itly-sdk/commit/5e596ab1656e2659684024e665d8e57cca0ef258))





# [1.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.2...v1.0.0) (2020-06-30)


### Bug Fixes

* renamed debugger plugin to iteratively plugin ([265f4ea](https://github.com/iterativelyhq/itly-sdk/commit/265f4eabaa1003df6ee0c2c39c38aeb7bca1205a))
* renamed redactValues -> omitValues in IterativelyOptions ([1583335](https://github.com/iterativelyhq/itly-sdk/commit/15833356fe706512e9a171df085354928ba75eaa))
* unified iteratively plugin ids for node & browser ([b0e199a](https://github.com/iterativelyhq/itly-sdk/commit/b0e199aa2a0d0ee49696dd644a4dca7252805c33))





## [0.9.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.1...v0.9.2) (2020-06-17)


### Bug Fixes

* moved all debugger options to debugger plugins ([66407dc](https://github.com/iterativelyhq/itly-sdk/commit/66407dccee5e54ea0402fdfbdbb592fabb7f3627))





## [0.9.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.0...v0.9.1) (2020-06-17)


### Bug Fixes

* added ItlyOptions.DebuggerOptions ([00dee7d](https://github.com/iterativelyhq/itly-sdk/commit/00dee7d7d647f77abf3a31ad97cba7892f6f26e8))
* updated debugger plugins to initialize in load (vs constructor) ([dc591a5](https://github.com/iterativelyhq/itly-sdk/commit/dc591a556df87245c6d157a8d6e2dbec6945e1ff))





# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)

**Note:** Version bump only for package @itly/plugin-debugger





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package @itly/plugin-debugger





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* updated debugger plugin package version (using `lerna bootstrap`) ([f0e0882](https://github.com/iterativelyhq/itly-sdk/commit/f0e088239c2d9f3cd58ace1b1119ba56c56ede01))


### Features

* added debugger plugin, draft for browser ([c013b5f](https://github.com/iterativelyhq/itly-sdk/commit/c013b5f6ee92d6eddae2e9d48fb2793b569136d4))
* added debugger-node plugin, draft for nodejs (requires node-fetch) ([655e02b](https://github.com/iterativelyhq/itly-sdk/commit/655e02bf75393bf057f27c88fd624eead7edc8fd))
