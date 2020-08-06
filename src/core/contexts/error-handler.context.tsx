/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useCallback} from 'react';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import Promise from 'bluebird';
import {useTranslation} from 'react-i18next';
import {useNotification} from '@core/hooks/use-notification';
import {AppError, recordError} from '@core/exceptions';
import {useLoading} from './loading.context';

interface ErrorHandlerProviderProps {
  children?: React.ReactNode;
}

const ErrorHandlerContext = React.createContext(undefined);

const ErrorHandlerProvider = (props: ErrorHandlerProviderProps): JSX.Element => {
  const {children} = props;
  const {t} = useTranslation();
  const {showNotification} = useNotification();
  const {setLoading} = useLoading();

  const handleError = useCallback(
    (err: AppError): void => {
      const {code, messageCode, messageData} = err;

      showNotification({
        message: messageCode ? t(messageCode, messageData) : code || t('common:unknownError'),
        type: 'ERROR',
      });

      recordError(err);
    },
    [t, showNotification],
  );

  useEffect(() => {
    // For most use cases:
    // registering the error handler (maybe u can do this in the index.android.js or index.ios.js)
    setJSExceptionHandler((err: Error, _isFatal) => {
      handleError(err as AppError);
      // This is your custom global error handler
      // You do stuff like show an error dialog
      // or hit google analytics to track crashes
      // or hit a custom api to inform the dev team.
    }, true);

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
      setLoading(false);
      // Warning: when running in "remote debug" mode (JS environment is Chrome browser),
      // this handler is called a second time by Bluebird with a custom "dom-event".
      // We need to filter this case out:
      handleError(err);
    };
  }, [handleError, setLoading]);

  return <ErrorHandlerContext.Provider value={undefined}>{children}</ErrorHandlerContext.Provider>;
};

export {ErrorHandlerProvider};
