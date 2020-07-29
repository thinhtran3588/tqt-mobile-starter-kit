import React from 'react';

jest.mock('i18next', () => ({
  use: () => ({
    init: () => ({
      t: (k) => k,
      on: () => {},
    }),
  }),
  changeLanguage: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
  I18nextProvider: 'I18nextProvider',
}));

jest.mock('react-native-paper', () => {
  const actualModule = jest.requireActual('react-native-paper');
  const Button = require('react-native').Button;
  const Banner = actualModule.Banner;
  return {
    ...actualModule,
    Button: (props) => {
      const {children, testID, onPress} = props;
      return <Button onPress={onPress} testID={testID} title={typeof children === 'string' ? children : 'Button'} />;
    },
    Appbar: {
      ...actualModule.Appbar,
      BackAction: (props) => {
        const {testID, onPress} = props;
        return <Button onPress={onPress} testID={testID} title={'Back'} />;
      },
      Action: (props) => {
        const {icon, testID, onPress} = props;
        return <Button onPress={onPress} testID={testID} title={icon} />;
      },
    },
    Banner: (props) => {
      const {actions, children, ...other} = props;
      return (
        <Banner {...other} actions={[]}>
          {children}
          {actions &&
            actions.map((action, index) => <Button key={index} onPress={action.onPress} title={action.label} />)}
        </Banner>
      );
    },
  };
});

jest.mock('@react-native-community/blur', () => ({
  BlurView: 'BlurView',
}));

jest.mock('react-native-picker', () => ({
  init: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualModule = jest.requireActual('@react-navigation/native');
  const useIsFocused = jest.fn().mockReturnValue(true);
  return {
    ...actualModule,
    useIsFocused,
  };
});

jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
