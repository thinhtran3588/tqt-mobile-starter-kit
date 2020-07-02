import 'react-native';
import React from 'react';
import {render, toJSON} from '@test-utils';
import {ComponentListScreen} from '@samples/screens/component-list/component-list.screen';

it('renders correctly', async () => {
  const {baseElement} = render(<ComponentListScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});
