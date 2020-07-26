import React from 'react';
import {Alert} from 'react-native';
import {render, fireEvent} from '@test-utils';
import {CardSample} from '@samples/screens/component-list/components';

beforeAll(() => {
  // mock alert
  Alert.alert = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

it('presses the Cancel button', async () => {
  const {getByTestId} = render(<CardSample />);
  fireEvent.press(getByTestId('cancel-button'));
  expect(Alert.alert).toBeCalledWith('Alert', 'Press Cancel button');
});

it('presses the OK button', async () => {
  const {getByTestId} = render(<CardSample />);
  fireEvent.press(getByTestId('ok-button'));
  expect(Alert.alert).toBeCalledWith('Alert', 'Press OK button');
});
