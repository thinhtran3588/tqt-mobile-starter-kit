import React from 'react';
import {render, toJSON} from '@test-utils';
import {ThemeSetting} from '@settings/screens/settings/components';

it('renders with system light theme', async () => {
  const {baseElement} = render(<ThemeSetting />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders with system dark theme', async () => {
  jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: () => 'dark',
  }));
  const {baseElement} = render(<ThemeSetting />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});
