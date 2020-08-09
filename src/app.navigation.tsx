/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';
import {WebViewScreen} from '@core/screens';
import {ComponentListScreen, FormScreen} from '@samples/screens';
import {SettingsScreen} from '@settings/screens';
import {SignInScreen, ForgotPasswordScreen, SignInPhoneNoScreen} from '@auth/screens';
import {Colors, Icon} from '@core/components';
import {useAppTheme} from '@core/contexts';
import {useAuth} from '@auth/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {trackScreen} from './core/analytics';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

interface TabItem {
  name: string;
  title: string;
  icon: string;
  iconFocused: string;
  tabBarColor: string;
  component: React.FunctionComponent;
}

interface StackItem {
  name: string;
  component: React.FunctionComponent;
}

const MainTabs = (): JSX.Element => {
  const {t} = useTranslation('common');
  const theme = useTheme();
  const {appTheme} = useAppTheme();
  const tabItems: TabItem[] = [
    {
      name: SCREEN_NAME.COMPONENT_LIST,
      title: 'Components',
      icon: 'view-dashboard-outline',
      iconFocused: 'view-dashboard',
      tabBarColor: theme.colors.primary,
      component: ComponentListScreen,
    },
    {
      name: SCREEN_NAME.FORM,
      title: 'Form',
      icon: 'calendar-text-outline',
      iconFocused: 'calendar-text',
      tabBarColor: Colors.purple500,
      component: FormScreen,
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
  const {auth} = useAuth();
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

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
      component: ForgotPasswordScreen,
    },
    {
      name: SCREEN_NAME.SIGN_IN_PHONE_NO,
      component: SignInPhoneNoScreen,
    },
  ];

  return (
    <NavigationContainer
      ref={navigationRef as any}
      onReady={() => {
        routeNameRef.current = (navigationRef.current as any).getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = (navigationRef.current as any).getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          trackScreen(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
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
