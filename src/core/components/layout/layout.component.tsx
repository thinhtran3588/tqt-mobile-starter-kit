import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Surface, useTheme, Appbar} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useAppTheme, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@app/core/contexts';
import {styles} from './layout.styles';

export interface LayoutProps {
  children?: React.ReactNode;
  header?: boolean;
  headerTitle?: string;
  headerBackButton?: boolean;
  headerBackButtonTestID?: string;
  headerBackButtonOnPress?: () => void;
  headerLeftActions?: {icon: string; onPress?: () => void; testID?: string; color?: string}[];
  headerRightActions?: {icon: string; onPress?: () => void; testID?: string; color?: string}[];
  headerColor?: string;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const [appTheme] = useAppTheme();
  const theme = useTheme();
  const {
    headerTitle,
    headerBackButton,
    headerBackButtonTestID,
    headerBackButtonOnPress,
    headerLeftActions,
    headerRightActions,
    headerColor,
    header,
    children,
  } = props;
  const isFocused = useIsFocused();
  const appHeaderColor = headerColor || theme.colors.primary;
  return (
    <>
      {isFocused && (
        <StatusBar
          animated
          barStyle={header || appTheme.theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={header ? appHeaderColor : theme.colors.background}
        />
      )}
      {header && (
        <Appbar.Header style={{backgroundColor: appHeaderColor}}>
          {headerBackButton && (
            <Appbar.BackAction
              testID={headerBackButtonTestID}
              onPress={headerBackButtonOnPress}
              color={LIGHT_BACKGROUND_COLOR}
            />
          )}
          {Boolean(headerLeftActions) &&
            headerLeftActions?.map((action) => (
              <Appbar.Action
                key={`left-${action.icon}`}
                icon={action.icon}
                onPress={action.onPress}
                testID={action.testID}
                color={action.color || LIGHT_BACKGROUND_COLOR}
              />
            ))}
          <Appbar.Content title={headerTitle} color={LIGHT_BACKGROUND_COLOR} />
          {Boolean(headerRightActions) &&
            headerRightActions?.map((action) => (
              <Appbar.Action
                key={`right-${action.icon}`}
                icon={action.icon}
                onPress={action.onPress}
                testID={action.testID}
                color={action.color || LIGHT_BACKGROUND_COLOR}
              />
            ))}
        </Appbar.Header>
      )}
      <SafeAreaView
        style={[
          styles.flex,
          {
            backgroundColor: appTheme.theme === 'light' ? LIGHT_BACKGROUND_COLOR : DARK_BACKGROUND_COLOR,
          },
        ]}>
        <Surface style={styles.flex}>{children}</Surface>
      </SafeAreaView>
    </>
  );
};
