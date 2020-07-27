import React from 'react';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {Appbar, Card, Colors, Alert, ScrollView, Layout} from '@core/components';
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
} from './components';
import {styles} from './component-list.styles';

export const ComponentListScreen = (): JSX.Element => {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const {t} = useTranslation('');
  const theme = useTheme();
  const componentList = [
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
    <Layout>
      <Appbar.Header style={{backgroundColor: Colors.cyan500}}>
        <Appbar.BackAction
          testID='back-action'
          onPress={() => {
            Alert.alert('Alert', 'Press Back button');
          }}
        />
        <Appbar.Content title={t('common:components')} />
        <Appbar.Action
          testID='more-action'
          icon={MORE_ICON}
          onPress={() => {
            Alert.alert('Alert', 'Press More button');
          }}
        />
      </Appbar.Header>
      <BannerSample />
      <ScrollView>
        <CardSample />
        {componentList.map((component, index) => (
          <Card key={index.toString()} style={styles.card}>
            <Card.Title
              title={component.title}
              style={[styles.borderTop, {backgroundColor: theme.colors.primary}]}
              titleStyle={styles.cardTitleText}
            />
            <Card.Content style={styles.cardContent}>{component.element}</Card.Content>
          </Card>
        ))}
      </ScrollView>
    </Layout>
  );
};
