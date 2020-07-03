import React from 'react';
import {Banner} from '@core/components';
import {styles} from './banner-sample.styles';

export const BannerSample = (): JSX.Element => {
  const [visible, setVisible] = React.useState(true);
  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Close',
          onPress: () => setVisible(false),
        },
      ]}
      icon='email'
      style={styles.banner}>
      There was a problem processing a transaction on your credit card.
    </Banner>
  );
};
