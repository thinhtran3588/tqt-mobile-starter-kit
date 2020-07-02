import 'react-native';
import React from 'react';
import {render, toJSON, wait} from '@test-utils';
import {App} from '@app/app.component';

it('renders correctly', async () => {
  const {baseElement, getByText} = render(<App />);
  expect(toJSON(baseElement)).toMatchSnapshot();
  await wait(() => getByText('components'));
});
