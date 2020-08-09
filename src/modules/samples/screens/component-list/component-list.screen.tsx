import React from 'react';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {useAppTheme, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@core/contexts';
import {Card, Alert, ScrollView, Layout} from '@core/components';
import {
  ActivityIndicatorSample,
  TextSample,
  AvatarSample,
  BadgeSample,
  BannerSample,
  ButtonSample,
  AnimationSample,
  IconSample,
  CardSample,
  NotificationSample,
  ErrorHandlerSample,
  ConfirmationSample,
} from './components';
import {styles} from './component-list.styles';

export const ComponentListScreen = (): JSX.Element => {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const {t} = useTranslation('');
  const theme = useTheme();
  const {appTheme} = useAppTheme();
  const textColor = appTheme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const componentList = [
    {
      title: 'ConfirmationSample',
      element: <ConfirmationSample />,
    },
    {
      title: 'NotificationSample',
      element: <NotificationSample />,
    },
    {
      title: 'ErrorHandlerSample',
      element: <ErrorHandlerSample />,
    },
    {
      title: 'TextSample',
      element: <TextSample />,
    },
    {
      title: 'AnimationSample',
      element: <AnimationSample />,
    },
    {
      title: 'ActivityIndicatorSample',
      element: <ActivityIndicatorSample />,
    },
    {
      title: 'IconSample',
      element: <IconSample />,
    },
    {
      title: 'AvatarSample',
      element: <AvatarSample />,
    },
    {
      title: 'BadgeSample',
      element: <BadgeSample />,
    },
    {
      title: 'ButtonSample',
      element: <ButtonSample />,
    },
  ];

  return (
    <Layout
      header
      headerTitle={t('common:components')}
      headerBackButton
      headerBackButtonTestID='back-action'
      headerBackButtonOnPress={() => {
        Alert.alert('Alert', 'Press Back button');
      }}
      headerRightActions={[
        {
          icon: MORE_ICON,
          onPress: () => {
            Alert.alert('Alert', 'Press More button');
          },
          testID: 'more-action',
        },
      ]}>
      <BannerSample />
      <ScrollView>
        {componentList.map((component, index) => (
          <Card key={index.toString()} style={styles.card}>
            <Card.Title
              title={component.title}
              style={[styles.borderTop, {backgroundColor: theme.colors.primary}]}
              titleStyle={{color: textColor}}
            />
            <Card.Content style={styles.cardContent}>{component.element}</Card.Content>
          </Card>
        ))}
        <CardSample />
      </ScrollView>
    </Layout>
  );
};
