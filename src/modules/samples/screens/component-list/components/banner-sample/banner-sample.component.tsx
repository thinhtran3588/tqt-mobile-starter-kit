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
          label: 'Close Banner',
          onPress: () => setVisible(false),
        },
      ]}
      icon='email'
      style={styles.banner}>
      There was a problem processing a transaction on your credit card.
    </Banner>
  );
};
