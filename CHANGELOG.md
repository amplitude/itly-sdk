# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](https://github.com/amplitude/itly-sdk/compare/v2.3.4...v2.4.0) (2021-10-01)


### Bug Fixes

* Node-specific Itly, tests for required parameters for system events ([d1ef618](https://github.com/amplitude/itly-sdk/commit/d1ef618d02fb5bec39bad8951e48d2119d7b0165))
* userId for Node calls can be undefined ([c143444](https://github.com/amplitude/itly-sdk/commit/c143444a168b82b3e58bdff70293868b99de90d4))


### Features

* bump up amplitude sdk version to support observe ([f31e6df](https://github.com/amplitude/itly-sdk/commit/f31e6dfa13ae14d2a4d436a4c49bdb2e30924148))


### Reverts

* Revert "chore: experimental rename @itly -> @amplitude" ([8cc854b](https://github.com/amplitude/itly-sdk/commit/8cc854bc550b687842d412c21b77deca0dfb962e))
* Revert "chore: explicit scope" ([ff63d07](https://github.com/amplitude/itly-sdk/commit/ff63d076d46d7d8be31ec3323e4c70fa3bad5d49))





## 2.3.4 (2021-06-29)

**Note:** Version bump only for package root





## 2.3.3 (2021-06-28)

**Note:** Version bump only for package root





## 2.3.2 (2021-06-01)

**Note:** Version bump only for package root





## 2.3.1 (2021-05-21)

**Note:** Version bump only for package root





# [2.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.2...v2.3.0) (2021-05-20)


### Bug Fixes

* add empty object for rn-snowplow if there is no properties ([d16a3d1](https://github.com/iterativelyhq/itly-sdk/commit/d16a3d18da50703d1edac1fb99040bfd2f46b9c5))
* always send object in 'data' field in snowplow-plugin ([7765ae8](https://github.com/iterativelyhq/itly-sdk/commit/7765ae83477d572ce8247835b920c1acbac4dcdd))
* extended Segment options/integrations to support any keys/values ([55b8ea7](https://github.com/iterativelyhq/itly-sdk/commit/55b8ea78605902fe6d528c8c3cb73796cfeac96b))


### Features

* add Validation.SkipOnInvalid ([7203556](https://github.com/iterativelyhq/itly-sdk/commit/720355635f62eaa876edafe1b8e5469f84b7f08a))





## [2.2.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.1...v2.2.2) (2021-05-06)


### Bug Fixes

* made Snowplow tracker name, creation, and filtering configurable ([1676565](https://github.com/iterativelyhq/itly-sdk/commit/1676565a73d364701aa7ae31a7c0baa3abed04a6))
* set predefined user attributes with setATTRIBUTE() methods ([85d699e](https://github.com/iterativelyhq/itly-sdk/commit/85d699ebc4e6cb5612583e16402134a0afd4b0e8))





## [2.2.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.0...v2.2.1) (2021-04-24)


### Bug Fixes

* page() - optional 'name' and 'category' parameters ([4776bc5](https://github.com/iterativelyhq/itly-sdk/commit/4776bc5028b59bd59f250b38460220139d4d5e7a))
* set Braze user email from identify properties ([310dcd7](https://github.com/iterativelyhq/itly-sdk/commit/310dcd7af04e89e9be0a6ec672e32f30b18cf216))





# [2.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.1.0...v2.2.0) (2021-04-08)


### Features

* add basic Google Analytics GTAG plugin ([e108fec](https://github.com/iterativelyhq/itly-sdk/commit/e108fec16c423ff64d3dd0664dc86f2c298aea77))





# [2.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.9...v2.1.0) (2021-04-01)


### Features

* added data plane support to Iteratively plugin ([88557ad](https://github.com/iterativelyhq/itly-sdk/commit/88557ad83b8e6d3f0bf64bcffbd868435b1ad3a5))





## [2.0.9](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.8...v2.0.9) (2021-04-01)


### Bug Fixes

* send Braze event properties as a nested object ([f34826d](https://github.com/iterativelyhq/itly-sdk/commit/f34826d0cb02d355309eef522648e3c3790847ac))





## [2.0.8](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.7...v2.0.8) (2021-03-25)


### Bug Fixes

* changed type definition to fix TS2411 codegen error: ([1edd1c9](https://github.com/iterativelyhq/itly-sdk/commit/1edd1c9127ca36d3b0ac66f322d00f5c9d6dbd3e))
* isolated CallOptions by Plugin ([da3a3e2](https://github.com/iterativelyhq/itly-sdk/commit/da3a3e26a997c6a0a0a197561a72b32ec49ad36e))





## [2.0.7](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.6...v2.0.7) (2021-03-19)


### Bug Fixes

* updated React Native README files ([d394f86](https://github.com/iterativelyhq/itly-sdk/commit/d394f86b6273e7440e0800a3aab94f548c926c53))





## [2.0.6](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.5...v2.0.6) (2021-03-15)


### Bug Fixes

* empty CallOptions if they are unused ([98f0d3c](https://github.com/iterativelyhq/itly-sdk/commit/98f0d3c67f2b97c1bc1b13ca9e3fe749e1c37108))
* installation/initialization steps for mParticle React Native plugin ([e7a6cc1](https://github.com/iterativelyhq/itly-sdk/commit/e7a6cc14bbadd7079beeacc0feb458d470385e92))
* installation/initialization steps for Snowplow React Native plugin ([4dd10cd](https://github.com/iterativelyhq/itly-sdk/commit/4dd10cd13cdf3c680ff5a5e852db0da87b2c0937))
* renamed LOGGERS.CONSOLE/NONE to Loggers.Console/None ([06b6c78](https://github.com/iterativelyhq/itly-sdk/commit/06b6c783dc5a6ee892981326d95afb8396dcddb3))
* updated Snowplow version ([ea91bf5](https://github.com/iterativelyhq/itly-sdk/commit/ea91bf54c094e087669e568a36a73c0a04799a05))


### Features

* added mParticle plugin for React Native ([1e536b4](https://github.com/iterativelyhq/itly-sdk/commit/1e536b4cd57bcbc2beec3dededecec7611c00f77))
* added Segment plugin for React Native ([b84cf60](https://github.com/iterativelyhq/itly-sdk/commit/b84cf60bb02dcd00a03d033d0b58d82a10ac5a15))
* added Snowplow plugin for React Native ([f54be5b](https://github.com/iterativelyhq/itly-sdk/commit/f54be5b60c77a7e591e10996d3b0e359c9628e2e))





## [2.0.5](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.4...v2.0.5) (2021-03-11)


### Bug Fixes

* added stronger types for Node plugin callbacks ([1f86e45](https://github.com/iterativelyhq/itly-sdk/commit/1f86e45bc341d767e9fa4339668913ec9341693f))
* don't log Amplitude identify request/response if properties is null ([8691895](https://github.com/iterativelyhq/itly-sdk/commit/8691895216999419d9af7f547e8cee6935e46fb3))
* enum ValidationOptions ([e8afd7b](https://github.com/iterativelyhq/itly-sdk/commit/e8afd7ba0edffb0d8a121a238699911c1836f785))
* fixed broken tests after merge ([60d2eef](https://github.com/iterativelyhq/itly-sdk/commit/60d2eeffdb8d3c061b2e38d6bbb9e5a04f167704))
* load mParticle browser code from CDN ([2cddf8b](https://github.com/iterativelyhq/itly-sdk/commit/2cddf8b91e546550ff8eb6de8ef608b1c13b8933))
* make destination client getters public in browser plugins ([34c68e3](https://github.com/iterativelyhq/itly-sdk/commit/34c68e3e04364699b49aeb2a51f40e7dd2ebb681))
* reduced log/callback code duplication ([eb5f19f](https://github.com/iterativelyhq/itly-sdk/commit/eb5f19fcdd25ca1fe3fd5d38b3a7f061c17a9111))
* renamed ValidationOptions -> Validation ([61b9db1](https://github.com/iterativelyhq/itly-sdk/commit/61b9db183b3c10a8800c29f7c0d37870cb9d414f))
* restored shallow copy for event properties ([2ebf1db](https://github.com/iterativelyhq/itly-sdk/commit/2ebf1dbe12d9ac552e6118128ed2a95f805ef7ad))
* separated Segment node track fields from callback ([4e91aaa](https://github.com/iterativelyhq/itly-sdk/commit/4e91aaa51344a435eb1dd03f5f831c75287f9b36))
* use official @mparticle/web-sdk package ([9069c5c](https://github.com/iterativelyhq/itly-sdk/commit/9069c5c95e52aca25ddc16ec5709fda6ee0ca75e))


### Features

* added 'call options' for tracking methods ([efa287e](https://github.com/iterativelyhq/itly-sdk/commit/efa287e85ff97309cd279a60cdaf7ebcdf4c5c32))
* added callbacks to tracking methods ([fac00d9](https://github.com/iterativelyhq/itly-sdk/commit/fac00d9672e3d5db1bd47c2251e99fe6275dcf64))
* added EventOptions and Segment event metadata ([8cd2507](https://github.com/iterativelyhq/itly-sdk/commit/8cd25077b207dfd5c85fac2fe4161edd25f18afb))
* added partial IterativelyOptions ([7fef3eb](https://github.com/iterativelyhq/itly-sdk/commit/7fef3ebb78598849a265592a9b51655af5ff3b96))
* added Snowplow event metadata ([e8a5866](https://github.com/iterativelyhq/itly-sdk/commit/e8a5866911766a5428a956ffbf83b81736da8fa8))





## [2.0.4](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.3...v2.0.4) (2021-03-08)


### Bug Fixes

* log http response statuses ([06691e7](https://github.com/iterativelyhq/itly-sdk/commit/06691e7f70054e66127d57c37656cfd1d018305e))
* removed "_update_existing_only=true" for Braze event tracking ([6090771](https://github.com/iterativelyhq/itly-sdk/commit/6090771403356e905ae3dd8e5d6137a126ba5c40))





## [2.0.3](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.2...v2.0.3) (2021-03-05)


### Bug Fixes

* added default export for Braze plugins ([5572624](https://github.com/iterativelyhq/itly-sdk/commit/55726246032d7e7abbbad891db3bc3276dce984c))
* added default export for Firebase plugin ([1b66ed0](https://github.com/iterativelyhq/itly-sdk/commit/1b66ed094c1924a725a76874538c5605049b628e))
* added reset() implementation for the Firebase plugin ([e4dd372](https://github.com/iterativelyhq/itly-sdk/commit/e4dd372c49af6c221734b1f3469880fabf7c42ac))
* load Braze browser code from CDN, removed code duplication ([0158006](https://github.com/iterativelyhq/itly-sdk/commit/0158006984a3dd63d092bf966af196ea0e5c75e9))
* made FirebaseOptions optional ([eafa7fa](https://github.com/iterativelyhq/itly-sdk/commit/eafa7fa15d82db51aa324338f7457257e2078e77))
* package dependencies ([5386c7a](https://github.com/iterativelyhq/itly-sdk/commit/5386c7ac7c9c9499b390e584a0ef4a3030dc1f94))


### Features

* added Braze plugins (initial version) ([ee33e40](https://github.com/iterativelyhq/itly-sdk/commit/ee33e40ba4f2af56b8de75c8314f8a72bd615e60))
* added Firebase plugin (initial version) ([c6d74bf](https://github.com/iterativelyhq/itly-sdk/commit/c6d74bf548358b856385821f66f5110f84eef55b))





## [2.0.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.1...v2.0.2) (2021-02-26)


### Bug Fixes

* actualized path to 'dist' import path ([e7c221e](https://github.com/iterativelyhq/itly-sdk/commit/e7c221e1fd480794788c39e9f8d19cbc8fdca3ba))
* added explicit "files" to package.json files ([3ca0c55](https://github.com/iterativelyhq/itly-sdk/commit/3ca0c55b828c66244a26738571aae5dca31425cf))
* added typed ItlyBrowser and ItlyNode ([77bee56](https://github.com/iterativelyhq/itly-sdk/commit/77bee562676845445e0aa63675990a6c003a3d92))
* request/response logging is moved to 'internal' sub-folder ([e58fedf](https://github.com/iterativelyhq/itly-sdk/commit/e58fedff3d303e3f66b23066c1426e4f846d4181))


### Features

* added base class for plugins that need request/response logging ([f043add](https://github.com/iterativelyhq/itly-sdk/commit/f043add64e59c7662fb251de349e255accb0c477))
* added ESM support ([c265689](https://github.com/iterativelyhq/itly-sdk/commit/c2656892daddb36459e2a061b553890e616d04c2))
* added PluginLogger ([2d8c764](https://github.com/iterativelyhq/itly-sdk/commit/2d8c764eab480e9c392545cf1f77fff5753a2e15))
* log Amplitude requests ([d586e55](https://github.com/iterativelyhq/itly-sdk/commit/d586e551f46211a0b13bf6505ffe62fbc7ddeaf8))
* log Amplitude successful/failed responses ([f56b268](https://github.com/iterativelyhq/itly-sdk/commit/f56b268b74014b9fd006e6922d7be606a3e407bc))
* log Iteratively requests ([c907b2a](https://github.com/iterativelyhq/itly-sdk/commit/c907b2a1b8c53ae943c1316c45d29aa0709c0b19))
* log Mixpanel requests ([cd0afa7](https://github.com/iterativelyhq/itly-sdk/commit/cd0afa7b02702ee2567717ad736ed56443359a24))
* log Mparticle requests ([fb5b067](https://github.com/iterativelyhq/itly-sdk/commit/fb5b0677fb1c41fd04e82414c9ef22a9364d6f50))
* log Segment (Browser) requests ([2a637d8](https://github.com/iterativelyhq/itly-sdk/commit/2a637d8fc518f3d5cdd8d34bbcbfdf0428989e9b))
* log Segment (Node) requests ([adb136a](https://github.com/iterativelyhq/itly-sdk/commit/adb136a650c1be36410e1d2daea594f38d3462f7))
* log Snowplow requests ([f92cd05](https://github.com/iterativelyhq/itly-sdk/commit/f92cd058aacdac0379b6959d26c7314e07d19092))





## [2.0.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.0...v2.0.1) (2021-02-02)


### Bug Fixes

* introduce LoadOptions for itly.load() ([e16eeb8](https://github.com/iterativelyhq/itly-sdk/commit/e16eeb8260419cc8f2ca5c449a8000ea74028e3b))
* renamed options to loadOptions ([43f039d](https://github.com/iterativelyhq/itly-sdk/commit/43f039d33193f6de0917c497eb6f6a94919cd0fa))
* use destructuring for typed object params for itly.load() ([0a91a7a](https://github.com/iterativelyhq/itly-sdk/commit/0a91a7a0d4079e5628d3d03ea733d1a0569a24a6))
* use typed object params for itly.load() ([1d76ce1](https://github.com/iterativelyhq/itly-sdk/commit/1d76ce16a44a52afa7751078d92a2c7a6354e071))





# [2.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.6.0...v2.0.0) (2021-01-20)


### Bug Fixes

* added " for Iteratively SDK" suffix to plugin titles/descriptions ([12876a5](https://github.com/iterativelyhq/itly-sdk/commit/12876a508ae19006d76374b9bf48dfd0d9eb94af))
* added code docs to all SDK methods ([72b7915](https://github.com/iterativelyhq/itly-sdk/commit/72b7915742fbd0519b471b18c4f00d6d23bccd69))
* added explicit exports in addition to default exports ([401637e](https://github.com/iterativelyhq/itly-sdk/commit/401637e61ee63714d4db1ccabebfa31b73c15842))
* added simple README's to all  packages ([b3a6eb2](https://github.com/iterativelyhq/itly-sdk/commit/b3a6eb2f7083f0e6e4107b2aa740e962c77128c6))
* core Itly shouldn’t be a singleton ([79c0e63](https://github.com/iterativelyhq/itly-sdk/commit/79c0e63fb938a6e1741cf36bec477c0733bf7a8e))
* fixed merge conflict with per event destination changes ([7f949ad](https://github.com/iterativelyhq/itly-sdk/commit/7f949ad428b4411aff7d464ff9eae1adc511b263))
* move browser-specific code to browser.ts ([9bac4df](https://github.com/iterativelyhq/itly-sdk/commit/9bac4df9ec19ecf4499ce40882c6efd186cc849e))
* moved code from codegen to SDK ([00ef906](https://github.com/iterativelyhq/itly-sdk/commit/00ef9060cc3d25bfd0c55434728fa2d1a5c1fab1))
* re-export base types in node sdk ([52d470d](https://github.com/iterativelyhq/itly-sdk/commit/52d470d9c24f8baee8276ddd93e5a11ee9f5d930))
* remove getPlugin() method in itly-sdk ([32d4b14](https://github.com/iterativelyhq/itly-sdk/commit/32d4b14195b1bd44d27db8c56a7d4553e81e9137))
* removed legacy Itly prefixes ([fb8b7ad](https://github.com/iterativelyhq/itly-sdk/commit/fb8b7ad6a79241b6263644da0dda6ab6b49924aa))
* removed the Node and Browser terms from all the Plugin class names ([a1e2f4b](https://github.com/iterativelyhq/itly-sdk/commit/a1e2f4b74dd4c879c28eba18e583557c1c763b92))
* removed unnecessary node.ts ([b5f2006](https://github.com/iterativelyhq/itly-sdk/commit/b5f20062273e61d27a8632e305fc8d822a50d6a5))
* separate context from Options ([dc6aeb6](https://github.com/iterativelyhq/itly-sdk/commit/dc6aeb6d24df060900e6e7c568d9f7854bf621a5))
* update Plugin to accept id in constructor ([86be0ef](https://github.com/iterativelyhq/itly-sdk/commit/86be0ef59b950c68c9f1fa842fbfa70ec9c73bb6))


### Features

* added flush method ([0213284](https://github.com/iterativelyhq/itly-sdk/commit/0213284a8fab0b3f3beb1d12e14358c873d31027))
* flush method returns Promise ([d0aaac7](https://github.com/iterativelyhq/itly-sdk/commit/d0aaac7f5623c0f698b1b9c06875dc9707f2bd58))
* new version 2.0.0 ([8843dc2](https://github.com/iterativelyhq/itly-sdk/commit/8843dc26d6bdb1854101e871007c72d55b27170c))
* only configure plugins if instance is not provided ITLY-1510 ([309e0e4](https://github.com/iterativelyhq/itly-sdk/commit/309e0e461731b6ce34e109a6b5aea7b2dbfe775a))


### BREAKING CHANGES

* separated context from Options in itly.load()
* browser and node Itly no longer a singleton





# [1.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.5.0...v1.6.0) (2020-12-04)


### Features

* add logic for filtering on running event on plugins ([3158050](https://github.com/iterativelyhq/itly-sdk/commit/31580502dbea44415ae88f06b18306eefac74b87))





# [1.5.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.1...v1.5.0) (2020-11-06)


### Features

* use event name instead of id in snowplow plugin ([9458a14](https://github.com/iterativelyhq/itly-sdk/commit/9458a14c42c837e4180091074e76fd85fe5e03f1))





## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)


### Bug Fixes

* incorporated CR feedback ([ba51695](https://github.com/iterativelyhq/itly-sdk/commit/ba5169552072beeca9e9f268f028cfac71ae67b1))
* make SDK merge context to an event without losing its type ([65d7c72](https://github.com/iterativelyhq/itly-sdk/commit/65d7c72d044dc4bf892041da40a9b123885fb3be))





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)


### Bug Fixes

* fixed linter error & CR feedback ([b3ca320](https://github.com/iterativelyhq/itly-sdk/commit/b3ca3208179fbf2065670d34728bad31010a54a3))
* made LOGGERS a frozen readonly object ([71ff140](https://github.com/iterativelyhq/itly-sdk/commit/71ff140ba17818944fe2d01635647aec0fa2ed8a))
* plugin-testing/node - remove userId from methods return results ([2c7bee5](https://github.com/iterativelyhq/itly-sdk/commit/2c7bee5b81d3e38bb60b6ec1750e81b889b4c823))
* set correct environment for plugin-testing tests ([0cb0618](https://github.com/iterativelyhq/itly-sdk/commit/0cb06189186467559778c9de38f62e320e0aa353))
* wrapped individual plugin method calls in try catch ([932417c](https://github.com/iterativelyhq/itly-sdk/commit/932417c4630e5d51340e8af03bbe50c00b710a74))


### Features

* added plugin-testing ([43e65bc](https://github.com/iterativelyhq/itly-sdk/commit/43e65bca097f50b770d1f2277f036dc02dd691eb))
* added plugin-testing ([fb411bb](https://github.com/iterativelyhq/itly-sdk/commit/fb411bb66f5d371e9a32cc3187c1158e68a59543))





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)


### Features

* extended Plugin interface with post* lifecycle methods (ITLY-1041) ([1ea87db](https://github.com/iterativelyhq/itly-sdk/commit/1ea87dba2649ffe9c6a850a98d673de0189844fd))


### BREAKING CHANGES

* validationError method removed, validationErrorHandler removed in plugin-schema-validator





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)


### Bug Fixes

* changed mParticle instance initialization check ([d516c8a](https://github.com/iterativelyhq/itly-sdk/commit/d516c8a292ca6ad54185409daa8ffcfb339362f1))
* don't re-initialize mParticle instance if it initialized already ([8fb9af5](https://github.com/iterativelyhq/itly-sdk/commit/8fb9af5f25b17044da1531975b30686a653c9973))
* exposed EventMetadata type in sdk ([7713f07](https://github.com/iterativelyhq/itly-sdk/commit/7713f07bef0d5ee8a1bd3856c2b2e84c0f12a205))
* provided env specific default options for options.validation ([947d44a](https://github.com/iterativelyhq/itly-sdk/commit/947d44afe193416052e828999bc901eb7e7ec809))
* refreshed plugin-mparticle's yarn.lock ([112710a](https://github.com/iterativelyhq/itly-sdk/commit/112710a80d4478dc7d999cdcf11e37ccd4acaf82))
* remove mParticle mention from sdk-base Event type ([7bbd330](https://github.com/iterativelyhq/itly-sdk/commit/7bbd330be8d79c641bea1941bca97f0177a70cb3))
* removed itly from MparticleOptions ([39ec98b](https://github.com/iterativelyhq/itly-sdk/commit/39ec98bac3cc25fc211425a746d0e3a5c2b9d181))
* use Mparticle.getInstance to return initialized mParticle instance ([225f543](https://github.com/iterativelyhq/itly-sdk/commit/225f5439afa8b16380b7c444e9a28f7e3b5a5201))


### Features

* added a draft of mparticle browser plugin ([ed4ff71](https://github.com/iterativelyhq/itly-sdk/commit/ed4ff71437a51cbcbdb6cfe54960c2c29fae6383))





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)


### Bug Fixes

* improved platform detection in sdk ([1e7aec7](https://github.com/iterativelyhq/itly-sdk/commit/1e7aec720044ffc0f48f0d60121a557e55b17555))





## [1.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.0...v1.1.1) (2020-07-28)


### Bug Fixes

* protected event.properties from mutation in plugin-mixpanel ([996e5a5](https://github.com/iterativelyhq/itly-sdk/commit/996e5a57287ea37a02ca749c9644f02d7f6da90e))
* removed buffer check loop from plugin-iteratively-node ([1f3c4dc](https://github.com/iterativelyhq/itly-sdk/commit/1f3c4dc7dd0f6b1b18b07e849e97d0f58ba7d6ef))





# [1.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.0.0...v1.1.0) (2020-07-06)


### Bug Fixes

* updated all [@itly](https://github.com/itly) peerDependencies to latest (^0.9.2) ([6d7e0af](https://github.com/iterativelyhq/itly-sdk/commit/6d7e0af1de9f0166a0883bfc9bc8aa4c18b3d736))
* use schemaVer for snowplow schema ([94329bc](https://github.com/iterativelyhq/itly-sdk/commit/94329bcc66ae7908e85df625d8b0c7b9e3e9c28c))


### Features

* renamed 'sdk-core' 'sdk' ([5e596ab](https://github.com/iterativelyhq/itly-sdk/commit/5e596ab1656e2659684024e665d8e57cca0ef258))





# [1.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.2...v1.0.0) (2020-06-30)


### Bug Fixes

* don't add validator name/ID into validation.details property ([1b5b22c](https://github.com/iterativelyhq/itly-sdk/commit/1b5b22c44fd0e5df3dab50a4a83e675224767975))
* fixed config.disabled in plugin-debugger-node ([d957e28](https://github.com/iterativelyhq/itly-sdk/commit/d957e286f1ec4da0247a3dd9184d8354889f3ad1))
* renamed debugger plugin to iteratively plugin ([265f4ea](https://github.com/iterativelyhq/itly-sdk/commit/265f4eabaa1003df6ee0c2c39c38aeb7bca1205a))
* renamed redactValues -> omitValues in IterativelyOptions ([1583335](https://github.com/iterativelyhq/itly-sdk/commit/15833356fe706512e9a171df085354928ba75eaa))
* unified iteratively plugin ids for node & browser ([b0e199a](https://github.com/iterativelyhq/itly-sdk/commit/b0e199aa2a0d0ee49696dd644a4dca7252805c33))
* updated debugger TrackModel.dateSent, it's string now ([93555cf](https://github.com/iterativelyhq/itly-sdk/commit/93555cf0b448ee84ebe706fb1867f79ecd26641b))
* updated DebuggerPlugin.validationError() to send correct TrackType ([85ddacd](https://github.com/iterativelyhq/itly-sdk/commit/85ddacd554e5bc04e55a1409e90e4341208142c7))
* updated hygen plugin templates ([0301288](https://github.com/iterativelyhq/itly-sdk/commit/0301288fcfb612573a931f812aff17d8edf5bc4b))





## [0.9.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.1...v0.9.2) (2020-06-17)


### Bug Fixes

* moved all debugger options to debugger plugins ([66407dc](https://github.com/iterativelyhq/itly-sdk/commit/66407dccee5e54ea0402fdfbdbb592fabb7f3627))
* removed DebugOptions from sdk and sdk-node ([e769a46](https://github.com/iterativelyhq/itly-sdk/commit/e769a46ce24e56b4525f6055048d1aaab690ce7d))





## [0.9.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.0...v0.9.1) (2020-06-17)


### Bug Fixes

* added ItlyOptions.DebuggerOptions ([00dee7d](https://github.com/iterativelyhq/itly-sdk/commit/00dee7d7d647f77abf3a31ad97cba7892f6f26e8))
* updated debugger plugins to initialize in load (vs constructor) ([dc591a5](https://github.com/iterativelyhq/itly-sdk/commit/dc591a556df87245c6d157a8d6e2dbec6945e1ff))





# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* moved plugin setup logic into load() hook rather than constructors ([f704ba4](https://github.com/iterativelyhq/itly-sdk/commit/f704ba485fc50967c8f73498230b88f8553768a5))
* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.3](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.2...v0.8.3) (2020-06-14)


### Bug Fixes

* fixed plugin-schema-validator support for default events ([2f42ebb](https://github.com/iterativelyhq/itly-sdk/commit/2f42ebb56be5fc6b4686cf704c7281b1146a1ce5))





## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)


### Bug Fixes

* updated sdk-core to always validate context properties ([b678990](https://github.com/iterativelyhq/itly-sdk/commit/b6789909834cb9939289e3c98fb4b202119eb7ed))





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package root





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* cleaned up plugin-amplitude tests and added coverage ([82f4b2a](https://github.com/iterativelyhq/itly-sdk/commit/82f4b2a1cef22b6c1b5b9d8c644902695e5a2582))
* made plugin-mixpanel-node MixpanelOptions optional ([59650f4](https://github.com/iterativelyhq/itly-sdk/commit/59650f405ec0cf2a223d9deafc8dde83066af438))
* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* removed unecessary second build in CI ([0110793](https://github.com/iterativelyhq/itly-sdk/commit/01107936eed37d3bfbcab8cd2d1501d112256a89))
* renamed 'writeKey' in Segment plugins ([57c9137](https://github.com/iterativelyhq/itly-sdk/commit/57c9137d4bbeac4c89a3dd0f6faa7150fe4fe3b2))
* set defaults for ItlyOptions before load(options) callbacks ([066b59b](https://github.com/iterativelyhq/itly-sdk/commit/066b59bf1aaf208f05f800b89e95bb9687361910))
* updated CI workflow to run tests against built packages ([f650c33](https://github.com/iterativelyhq/itly-sdk/commit/f650c33a1cffe0ad56d1ef37ec1a99622e4aa1c0))
* updated debugger plugin package version (using `lerna bootstrap`) ([f0e0882](https://github.com/iterativelyhq/itly-sdk/commit/f0e088239c2d9f3cd58ace1b1119ba56c56ede01))


### Features

* add test code coverage for @itly/sdk ([69a9374](https://github.com/iterativelyhq/itly-sdk/commit/69a93749b46d44dd4d871ffb7ea9c6301b59dac6))
* added debugger plugin, draft for browser ([c013b5f](https://github.com/iterativelyhq/itly-sdk/commit/c013b5f6ee92d6eddae2e9d48fb2793b569136d4))
* added debugger-node plugin, draft for nodejs (requires node-fetch) ([655e02b](https://github.com/iterativelyhq/itly-sdk/commit/655e02bf75393bf057f27c88fd624eead7edc8fd))
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
* updated SnowplowOptions to be manditory and include config ([e1f4caa](https://github.com/iterativelyhq/itly-sdk/commit/e1f4caa1234715ffad5e12bc7711654f8e46f791))





# [0.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.5.0...v0.6.0) (2020-06-09)


### Features

* added plugin-amplitude for browser integration ([78ef65e](https://github.com/iterativelyhq/itly-sdk/commit/78ef65e56095734f97b935defb001cea0ee8807d))
* added plugin-mixpanel for browser integration ([d32a506](https://github.com/iterativelyhq/itly-sdk/commit/d32a5064bb9723f5896cf28d5832a5d8766557c8))
* added plugin-segment for browser integration ([839b7d3](https://github.com/iterativelyhq/itly-sdk/commit/839b7d3a6cdf11fc54089d68e2acd9301ec23bd9))
* added plugin-snowplow for browser integration ([3c1abea](https://github.com/iterativelyhq/itly-sdk/commit/3c1abea38d8943e59415193269099c307b001165))





# [0.5.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.4.0...v0.5.0) (2020-06-09)


### Bug Fixes

* added getPlugin(id: string) to sdk-core and sdk-node ([7e4c82f](https://github.com/iterativelyhq/itly-sdk/commit/7e4c82f115292f6e246200401c61952a87be8168))
* removed ItlyOptions from plugin-amplitude-node ([f00bd64](https://github.com/iterativelyhq/itly-sdk/commit/f00bd64ad3df84c8af1bb4a72980d557c2b2daeb))
* removed ItlyOptions from plugin-mixpanel-node ([8486da4](https://github.com/iterativelyhq/itly-sdk/commit/8486da4e800dc380b88c524274ed8928ba578da0))
* removed ItlyOptions from plugin-segment-node ([93e412f](https://github.com/iterativelyhq/itly-sdk/commit/93e412f5e58276e692264386c5cc6345d3f6813f))


### Features

* added browser SDK module @itly/sdk ([00a87af](https://github.com/iterativelyhq/itly-sdk/commit/00a87afe46194eed936b23b6fedf00eea786b1e2))
* added ItlyOptions.validationOptions ([7e3bc99](https://github.com/iterativelyhq/itly-sdk/commit/7e3bc998f8a7e1de36bd37a1e3d6cefcf72a6239))
* added optional validationErrorHandler to SchemaValidator ([a35b68a](https://github.com/iterativelyhq/itly-sdk/commit/a35b68acc545d25f50f8447513a70293a4c48050))





# [0.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.3.0...v0.4.0) (2020-06-06)


### Features

* added plugin-mixpanel-node ([c9e2525](https://github.com/iterativelyhq/itly-sdk/commit/c9e2525aa76142b66ef2422754f789251302bf1c))





# [0.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.2.0...v0.3.0) (2020-06-05)


### Features

* renamed @itly/plugin-schema-validator ([e54ec8a](https://github.com/iterativelyhq/itly-sdk/commit/e54ec8a5b2fb20b8c06aab8db356d002d57c40c5))





# [0.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.1...v0.2.0) (2020-06-05)


### Bug Fixes

* Fixed error in plugin validation ([038ea94](https://github.com/iterativelyhq/itly-sdk/commit/038ea94f28050055bbd60c061c47cc6af283d639))


### Features

* added changelog script ([5783bf9](https://github.com/iterativelyhq/itly-sdk/commit/5783bf93b6c7485c36842f3470d3535c5c80168c))
* Added pre-commit linting with husky ([312e50b](https://github.com/iterativelyhq/itly-sdk/commit/312e50bb779b59daa0e066f87ef8a287ede903ea))
* Renamed plugin-amplitude-node ([2f1b33f](https://github.com/iterativelyhq/itly-sdk/commit/2f1b33f0b012f0968e8f9f812ec2768a812d2978))
* Store compiled validators for faster validation ([5a63a74](https://github.com/iterativelyhq/itly-sdk/commit/5a63a74cfbb98e21fffe9f8708652ab5185ec7a3))
* Validation and Destinations are now plugins ([920648c](https://github.com/iterativelyhq/itly-sdk/commit/920648c29757a762c9929fbd748ed8ed5e725045))


### BREAKING CHANGES

* Switch to plugin architecture





# [](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.1...v) (2020-06-05)


### Bug Fixes

* Fixed error in plugin validation ([038ea94](https://github.com/iterativelyhq/itly-sdk/commit/038ea94f28050055bbd60c061c47cc6af283d639))


### Features

* Added pre-commit linting with husky ([312e50b](https://github.com/iterativelyhq/itly-sdk/commit/312e50bb779b59daa0e066f87ef8a287ede903ea))
* Renamed plugin-amplitude-node ([2f1b33f](https://github.com/iterativelyhq/itly-sdk/commit/2f1b33f0b012f0968e8f9f812ec2768a812d2978))
* Store compiled validators for faster validation ([5a63a74](https://github.com/iterativelyhq/itly-sdk/commit/5a63a74cfbb98e21fffe9f8708652ab5185ec7a3))
* Validation and Destinations are now plugins ([920648c](https://github.com/iterativelyhq/itly-sdk/commit/920648c29757a762c9929fbd748ed8ed5e725045))


### BREAKING CHANGES

* Switch to plugin architecture



## [0.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.0...v0.1.1) (2020-06-02)



# [0.1.0](https://github.com/iterativelyhq/itly-sdk/compare/79d864d389e5424d0999d0c1105dbdfc4c5f955d...v0.1.0) (2020-06-02)


### Features

* Initial commit. sdk-core, sdk-node, and node-plugin-amplitude modules ([79d864d](https://github.com/iterativelyhq/itly-sdk/commit/79d864d389e5424d0999d0c1105dbdfc4c5f955d))
