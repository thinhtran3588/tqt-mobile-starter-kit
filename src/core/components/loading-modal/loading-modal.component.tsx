import React from 'react';
import {styles} from './loading-modal.styles';
import {Loading} from '../loading/loading.component';
import {View} from '../view/view.component';

export interface LoadingScreenProps {
  loading?: boolean;
}

export const LoadingModal = (props: LoadingScreenProps): JSX.Element => {
  const {loading} = props;
  return (
    <>
      {loading && (
        <View style={[styles.container]}>
          <View style={[styles.background]} />
          <Loading />
        </View>
      )}
    </>
  );
};
