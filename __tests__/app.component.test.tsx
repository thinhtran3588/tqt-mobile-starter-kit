import 'react-native';
import React from 'react';
import {render, toJSON, wait} from '@test-utils';
import {App} from '@app/app.component';

it('renders app correctly', async () => {
  const {baseElement, getByText} = render(<App />);
  await wait(() => getByText('paragraph'));
  expect(toJSON(baseElement)).toMatchSnapshot();
});
