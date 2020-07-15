import 'react-native';
import React from 'react';
import {render, waitForElement} from '@test-utils';
import RNBootSplash from 'react-native-bootsplash';
import {App} from '@app/app.component';

beforeAll(() => {
  RNBootSplash.hide = jest.fn();
});

it('renders correctly', async () => {
  const {getByText} = render(<App />);
  await waitForElement(() => getByText('components'));
  expect(RNBootSplash.hide).toHaveBeenCalled();
});
