import React from 'react';
import {Platform, Alert} from 'react-native';
import {render, toJSON, fireEvent} from '@test-utils';
import {ComponentListScreen} from '@samples/screens/component-list/component-list.screen';

beforeAll(() => {
  // mock alert
  Alert.alert = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

it('renders correctly', async () => {
  const {baseElement} = render(<ComponentListScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders correctly in Android', async () => {
  Platform.OS = 'android';
  const {baseElement} = render(<ComponentListScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('presses Back icon', async () => {
  const {getByTestId} = render(<ComponentListScreen />);
  fireEvent.press(getByTestId('back-action'));
  expect(Alert.alert).toBeCalledWith('Alert', 'Press Back button');
});

it('presses More icon', async () => {
  const {getByTestId} = render(<ComponentListScreen />);
  fireEvent.press(getByTestId('more-action'));
  expect(Alert.alert).toBeCalledWith('Alert', 'Press More button');
});
