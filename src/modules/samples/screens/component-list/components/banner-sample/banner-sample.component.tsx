import React from 'react';
import {Banner} from '@core/components';
import {styles} from './banner-sample.styles';

export const BannerSample = (): JSX.Element => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Banner
      testID='banner'
      visible={visible}
      actions={[
        {
          label: 'Close',
          onPress: () => setVisible(false),
        },
      ]}
      icon='star'
      style={styles.banner}>
      Samples of all components
    </Banner>
  );
};
