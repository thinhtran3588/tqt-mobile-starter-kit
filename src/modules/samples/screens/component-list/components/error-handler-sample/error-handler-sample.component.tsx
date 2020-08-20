import React from 'react';
import {useDispatch} from 'react-redux';
import {Dispatch} from '@app/stores';
import {Button} from '@core/components';
import {sleep} from '@core/helpers';
import {styles} from './error-handler-sample.styles';

export const ErrorHandlerSample = (): JSX.Element => {
  const {
    loading: {setLoading},
  } = useDispatch<Dispatch>();
  const createError = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (undefined as any).test();
  };

  const createErrorAsync = async (): Promise<void> => {
    setLoading(true);
    await sleep(1000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (undefined as any).test();
    setLoading(false);
  };

  return (
    <>
      <Button testID='sample-button' style={styles.item} onPress={createError}>
        Make js error
      </Button>
      <Button style={[styles.item, styles.lastRow]} onPress={createErrorAsync}>
        Make promise error
      </Button>
    </>
  );
};
