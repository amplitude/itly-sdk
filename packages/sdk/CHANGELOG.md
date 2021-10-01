# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](https://github.com/amplitude/itly-sdk/compare/v2.3.4...v2.4.0) (2021-10-01)


### Bug Fixes

* Node-specific Itly, tests for required parameters for system events ([d1ef618](https://github.com/amplitude/itly-sdk/commit/d1ef618d02fb5bec39bad8951e48d2119d7b0165))
* userId for Node calls can be undefined ([c143444](https://github.com/amplitude/itly-sdk/commit/c143444a168b82b3e58bdff70293868b99de90d4))


### Reverts

* Revert "chore: experimental rename @itly -> @amplitude" ([8cc854b](https://github.com/amplitude/itly-sdk/commit/8cc854bc550b687842d412c21b77deca0dfb962e))





## 2.3.4 (2021-06-29)

**Note:** Version bump only for package @itly/sdk





## 2.3.3 (2021-06-28)

**Note:** Version bump only for package @itly/sdk





## 2.3.2 (2021-06-01)

**Note:** Version bump only for package @itly/sdk





## 2.3.1 (2021-05-21)

**Note:** Version bump only for package @itly/sdk





# [2.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.2...v2.3.0) (2021-05-20)


### Features

* add Validation.SkipOnInvalid ([7203556](https://github.com/iterativelyhq/itly-sdk/commit/720355635f62eaa876edafe1b8e5469f84b7f08a))





## [2.2.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.1...v2.2.2) (2021-05-06)

**Note:** Version bump only for package @itly/sdk





## [2.2.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.0...v2.2.1) (2021-04-24)


### Bug Fixes

* page() - optional 'name' and 'category' parameters ([4776bc5](https://github.com/iterativelyhq/itly-sdk/commit/4776bc5028b59bd59f250b38460220139d4d5e7a))





## [2.0.9](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.8...v2.0.9) (2021-04-01)

**Note:** Version bump only for package @itly/sdk





## [2.0.8](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.7...v2.0.8) (2021-03-25)


### Bug Fixes

* changed type definition to fix TS2411 codegen error: ([1edd1c9](https://github.com/iterativelyhq/itly-sdk/commit/1edd1c9127ca36d3b0ac66f322d00f5c9d6dbd3e))
* isolated CallOptions by Plugin ([da3a3e2](https://github.com/iterativelyhq/itly-sdk/commit/da3a3e26a997c6a0a0a197561a72b32ec49ad36e))





## [2.0.7](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.6...v2.0.7) (2021-03-19)

**Note:** Version bump only for package @itly/sdk





## [2.0.6](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.5...v2.0.6) (2021-03-15)


### Bug Fixes

* renamed LOGGERS.CONSOLE/NONE to Loggers.Console/None ([06b6c78](https://github.com/iterativelyhq/itly-sdk/commit/06b6c783dc5a6ee892981326d95afb8396dcddb3))





## [2.0.5](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.4...v2.0.5) (2021-03-11)


### Bug Fixes

* added stronger types for Node plugin callbacks ([1f86e45](https://github.com/iterativelyhq/itly-sdk/commit/1f86e45bc341d767e9fa4339668913ec9341693f))
* enum ValidationOptions ([e8afd7b](https://github.com/iterativelyhq/itly-sdk/commit/e8afd7ba0edffb0d8a121a238699911c1836f785))
* make destination client getters public in browser plugins ([34c68e3](https://github.com/iterativelyhq/itly-sdk/commit/34c68e3e04364699b49aeb2a51f40e7dd2ebb681))
* renamed ValidationOptions -> Validation ([61b9db1](https://github.com/iterativelyhq/itly-sdk/commit/61b9db183b3c10a8800c29f7c0d37870cb9d414f))


### Features

* added 'call options' for tracking methods ([efa287e](https://github.com/iterativelyhq/itly-sdk/commit/efa287e85ff97309cd279a60cdaf7ebcdf4c5c32))
* added EventOptions and Segment event metadata ([8cd2507](https://github.com/iterativelyhq/itly-sdk/commit/8cd25077b207dfd5c85fac2fe4161edd25f18afb))
* added Snowplow event metadata ([e8a5866](https://github.com/iterativelyhq/itly-sdk/commit/e8a5866911766a5428a956ffbf83b81736da8fa8))





## [2.0.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.1...v2.0.2) (2021-02-26)


### Bug Fixes

* added explicit "files" to package.json files ([3ca0c55](https://github.com/iterativelyhq/itly-sdk/commit/3ca0c55b828c66244a26738571aae5dca31425cf))
* added typed ItlyBrowser and ItlyNode ([77bee56](https://github.com/iterativelyhq/itly-sdk/commit/77bee562676845445e0aa63675990a6c003a3d92))
* request/response logging is moved to 'internal' sub-folder ([e58fedf](https://github.com/iterativelyhq/itly-sdk/commit/e58fedff3d303e3f66b23066c1426e4f846d4181))


### Features

* added base class for plugins that need request/response logging ([f043add](https://github.com/iterativelyhq/itly-sdk/commit/f043add64e59c7662fb251de349e255accb0c477))
* added ESM support ([c265689](https://github.com/iterativelyhq/itly-sdk/commit/c2656892daddb36459e2a061b553890e616d04c2))
* added PluginLogger ([2d8c764](https://github.com/iterativelyhq/itly-sdk/commit/2d8c764eab480e9c392545cf1f77fff5753a2e15))





## [2.0.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.0...v2.0.1) (2021-02-02)


### Bug Fixes

* introduce LoadOptions for itly.load() ([e16eeb8](https://github.com/iterativelyhq/itly-sdk/commit/e16eeb8260419cc8f2ca5c449a8000ea74028e3b))
* renamed options to loadOptions ([43f039d](https://github.com/iterativelyhq/itly-sdk/commit/43f039d33193f6de0917c497eb6f6a94919cd0fa))
* use destructuring for typed object params for itly.load() ([0a91a7a](https://github.com/iterativelyhq/itly-sdk/commit/0a91a7a0d4079e5628d3d03ea733d1a0569a24a6))
* use typed object params for itly.load() ([1d76ce1](https://github.com/iterativelyhq/itly-sdk/commit/1d76ce16a44a52afa7751078d92a2c7a6354e071))





# [2.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.6.0...v2.0.0) (2021-01-20)


### Bug Fixes

* added code docs to all SDK methods ([72b7915](https://github.com/iterativelyhq/itly-sdk/commit/72b7915742fbd0519b471b18c4f00d6d23bccd69))
* added simple README's to all  packages ([b3a6eb2](https://github.com/iterativelyhq/itly-sdk/commit/b3a6eb2f7083f0e6e4107b2aa740e962c77128c6))
* core Itly shouldn’t be a singleton ([79c0e63](https://github.com/iterativelyhq/itly-sdk/commit/79c0e63fb938a6e1741cf36bec477c0733bf7a8e))
* fixed merge conflict with per event destination changes ([7f949ad](https://github.com/iterativelyhq/itly-sdk/commit/7f949ad428b4411aff7d464ff9eae1adc511b263))
* move browser-specific code to browser.ts ([9bac4df](https://github.com/iterativelyhq/itly-sdk/commit/9bac4df9ec19ecf4499ce40882c6efd186cc849e))
* moved code from codegen to SDK ([00ef906](https://github.com/iterativelyhq/itly-sdk/commit/00ef9060cc3d25bfd0c55434728fa2d1a5c1fab1))
* re-export base types in node sdk ([52d470d](https://github.com/iterativelyhq/itly-sdk/commit/52d470d9c24f8baee8276ddd93e5a11ee9f5d930))
* remove getPlugin() method in itly-sdk ([32d4b14](https://github.com/iterativelyhq/itly-sdk/commit/32d4b14195b1bd44d27db8c56a7d4553e81e9137))
* removed unnecessary node.ts ([b5f2006](https://github.com/iterativelyhq/itly-sdk/commit/b5f20062273e61d27a8632e305fc8d822a50d6a5))
* separate context from Options ([dc6aeb6](https://github.com/iterativelyhq/itly-sdk/commit/dc6aeb6d24df060900e6e7c568d9f7854bf621a5))
* update Plugin to accept id in constructor ([86be0ef](https://github.com/iterativelyhq/itly-sdk/commit/86be0ef59b950c68c9f1fa842fbfa70ec9c73bb6))


### Features

* added flush method ([0213284](https://github.com/iterativelyhq/itly-sdk/commit/0213284a8fab0b3f3beb1d12e14358c873d31027))
* flush method returns Promise ([d0aaac7](https://github.com/iterativelyhq/itly-sdk/commit/d0aaac7f5623c0f698b1b9c06875dc9707f2bd58))
* new version 2.0.0 ([8843dc2](https://github.com/iterativelyhq/itly-sdk/commit/8843dc26d6bdb1854101e871007c72d55b27170c))


### BREAKING CHANGES

* separated context from Options in itly.load()
* browser and node Itly no longer a singleton





# [1.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.5.0...v1.6.0) (2020-12-04)


### Features

* add logic for filtering on running event on plugins ([3158050](https://github.com/iterativelyhq/itly-sdk/commit/31580502dbea44415ae88f06b18306eefac74b87))





## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)


### Bug Fixes

* incorporated CR feedback ([ba51695](https://github.com/iterativelyhq/itly-sdk/commit/ba5169552072beeca9e9f268f028cfac71ae67b1))
* make SDK merge context to an event without losing its type ([65d7c72](https://github.com/iterativelyhq/itly-sdk/commit/65d7c72d044dc4bf892041da40a9b123885fb3be))





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)


### Bug Fixes

* made LOGGERS a frozen readonly object ([71ff140](https://github.com/iterativelyhq/itly-sdk/commit/71ff140ba17818944fe2d01635647aec0fa2ed8a))
* wrapped individual plugin method calls in try catch ([932417c](https://github.com/iterativelyhq/itly-sdk/commit/932417c4630e5d51340e8af03bbe50c00b710a74))





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)


### Features

* extended Plugin interface with post* lifecycle methods (ITLY-1041) ([1ea87db](https://github.com/iterativelyhq/itly-sdk/commit/1ea87dba2649ffe9c6a850a98d673de0189844fd))


### BREAKING CHANGES

* validationError method removed, validationErrorHandler removed in plugin-schema-validator





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)


### Bug Fixes

* exposed EventMetadata type in sdk ([7713f07](https://github.com/iterativelyhq/itly-sdk/commit/7713f07bef0d5ee8a1bd3856c2b2e84c0f12a205))
* provided env specific default options for options.validation ([947d44a](https://github.com/iterativelyhq/itly-sdk/commit/947d44afe193416052e828999bc901eb7e7ec809))
* remove mParticle mention from sdk-base Event type ([7bbd330](https://github.com/iterativelyhq/itly-sdk/commit/7bbd330be8d79c641bea1941bca97f0177a70cb3))
* removed itly from MparticleOptions ([39ec98b](https://github.com/iterativelyhq/itly-sdk/commit/39ec98bac3cc25fc211425a746d0e3a5c2b9d181))


### Features

* added a draft of mparticle browser plugin ([ed4ff71](https://github.com/iterativelyhq/itly-sdk/commit/ed4ff71437a51cbcbdb6cfe54960c2c29fae6383))





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)


### Bug Fixes

* improved platform detection in sdk ([1e7aec7](https://github.com/iterativelyhq/itly-sdk/commit/1e7aec720044ffc0f48f0d60121a557e55b17555))





## [1.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.0...v1.1.1) (2020-07-28)

**Note:** Version bump only for package @itly/sdk





# [1.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.0.0...v1.1.0) (2020-07-06)


### Features

* renamed 'sdk-core' 'sdk' ([5e596ab](https://github.com/iterativelyhq/itly-sdk/commit/5e596ab1656e2659684024e665d8e57cca0ef258))





# [1.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.2...v1.0.0) (2020-06-30)


### Bug Fixes

* renamed debugger plugin to iteratively plugin ([265f4ea](https://github.com/iterativelyhq/itly-sdk/commit/265f4eabaa1003df6ee0c2c39c38aeb7bca1205a))





## [0.9.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.1...v0.9.2) (2020-06-17)


### Bug Fixes

* moved all debugger options to debugger plugins ([66407dc](https://github.com/iterativelyhq/itly-sdk/commit/66407dccee5e54ea0402fdfbdbb592fabb7f3627))





## [0.9.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.0...v0.9.1) (2020-06-17)


### Bug Fixes

* added ItlyOptions.DebuggerOptions ([00dee7d](https://github.com/iterativelyhq/itly-sdk/commit/00dee7d7d647f77abf3a31ad97cba7892f6f26e8))





# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* moved plugin setup logic into load() hook rather than constructors ([f704ba4](https://github.com/iterativelyhq/itly-sdk/commit/f704ba485fc50967c8f73498230b88f8553768a5))
* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)


### Bug Fixes

* updated sdk-core to always validate context properties ([b678990](https://github.com/iterativelyhq/itly-sdk/commit/b6789909834cb9939289e3c98fb4b202119eb7ed))





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package @itly/sdk





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* set defaults for ItlyOptions before load(options) callbacks ([066b59b](https://github.com/iterativelyhq/itly-sdk/commit/066b59bf1aaf208f05f800b89e95bb9687361910))
* updated debugger plugin package version (using `lerna bootstrap`) ([f0e0882](https://github.com/iterativelyhq/itly-sdk/commit/f0e088239c2d9f3cd58ace1b1119ba56c56ede01))


### Features

* added test code coverage for sdk-core ([4587a43](https://github.com/iterativelyhq/itly-sdk/commit/4587a43e4aa36a5143e306283537b1f343aca7e9))
* added tests for plugin-ampltude ([13cbbf8](https://github.com/iterativelyhq/itly-sdk/commit/13cbbf8ec7c573e4d2007eead6ad18c232884522))





## [0.7.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.0...v0.7.1) (2020-06-12)


### Bug Fixes

* context properties are now included on all track() events ([5552ea2](https://github.com/iterativelyhq/itly-sdk/commit/5552ea27aea23e0dce26477da91467bf15cddaf5))





# [0.7.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.1...v0.7.0) (2020-06-11)


### Features

* added ValidationOptions.errorOnInvalid ([5e4914b](https://github.com/iterativelyhq/itly-sdk/commit/5e4914b07949686838d2b0af2fb70ede03ed07ec))
* plugin-schema-validator now uses event.name as default schema key ([4c14829](https://github.com/iterativelyhq/itly-sdk/commit/4c148290eb2a4fb98bc84a1be85eafd9d26982d4))





## [0.6.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.0...v0.6.1) (2020-06-09)


### Bug Fixes

* made ItlyEvent properties optional ([5193738](https://github.com/iterativelyhq/itly-sdk/commit/5193738efcc87aa2236d6dbf6dce1f0c14af61c7))





# [0.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.5.0...v0.6.0) (2020-06-09)

**Note:** Version bump only for package @itly/sdk





# [0.5.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.4.0...v0.5.0) (2020-06-09)


### Bug Fixes

* added getPlugin(id: string) to sdk-core and sdk-node ([7e4c82f](https://github.com/iterativelyhq/itly-sdk/commit/7e4c82f115292f6e246200401c61952a87be8168))


### Features

* added ItlyOptions.validationOptions ([7e3bc99](https://github.com/iterativelyhq/itly-sdk/commit/7e3bc998f8a7e1de36bd37a1e3d6cefcf72a6239))





# [0.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.3.0...v0.4.0) (2020-06-06)

**Note:** Version bump only for package @itly/sdk





# [0.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.2.0...v0.3.0) (2020-06-05)


### Features

* renamed @itly/plugin-schema-validator ([e54ec8a](https://github.com/iterativelyhq/itly-sdk/commit/e54ec8a5b2fb20b8c06aab8db356d002d57c40c5))





# [0.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.1...v0.2.0) (2020-06-05)


### Bug Fixes

* Fixed error in plugin validation ([038ea94](https://github.com/iterativelyhq/itly-sdk/commit/038ea94f28050055bbd60c061c47cc6af283d639))


### Features

* Store compiled validators for faster validation ([5a63a74](https://github.com/iterativelyhq/itly-sdk/commit/5a63a74cfbb98e21fffe9f8708652ab5185ec7a3))
* Validation and Destinations are now plugins ([920648c](https://github.com/iterativelyhq/itly-sdk/commit/920648c29757a762c9929fbd748ed8ed5e725045))


### BREAKING CHANGES

* Switch to plugin architecture
