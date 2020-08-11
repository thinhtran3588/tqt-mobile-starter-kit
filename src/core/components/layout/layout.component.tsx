import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, ViewStyle, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
import {Surface, useTheme, Appbar} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppTheme, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@core/contexts';
import {InternetConnection} from '../internet-connection/internet-connection.component';
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
  showInternetConnection?: boolean;
  style?: ViewStyle;
}

export const Layout = (props: LayoutProps): JSX.Element => {
  const {appTheme} = useAppTheme();
  const navigation = useNavigation();
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
    showInternetConnection = true,
    style,
  } = props;
  const isFocused = useIsFocused();
  const appHeaderColor = headerColor || (appTheme.theme === 'dark' ? theme.colors.surface : theme.colors.primary);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const goBack = (): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

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
              onPress={headerBackButtonOnPress || goBack}
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
        <Surface
          style={[
            styles.flex,
            style,
            {
              marginBottom: keyboardHeight,
            },
          ]}>
          {children}
        </Surface>
      </SafeAreaView>
      {showInternetConnection && <InternetConnection />}
    </>
  );
};
