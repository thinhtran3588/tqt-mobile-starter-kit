# tqt-mobile-starter-kit

![Typed with TypeScript](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
![Eslint](https://badgen.net/badge/eslint/airbnb/ff5a5f?icon=airbnb)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
![GitHub](https://img.shields.io/github/license/thinhtran3588/tqt-mobile-starter-kit)
![GitHub repo size](https://img.shields.io/github/repo-size/thinhtran3588/tqt-mobile-starter-kit)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/thinhtran3588/tqt-mobile-starter-kit)

A starter kit for React Native written in Typescript with :heart:. A production-ready app with below functions:

- Authentication: [Firebase Auth](https://rnfirebase.io/auth/usage)
  - Android: Facebook, Google, Email, Phone No.
  - iOS: Facebook, Google, Email, Phone No, Apple.
- Navigation: [React Navigation](https://reactnavigation.org/)
- Internationalization: [react-i18next](https://react.i18next.com/)
- Support dark/light theme, multiple primary colors.
- Main UI libraries: [react-native-paper](https://callstack.github.io/react-native-paper/)
- OTA update: [codepush](https://github.com/microsoft/react-native-code-push)
- Error tracking: [Sentry](https://docs.sentry.io/platforms/react-native/)
- Analytics: [Firebase Analytics](https://rnfirebase.io/analytics/usage)
- Forms: [Formik](https://formik.org/)
- Persist data: [async-storage](https://github.com/react-native-community/async-storage)

**Master:**
![CI-Master](https://github.com/thinhtran3588/tqt-mobile-starter-kit/workflows/CI-Master/badge.svg)
[![codecov](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/master/graph/badge.svg)](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_tqt-mobile-starter-kit&metric=alert_status)](https://sonarcloud.io/dashboard?id=thinhtran3588_tqt-mobile-starter-kit)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_tqt-mobile-starter-kit&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_tqt-mobile-starter-kit)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=thinhtran3588_tqt-mobile-starter-kit&metric=security_rating)](https://sonarcloud.io/dashboard?id=thinhtran3588_tqt-mobile-starter-kit)

**Develop:**
![CI-Develop](https://github.com/thinhtran3588/tqt-mobile-starter-kit/workflows/CI-Develop/badge.svg?branch=develop)
[![codecov](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/develop/graph/badge.svg)](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/develop)

**Fastlane:**
![CI-Fastlane](https://github.com/thinhtran3588/tqt-mobile-starter-kit/workflows/CI-Fastlane/badge.svg?branch=fastlane)
[![codecov](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/fastlane/graph/badge.svg)](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/fastlane)

**Fastlane-Staging:**
![CI-Fastlane-Staging](https://github.com/thinhtran3588/tqt-mobile-starter-kit/workflows/CI-Fastlane-Staging/badge.svg?branch=fastlane-staging)
[![codecov](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/fastlane-staging/graph/badge.svg)](https://codecov.io/gh/thinhtran3588/tqt-mobile-starter-kit/branch/fastlane-staging)

## CI - CD integration with Github Actions

Another repo **fastlane-credentials** is used to store all credentials so the credentials are not shared to everyone. The structure of that repo:

```
- android (shared among multiple products/apps)
    - app
        - mobile.keystore (the keystore file of Android app)
    - fastlane
        - googlePlaySecretKey.json (the credential Fastlane use to publish to Playstore)
    - keystore.properties (the credential to unlock the keystore file)
- certs (the folder Fastlane match uses to store iOS certificates - shared among multiple products/apps)
- ios (shared among multiple products/apps)
    - .env.default  (the credential Fastlane uses to build and publish app to Testflight)
- profiles (the folder Fastlane match uses to store iOS profiles - shared among multiple products/apps)
- tqt-mobile-starter-kit (the current app configuration)
    - production (the production environment configuration)
        - android
            - app
                - google-services.json (the credential Firebase uses)
        - ios
            - GoogleService-Info.plist (the credential Firebase uses)
        - .env (the environment credentials mostly used by codepush)
        - sentry.properties (the credentials sentry uses)
    - staging (the production environment configuration, same structure as production)
        ...
```

We have 2 environments: **production** & **staging**. In each environment, we need to setup below apps:

- 1 Android app
- 1 iOS app
- 1 Firebase app
- 1 Facebook app
- 1 Sentry app
- 2 Appcenter (used for codepush) apps ([see more](https://github.com/microsoft/react-native-code-push#multi-deployment-testing))

1. Development code stays at the **develop** branch
2. Production code stays at the **master** branch
3. To publish apps to the Playstore Alpha channel & Appstore Testflight, commit the code into the **fastlane** branch (use the **fastlane-staging** branch for the staging app)
4. To publish apps to the Playstore Release channel, you should go to https://play.google.com/apps/publish and manually promote the app from the Playstore Alpha channel & update release notes (although Fastlane can automate it)
5. To publish apps to the Playstore Release channel, you should go to https://appstoreconnect.apple.com and manually select the latest build & update release notes (although Fastlane can automate it)
6. In case you want to update apps without publishing to store (only update javascript/typescript code), commit the code into the **codepush** branch (use the **codepush-staging** branch for the staging app) to publish it into the codepush Staging environment first. After testing is done, promote it to Production environment by committing code into the **codepush-promote** branch (use the **codepush-promote-staging** branch for the staging app)

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

- get SHA1 of keystores

```

yarn android-signing

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

## Sign in with Firebase

Follow [rnfirebase](https://rnfirebase.io/)

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

### Use code-push for OTA update

- register a new account in [https://appcenter.ms](https://appcenter.ms), create a new organization
- create 1 app for Android & 1 app for iOS using [appcenter cli](https://github.com/microsoft/appcenter-cli) under the newly created organization
- run below commands to create Staging and Production deployments (read [this guideline](https://github.com/microsoft/react-native-code-push/blob/master/README.md#multi-deployment-testing))

```

appcenter codepush deployment add Staging -a your-organization/your-app-android
appcenter codepush deployment add Production -a your-organization/your-app-android
appcenter codepush deployment add Staging -a your-organization/your-app-ios
appcenter codepush deployment add Production -a your-organization/your-app-ios

```

- run `appcenter codepush deployment list -a your-organization/your-app-android -k` to get deployments keys (same for ios app)
- run below commands to release Staging version and promote it to Production:

```

appcenter codepush release-react -a your-organization/your-app-android --description "deployment message"
appcenter codepush release-react -a your-organization/your-app-ios --description "deployment message"
appcenter codepush promote -a your-organization/your-app-android -s Staging -d Production
appcenter codepush promote -a your-organization/your-app-ios -s Staging -d Production

```

- to get deployment history, run

```

appcenter codepush deployment history Staging -a your-organization/your-app-android

```

- make another environment for the staging app (if you have a separate one)

## Generate Privacy Policy & Terms & Conditions

https://app-privacy-policy-generator.firebaseapp.com/

## Create a (new project)[https://github.com/react-native-community/react-native-template-typescript]

```

npx react-native init mobile --template react-native-template-typescript

```

```

```
