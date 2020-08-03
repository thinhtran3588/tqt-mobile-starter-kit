import React from 'react';
import {styles} from './loading-modal.styles';
import {Loading} from '../loading/loading.component';
import {View} from '../view/view.component';
import {Blur} from '../blur/blur.component';

export interface LoadingScreenProps {
  loading?: boolean;
}

export const LoadingModal = (props: LoadingScreenProps): JSX.Element => {
  const {loading} = props;
  return (
    <>
      {loading && (
        <>
          <Blur style={[styles.background]} />
          <View style={[styles.container]}>
            <Loading />
          </View>
        </>
      )}
    </>
  );
};
