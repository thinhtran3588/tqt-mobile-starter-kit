import React from 'react';
import {Platform, Alert} from 'react-native';
import MockDate from 'mockdate';
import {render, toJSON, fireEvent} from '@test-utils';
import {ComponentListScreen} from '@samples/screens/component-list/component-list.screen';

beforeEach(() => {
  // mock alert
  Alert.alert = jest.fn();
  MockDate.set(new Date(2020, 0, 1));
});

afterEach(() => {
  jest.resetAllMocks();
  MockDate.reset();
});

it('renders correctly', async () => {
  const {baseElement} = render(<ComponentListScreen />);
  // I use a timestamp to make sure the date stays fixed to the ms
  // test code here
  // reset to native Date()
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders correctly in Android', async () => {
  Platform.OS = 'android';
  const {baseElement} = render(<ComponentListScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('presses More icon', async () => {
  const {getByTestId} = render(<ComponentListScreen />);
  fireEvent.press(getByTestId('more-action'));
  expect(Alert.alert).toBeCalledWith('Alert', 'Press More button');
});
