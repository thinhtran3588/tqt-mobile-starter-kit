fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## Android
### android test
```
fastlane android test
```
Runs all the tests
### android beta
```
fastlane android beta
```
Submit a new Beta Build to Crashlytics Beta
### android clean
```
fastlane android clean
```
Clean
### android build
```
fastlane android build
```
Build
### android build_apk
```
fastlane android build_apk
```
Build APK
### android alpha
```
fastlane android alpha
```
Deploy a new version to the Google Play Alpha channel
### android app_sharing
```
fastlane android app_sharing
```
Deploy a new version to the Google Play App Sharing

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
