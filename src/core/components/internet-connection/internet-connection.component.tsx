import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useInternetConnection} from '@core/contexts';
import {Text} from '../text/text.component';
import {styles} from './internet-connection.styles';

export const InternetConnection = (): JSX.Element => {
  const isConnected = useInternetConnection();
  const {t} = useTranslation('common');
  const theme = useTheme();
  const [slideAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isConnected ? 0 : 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isConnected, slideAnim]);

  return (
    <Animated.View style={[styles.container, {backgroundColor: theme.colors.error, height: slideAnim}]}>
      {!isConnected && <Text style={styles.text}>{t('noInternetConnection')}</Text>}
    </Animated.View>
  );
};
