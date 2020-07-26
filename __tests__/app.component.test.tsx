import React from 'react';
import {render, waitForElement, fireEvent} from '@test-utils';
import RNBootSplash from 'react-native-bootsplash';
import {App, BaseApp} from '@app/app.component';
import {AppThemeProvider, useAppTheme} from '@app/core/contexts';
import {Button} from 'react-native-paper';

const Wrapper = (): JSX.Element => {
  const [, {setUseSystemTheme, setDarkMode}] = useAppTheme();
  return (
    <>
      <BaseApp />
      <Button onPress={() => setUseSystemTheme(false)}>Toggle system theme</Button>
      <Button onPress={() => setDarkMode(true)}>Toggle dark theme</Button>
    </>
  );
};

beforeAll(() => {
  RNBootSplash.hide = jest.fn();
  jest.resetAllMocks();
});

it('renders correctly', async () => {
  const {getByText} = render(<App />, undefined, false);
  await waitForElement(() => getByText('components'));
  expect(RNBootSplash.hide).toHaveBeenCalled();
});

it('renders Dark theme', async () => {
  const {getByText, getByTitle} = render(
    <AppThemeProvider>
      <Wrapper />
    </AppThemeProvider>,
    undefined,
    false,
  );
  await waitForElement(() => getByText('components'));
  expect(RNBootSplash.hide).toHaveBeenCalled();
  fireEvent.press(getByTitle('Toggle system theme'));
  fireEvent.press(getByTitle('Toggle dark theme'));
});
