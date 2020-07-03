import React from 'react';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Appbar, Card, Colors, Alert, ScrollView} from '@core/components';
import {ActivityIndicatorSample, TextSample, AvatarSample, BadgeSample, BannerSample, ButtonSample} from './components';
import {styles} from './component-list.styles';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const ComponentListScreen = (): JSX.Element => {
  const {t} = useTranslation('');
  const componentList = [
    {
      title: 'Text',
      element: <TextSample />,
    },
    {
      title: 'ActivityIndicator',
      element: <ActivityIndicatorSample />,
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
    <>
      <Appbar.Header style={{backgroundColor: Colors.amber500}}>
        <Appbar.BackAction
          onPress={() => {
            Alert.alert('Alert', 'Press Back button');
          }}
        />
        <Appbar.Content title={t('common:components')} />
        <Appbar.Action
          icon={MORE_ICON}
          onPress={() => {
            Alert.alert('Alert', 'Press More button');
          }}
        />
      </Appbar.Header>
      <BannerSample />
      <ScrollView>
        {componentList.map((component, index) => (
          <Card key={index.toString()} style={styles.card}>
            <Card.Title
              title={component.title}
              style={[styles.cardTitle, {backgroundColor: Colors.amber500}]}
              titleStyle={styles.cardTitleText}
            />
            <Card.Content>{component.element}</Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};
