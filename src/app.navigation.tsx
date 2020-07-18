import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {ComponentListScreen} from '@samples/screens';
import {SettingsScreen} from '@settings/screens';
import {Colors, Icon} from '@core/components';
import {useTranslation} from 'react-i18next';
import {SCREEN_NAME} from '@app/app.constants';

const Tab = createMaterialBottomTabNavigator();

interface TabItem {
  name: string;
  title: string;
  icon: string;
  iconFocused: string;
  tabBarColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FunctionComponent<any>;
}

export const AppNavigation = (): JSX.Element => {
  const {t} = useTranslation('common');
  const tabItems: TabItem[] = [
    {
      name: SCREEN_NAME.COMPONENT_LIST,
      title: t('components'),
      icon: 'view-dashboard-outline',
      iconFocused: 'view-dashboard',
      tabBarColor: Colors.amber500,
      component: ComponentListScreen,
    },
    {
      name: SCREEN_NAME.SETTINGS,
      title: t('settings'),
      icon: 'cog-outline',
      iconFocused: 'cog',
      tabBarColor: Colors.cyan500,
      component: SettingsScreen,
    },
  ];
  return (
    <NavigationContainer>
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
              tabBarColor: tabItem.tabBarColor,
              tabBarBadge: index === 0 ? 10 : undefined,
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
