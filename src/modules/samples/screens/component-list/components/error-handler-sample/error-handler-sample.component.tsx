import React from 'react';
import {Button} from '@core/components';
import {sleep} from '@core/helpers';
import {useLoading} from '@core/contexts';
import {styles} from './error-handler-sample.styles';

export const ErrorHandlerSample = (): JSX.Element => {
  const {setLoading} = useLoading();
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
      <Button testID='sample-button' style={styles.item} onPress={createError} mode='contained'>
        Make js error
      </Button>
      <Button style={[styles.item, styles.lastRow]} onPress={createErrorAsync} mode='contained'>
        Make promise error
      </Button>
    </>
  );
};
