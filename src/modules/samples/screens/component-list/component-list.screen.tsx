import React from 'react';
import {useTranslation} from 'react-i18next';
import {Appbar, Card, Colors} from '@core/components';
import {ActivityIndicatorSample, TextSample} from './components';
import {styles} from './component-list.styles';

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
  ];

  return (
    <>
      <Appbar.Header style={{backgroundColor: Colors.amber500}}>
        <Appbar.Content title={t('common:components')} />
      </Appbar.Header>
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
    </>
  );
};
