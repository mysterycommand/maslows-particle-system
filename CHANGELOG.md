# [1.8.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.7.1...v1.8.0) (2020-06-21)


### Bug Fixes

* **app/message:** give each line a unique key ([07757ec](https://github.com/mysterycommand/maslows-particle-system/commit/07757ec25d3e8ad8b8da048a5fd6e18721dca501))
* **app/messages:** give each line a key ([726d043](https://github.com/mysterycommand/maslows-particle-system/commit/726d0431313bbc649953b5d2c47f36744bcc1af2))


### Features

* **app:** add an echo command ([d03816e](https://github.com/mysterycommand/maslows-particle-system/commit/d03816e898c5f61e2e3c883fd3e1e25e98ba191a))
* **app:** add help message, and handler, and display on first render ([9010b0b](https://github.com/mysterycommand/maslows-particle-system/commit/9010b0be2004e247d91b35916400576c0ce99859))
* **app/message:** better whitespace handling for multiple new lines ([93951b0](https://github.com/mysterycommand/maslows-particle-system/commit/93951b01b61e1baa4760f27f64ad14dbfe1ac963))
* **app/message:** parse message text for lists, add styling to handle them ([d9b866b](https://github.com/mysterycommand/maslows-particle-system/commit/d9b866b6ee8f333b1bcaa90ef14a0e791e8dfeaf))

## [1.7.1](https://github.com/mysterycommand/maslows-particle-system/compare/v1.7.0...v1.7.1) (2020-06-17)


### Bug Fixes

* **app/bee-movie:** fix typos ([63055e3](https://github.com/mysterycommand/maslows-particle-system/commit/63055e30d1002182962df166faae44e6a18da5fe))

# [1.7.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.6.0...v1.7.0) (2020-06-17)


### Features

* **app/bee-movie:** add's a bee movie handler ([aea06bc](https://github.com/mysterycommand/maslows-particle-system/commit/aea06bc40af96f83fbfa64ea83615590d752d0d9))

# [1.6.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.5.0...v1.6.0) (2020-06-16)


### Features

* **app/sentiment:** bail early if we're processing an inactive heart ([679bdf4](https://github.com/mysterycommand/maslows-particle-system/commit/679bdf417b909c48f45786f0a902000aff1ebb5c))
* **lib/pool:** add an object pool, update fireworks to use it ([1f235d6](https://github.com/mysterycommand/maslows-particle-system/commit/1f235d69249185aebb1531a9fc8857f58c1e6668))


### Reverts

* **lib:** a generic Verlet integration function, no forces though ([142efa6](https://github.com/mysterycommand/maslows-particle-system/commit/142efa62841fa1e97b943f73c9e8e936011e3d20))

# [1.5.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.4.0...v1.5.0) (2020-06-15)


### Features

* **app/sentiment:** add the heart effect ([2758bc5](https://github.com/mysterycommand/maslows-particle-system/commit/2758bc5be6cc46067530154ac79d4d04f7f56977))
* **app/sentiment:** boilerplate for a new particle-system component ([d5043a5](https://github.com/mysterycommand/maslows-particle-system/commit/d5043a5bdb733f1fa22e6669d38f1d1eb253d7e3))
* **app/sentiment:** plumbing for a particle system that response to ❤️ emojis ([aa9699c](https://github.com/mysterycommand/maslows-particle-system/commit/aa9699c276820ba741e51de838a5fb965c6b5dd8))

# [1.4.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.3.0...v1.4.0) (2020-06-14)


### Features

* **app/fireworks:** a pretty legit fireworks effect ([5ff757c](https://github.com/mysterycommand/maslows-particle-system/commit/5ff757cee477b50af382382d577581696f281291))
* **app/fireworks:** basic styling and setup of a render loop ([daef76e](https://github.com/mysterycommand/maslows-particle-system/commit/daef76eea33b49c00fd2efdf7f77d202ef99287c))
* **app/fireworks:** move types into app, add 'congrats' handler to wrappedDispatch ([dd7e512](https://github.com/mysterycommand/maslows-particle-system/commit/dd7e512a076db8db4d71421bd33078031b433f4f))

# [1.3.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.2.0...v1.3.0) (2020-06-14)


### Bug Fixes

* **cli:** forgot to add the dependency when I picked out the cli as a branch ([8d077ab](https://github.com/mysterycommand/maslows-particle-system/commit/8d077ab54f09b23aee92cead3c3985c01425d24d))


### Features

* **app/fireworks:** yarn g Fireworks ([9bd535f](https://github.com/mysterycommand/maslows-particle-system/commit/9bd535f9f5fa57d86caca89a314426f186300fc0))

# [1.2.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.1.0...v1.2.0) (2020-06-14)


### Features

* **app:** a 'device' with a kind of header/section/footer module layout ([a284d02](https://github.com/mysterycommand/maslows-particle-system/commit/a284d02a2d3c2561d6d748cc7277096dc6dbcacb))
* **app:** basic form submit, and messages state/rendering, it's an echo-bot for now ([e78e2c1](https://github.com/mysterycommand/maslows-particle-system/commit/e78e2c1d62d1ac41110e54f83cb7d110f8a8c5fe))
* **app:** mockup of basic styling ([5b31066](https://github.com/mysterycommand/maslows-particle-system/commit/5b310667d2703cb6be50b174a583ee0a89f7ef45))
* **app:** simple list styling ([7965e84](https://github.com/mysterycommand/maslows-particle-system/commit/7965e84ac3f9c04f94cf7e1ad8706c132e2a27be))
* **app:** simplify styling, get rid of outer section, track height/top of message list and items ([7480fed](https://github.com/mysterycommand/maslows-particle-system/commit/7480fede3ec0a3b61aac7fd45b2745faac3d8884))

# [1.1.0](https://github.com/mysterycommand/maslows-particle-system/compare/v1.0.0...v1.1.0) (2020-06-14)


### Features

* **package.json:** add a 'g' script to generate component folders ([5b061be](https://github.com/mysterycommand/maslows-particle-system/commit/5b061be6d025a2157a6c4909c628324bdce8138c))
* **scripts/cli:** adds a little generator cli ([cf382d3](https://github.com/mysterycommand/maslows-particle-system/commit/cf382d3813cd7422d46614310fd8ad483610f858))

# 1.0.0 (2020-06-11)


### Features

* **app:** move to follow the "component folder pattern" ([756cb1e](https://github.com/mysterycommand/maslows-particle-system/commit/756cb1e7906eca85ad9ab2aaeb18eef4068731e9))
* **app:** strip the app down to its base ([f9a5320](https://github.com/mysterycommand/maslows-particle-system/commit/f9a5320d9b91d0ec619405dcc84e7ae391007f59))
* **app.tsx:** use to css modules ([6e68509](https://github.com/mysterycommand/maslows-particle-system/commit/6e68509653d54ae7516067dcce8d2abac1cde0c2))


### BREAKING CHANGES

* **app:** really just baseline build and ci/cd, tagging it breaking to trigger the 1.0.0 bump
