import React from 'react';
import {Alert} from 'react-native';
import {render, fireEvent} from '@test-utils';
import {ButtonSample} from '@samples/screens/component-list/components';

beforeAll(() => {
  // mock alert
  Alert.alert = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

it('presses the sample button', async () => {
  const {getByTestId} = render(<ButtonSample />);
  fireEvent.press(getByTestId('sample-button'));
  expect(Alert.alert).toBeCalledWith('Press me', 'Pressed');
});
