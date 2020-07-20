import 'react-native';
import React from 'react';
import {render, toJSON} from '@test-utils';
import {LoadingScreen} from '@core/components';

it('renders correctly', async () => {
  const {baseElement} = render(<LoadingScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});
