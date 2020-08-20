/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import {
  Layout,
  Image,
  Button,
  TabView,
  TabBar,
  SceneMap,
  ScrollView,
  useDimensions,
  DARK_BACKGROUND_COLOR,
  LIGHT_BACKGROUND_COLOR,
} from '@app/core';
import {SCREEN_NAME} from '@app/app.constants';
import Logo from '@app/assets/images/app-logo.png';
import {SocialSignIn, LanguageSetting, EmailSignIn, EmailSignUp} from './components';
import {styles} from './sign-in.styles';

export const SignInScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const paperTheme = useTheme();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const backgroundColor = theme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    {key: 'signIn', title: t('signIn')},
    {key: 'signUp', title: t('signUp')},
  ]);
  const dimensions = useDimensions();
  const language = useSelector((state: RootState) => state.settings.language);
  const CONTAINER_HEIGHT = 650;
  const marginTop = dimensions.window.height < CONTAINER_HEIGHT ? 0 : (dimensions.window.height - CONTAINER_HEIGHT) / 2;

  const renderScene = SceneMap({
    signIn: EmailSignIn,
    signUp: EmailSignUp,
  });

  useEffect(() => {
    setRoutes([
      {key: 'signIn', title: t('signIn')},
      {key: 'signUp', title: t('signUp')},
    ]);
  }, [language, t]);

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={[styles.logo, {marginTop}]} source={Logo} />
        <TabView
          navigationState={{index: tabIndex, routes}}
          renderScene={renderScene}
          onIndexChange={setTabIndex}
          renderTabBar={(tabProps) => (
            <TabBar
              {...tabProps}
              style={{backgroundColor}}
              labelStyle={[styles.tabBarLabel, {color: paperTheme.colors.text}]}
              indicatorStyle={{backgroundColor: theme.colors.primary}}
            />
          )}
        />
        <SocialSignIn />
        <Button onPress={() => navigation.navigate(SCREEN_NAME.MAIN_TABS)} uppercase={false}>
          {t('skipSignIn')}
        </Button>
        <LanguageSetting />
      </ScrollView>
    </Layout>
  );
};
