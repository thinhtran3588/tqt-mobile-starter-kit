/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {AppHeadlessCheck} from '@app/app.component';
import {name as appName} from './app.json';

// Register background handler
messaging().setBackgroundMessageHandler(async (_remoteMessage) => {
  // handle message in background
});

AppRegistry.registerComponent(appName, () => AppHeadlessCheck);
