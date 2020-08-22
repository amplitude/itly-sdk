# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)

**Note:** Version bump only for package @itly/plugin-iteratively-node





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)

**Note:** Version bump only for package @itly/plugin-iteratively-node





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

**Note:** Version bump only for package @itly/plugin-debugger-node





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package @itly/plugin-debugger-node





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* updated debugger plugin package version (using `lerna bootstrap`) ([f0e0882](https://github.com/iterativelyhq/itly-sdk/commit/f0e088239c2d9f3cd58ace1b1119ba56c56ede01))


### Features

* added debugger-node plugin, draft for nodejs (requires node-fetch) ([655e02b](https://github.com/iterativelyhq/itly-sdk/commit/655e02bf75393bf057f27c88fd624eead7edc8fd))
