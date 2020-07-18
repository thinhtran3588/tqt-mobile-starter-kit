# tqt-mobile-starter-kit

A starter kit for React Native

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
![Eslint](https://badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![GitHub](https://img.shields.io/github/license/thinhtran3588/tqt-mobile-starter-kit)
![GitHub repo size](https://img.shields.io/github/repo-size/thinhtran3588/tqt-mobile-starter-kit)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/thinhtran3588/tqt-mobile-starter-kit)

**Master:**
![CI-Master](https://github.com/thinhtran3588/tqt-mobile-starter-kit/workflows/CI-Master/badge.svg)
[![codecov](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/master/graph/badge.svg)](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_tqt-mobile-starter-kit&metric=alert_status)](https://sonarcloud.io/dashboard?id=thinhtran3588_tqt-mobile-starter-kit)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_tqt-mobile-starter-kit&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_tqt-mobile-starter-kit)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_tqt-mobile-starter-kit&metric=security_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_tqt-mobile-starter-kit)

**Develop:**
![CI-Develop](https://github.com/thinhtran3588/tqt-mobile-starter-kit/workflows/CI-Develop/badge.svg?branch=develop)
[![codecov](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/develop/graph/badge.svg)](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/develop)

## Scripts

- run Android:

```
yarn android
```

- run iOS:

```
yarn ios
```

- set environments (production/staging/etc), change related configurations (default is **production**):

```
yarn env production
yarn env staging
```

- update app version, for example 1.4:

```
yarn update-ver <latest-version>
```

- update app build number, for example 5 (should be ran by Github Actions):

```
yarn update-build <latest-build-number>
```

- validate source code

```
yarn validate
```

## Update app icons & splash screens

- install ImageMagick

```
brew install imagemagick
```

- update `src/assets/images/app-icon-1024.png`

- run

```
yarn update-icons
```

- for splash screen, follow [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash)

## Publish app to stores with Fastlane

### **Android**

1. prepare credentials in the exact locations below:

```
android
    app
        mobile.keystore
    fastlane
        googlePlaySecretKey.json
    keystore.properties

```

mobile.keystore: Learn how to generate keystore [here](https://reactnative.dev/docs/signed-apk-android)

keystore.properties: store credentials to unlock mobile.keystore

googlePlaySecretKey.json: credentials used by Fastlane to publish app to store. Learn how to generate it [here](https://docs.fastlane.tools/getting-started/android/setup/)

2. build app (optional)

```
yarn android-build
```

3. build app to apk (optional)

```
yarn android-build-apk
```

4. build app & publish to Alpha channel

```
yarn android-alpha
```

### **iOS**

1. prepare credentials in the exact locations below:

```
ios
    .env.default

```

.env.default: fastlane environment variables stored here

MATCH_APP_IDENTIFIER= // all app ids

MATCH_GIT_URL= // match git url

MATCH_PASSWORD= // match password

APPLE_USERNAME= // apple username

APPLE_ITC_TEAM_ID= // apple itc team id

APPLE_TEAM_ID= // apple team id

FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD= // apple app password

FASTLANE_SESSION= // fastlane session

2. run

```
cd ios && fastlane match
```

to initialize match & populate credentials to the git repo

3. (update FASTLANE_SESSION)[https://docs.fastlane.tools/best-practices/continuous-integration/] by running

```
fastlane spaceauth -u user@email.com
```

4. build app (optional)

```
yarn ios-build
```

5. build app & publish to Testflight

```
yarn ios-testflight
```

### **Github Actions**

1. increase app version (for example 0.1.0 => 0.2.0)
2. commit source code to the **fastlane** branch to publish the production app to Playstore Alpha channel, Appstore Testflight & get the latest production apk
3. commit source code to the **fastlane_staging** branch to publish the staging app to Appstore Testflight & get the latest staging apk

## Generate Privacy Policy & Terms & Conditions

https://app-privacy-policy-generator.firebaseapp.com/
