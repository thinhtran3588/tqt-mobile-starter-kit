import 'react-native';
import React from 'react';
import {render, toJSON} from '@test-utils';
import {SettingsScreen} from '@settings/screens/settings/settings.screen';

it('renders correctly', async () => {
  const {baseElement} = render(<SettingsScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});
