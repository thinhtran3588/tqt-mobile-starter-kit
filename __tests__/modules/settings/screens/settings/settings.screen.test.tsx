import 'react-native';
import React from 'react';
import {render, toJSON, fireEvent} from '@test-utils';
import {SettingsScreen} from '@settings/screens/settings/settings.screen';

it('renders correctly', async () => {
  const {baseElement} = render(<SettingsScreen />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('uses light theme', async () => {
  const {baseElement, getByTestId} = render(<SettingsScreen />);
  fireEvent.valueChange(getByTestId('system-theme-switch'), false);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('uses dark theme', async () => {
  const {baseElement, getByTestId} = render(<SettingsScreen />);
  fireEvent.valueChange(getByTestId('system-theme-switch'), false);
  fireEvent.valueChange(getByTestId('dark-theme-switch'), true);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('opens primary color picker', async () => {
  const {baseElement, getByTestId} = render(<SettingsScreen />);
  fireEvent.press(getByTestId('primary-color-list-item'));
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('opens language picker', async () => {
  const {baseElement, getByTestId} = render(<SettingsScreen />);
  fireEvent.press(getByTestId('language-list-item'));
  expect(toJSON(baseElement)).toMatchSnapshot();
});
