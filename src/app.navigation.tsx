import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {WebViewScreen} from '@core/screens';
import {ComponentListScreen} from '@samples/screens';
import {SettingsScreen} from '@settings/screens';
import {SignInScreen, ForgotPassword} from '@auth/screens';
import {Colors, Icon} from '@core/components';
import {useAppTheme} from '@core/contexts';
import {useAuth} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

interface TabItem {
  name: string;
  title: string;
  icon: string;
  iconFocused: string;
  tabBarColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FunctionComponent<any>;
}

interface StackItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FunctionComponent<any>;
}

const MainTabs = (): JSX.Element => {
  const {t} = useTranslation('common');
  const theme = useTheme();
  const [appTheme] = useAppTheme();
  const tabItems: TabItem[] = [
    {
      name: SCREEN_NAME.COMPONENT_LIST,
      title: t('components'),
      icon: 'view-dashboard-outline',
      iconFocused: 'view-dashboard',
      tabBarColor: theme.colors.primary,
      component: ComponentListScreen,
    },
    {
      name: SCREEN_NAME.SETTINGS,
      title: t('settings'),
      icon: 'cog-outline',
      iconFocused: 'cog',
      tabBarColor: Colors.deepOrange500,
      component: SettingsScreen,
    },
  ];
  return (
    <Tab.Navigator shifting initialRouteName={SCREEN_NAME.COMPONENT_LIST}>
      {tabItems.map((tabItem, index) => (
        <Tab.Screen
          key={tabItem.name}
          name={tabItem.name}
          component={tabItem.component}
          options={{
            title: tabItem.title,
            tabBarIcon: (iconProps) => {
              const {focused, color} = iconProps;
              return <Icon name={focused ? tabItem.iconFocused : tabItem.icon} color={color} size={25} />;
            },
            tabBarColor: appTheme.theme === 'dark' ? theme.colors.surface : tabItem.tabBarColor,
            tabBarBadge: index === 0 ? 10 : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export const AppNavigation = (): JSX.Element => {
  const [auth] = useAuth();
  const stackItems: StackItem[] = [
    {
      name: SCREEN_NAME.MAIN_TABS,
      component: MainTabs,
    },
    {
      name: SCREEN_NAME.WEB_VIEW,
      component: WebViewScreen,
    },
    {
      name: SCREEN_NAME.SIGN_IN,
      component: SignInScreen,
    },
    {
      name: SCREEN_NAME.FORGOT_PASSWORD,
      component: ForgotPassword,
    },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth.isSignedIn ? SCREEN_NAME.MAIN_TABS : SCREEN_NAME.SIGN_IN}>
        {stackItems.map((stackItem) => (
          <Stack.Screen
            key={stackItem.name}
            name={stackItem.name}
            component={stackItem.component}
            options={{header: () => <></>}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
