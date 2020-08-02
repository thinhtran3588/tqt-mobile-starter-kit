/* eslint-disable @typescript-eslint/no-explicit-any */
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import Promise from 'bluebird';
import {TFunction} from 'i18next';
import {AppError} from './app-error';
import {handleError} from './handle-error';

export const handleGlobalException = (t: TFunction): void => {
  // For most use cases:
  // registering the error handler (maybe u can do this in the index.android.js or index.ios.js)
  setJSExceptionHandler((err: Error, _isFatal) => {
    handleError(err as AppError, t);
    // This is your custom global error handler
    // You do stuff like show an error dialog
    // or hit google analytics to track crashes
    // or hit a custom api to inform the dev team.
  });

  // For most use cases:
  setNativeExceptionHandler((_exceptionString) => {
    // This is your custom global error handler
    // You do stuff like hit google analytics to track crashes.
    // or hit a custom api to inform the dev team.
    // NOTE: alert or showing any UI change via JS
    // WILL NOT WORK in case of NATIVE ERRORS.
  });

  // https://stackoverflow.com/questions/48487089/global-unhandledrejection-listener-in-react-native
  // We use the "Bluebird" lib for Promises, because it shows good perf
  // and it implements the "unhandledrejection" event:
  (global as any).Promise = Promise;

  // Global catch of unhandled Promise rejections:
  (global as any).onunhandledrejection = (err: AppError): void => {
    // Warning: when running in "remote debug" mode (JS environment is Chrome browser),
    // this handler is called a second time by Bluebird with a custom "dom-event".
    // We need to filter this case out:
    handleError(err, t);
  };
};
