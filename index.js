/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import * as Sentry from '@sentry/react-native';
import {App} from '@app/app.component';
import {config} from '@core/config';
import {name as appName} from './app.json';

Sentry.init({
  dsn: config().sentry.dns,
});

AppRegistry.registerComponent(appName, () => App);
