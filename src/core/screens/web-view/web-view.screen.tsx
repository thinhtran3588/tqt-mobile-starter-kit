import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Layout, WebView} from '@core/components';

interface WebViewParams {
  title: string;
  url: string;
}

export const WebViewScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, url}: WebViewParams = route.params as WebViewParams;
  const goBack = (): void => {
    navigation.goBack();
  };

  return (
    <Layout header headerTitle={title} headerBackButton headerBackButtonOnPress={goBack}>
      <WebView source={{uri: url}} />
    </Layout>
  );
};
