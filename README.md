# @ngworker/lumberjack-firestore-driver

<p align="center">
 <img width="40%" height="40%" src="./logo.svg">
</p>

[Logo by Felipe Zambrano](http://instagram.com/octopez)

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
[![ngworker](https://img.shields.io/badge/ngworker-%40-red)](https://github.com/ngworker/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github)](https://wallabyjs.com/oss/)

Lumberjack Firestore Driver is a custom log driver for [ngworker/lumberjack](https://github.com/ngworker/lumberjack). It is used to send logs and store them in [Cloud Firestore](https://firebase.google.com/docs/firestore).

## Features

- ✅ Logs to Cloud Firestore
- ✅ Unit test coverage (but there is a room for improvement)
- ✅ Custom Logger
- ✅ Follows Lumberjack Best Practices guide

## Table of Contents

- [Installation](#installation)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Wallaby.js](#wallaby.js)
- [Contributors](#contributors)

## Installation

LumberjackFirestoreDriver is published as the `@ngworker/lumberjack-firestore-driver` package.

| Toolchain   | Command                                             |
| ----------- | --------------------------------------------------- |
| Angular CLI | `ng add @ngworker/lumberjack-firestore-driver`      |
| NPM CLI     | `npm install @ngworker/lumberjack-firestore-driver` |
| Yarn CLI    | `yarn add @ngworker/lumberjack-firestore-driver`    |

## Compatibility

`LumberjackFirestoreDriver` has verified compatibility with the following Angular versions.

| Angular version | lumberjack-firestore-driver support |
| --------------- | ----------------------------------- |
| 11.0.x          | ✅                                  |
| 10.2.x          | ✅                                  |
| 10.1.x          | ✅                                  |
| 10.0.x          | ✅                                  |
| 9.1.x           | ✅                                  |
| 9.0.x           | ✅                                  |

If the version you are using is not listed, please [raise an issue in our GitHub repository](https://github.com/ngworker/lumberjack-firestore-driver/issues/new).

## Usage

TODO: Verify that these configurations match your driver configurations.

To start using LumberjackFirestoreDriver, import it in your root or core Angular module along with Lumberjack.

```ts
import { NgModule } from '@angular/core';
import { LumberjackLevel, LumberjackModule } from '@ngworker/lumberjack';
import { LumberjackFirestoreDriver } from '@ngworker/lumberjack-firestore-driver';

@NgModule({
  imports: [
    LumberjackModule.forRoot({
      levels: [LumberjackLevel.Verbose],
    }),
    LumberjackFirestoreDriver.forRoot({
      levels: [LumberjackLevel.Critical, LumberjackLevel.Error],
      firebaseConfig: {
        apiKey: 'API_KEY',
        authDomain: 'PROJECT_ID.firebaseapp.com',
        databaseURL: 'https://PROJECT_ID.firebaseio.com',
        projectId: 'PROJECT_ID',
        storageBucket: 'PROJECT_ID.appspot.com',
        messagingSenderId: 'SENDER_ID',
        appId: 'APP_ID',
        measurementId: 'G-MEASUREMENT_ID',
      },
      origin: 'YOUR_ORIGIN_APP_NAME',
      collectionName: 'DESTINATION_FIRESTORE_COLLECTION_NAME',
    }),
    // (...)
  ],
  // (...)
})
export class AppModule {}
```

Now you can start using the `LumberjackService` or extend `LumberjackLogger` and they will automatically use the `LumberjackFirestoreDriver`.

## Configuration

You should follow the standard Cloud Firestore configuration way which is well described in official documentation  [Cloud Firestore docs](https://firebase.google.com/docs/firestore/quickstart#web_1)

## Wallaby.js

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

Contributors to this repository are welcome to use the
[Wallaby.js OSS License](https://wallabyjs.com/oss/) to get
test results immediately as you type, and see the results in
your editor right next to your code.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<table>
<tr>
    <td align="center"><a href="https://medium.com/@marcinmilewicz"><img src="https://avatars3.githubusercontent.com/u/40635984" width="100px;" alt=""/><br /><sub><b>Marcin Milewicz</b></sub></a><br /><a href="https://github.com/marcinmilewicz/lumberjack-firestore-driver/commits?author=marcinmilewicz" title="Code">💻</a><a href="https://github.com/marcinmilewicz/lumberjack-firestore-driver/commits?author=marcinmilewicz" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/LayZeeDK"><img src="https://avatars1.githubusercontent.com/u/6364586" width="100px;" alt=""/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br />💻📖</td>
    <td align="center"><a href="https://github.com/NachoVazquez"><img src="https://avatars1.githubusercontent.com/u/9338604" width="100px;" alt=""/><br /><sub><b>Nacho Vazquez</b></sub></a><br />💻📖</td>
  </tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
