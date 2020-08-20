// import React from 'react';
// import {render, fireEvent} from '@test-utils';
// import RNBootSplash from 'react-native-bootsplash';
// import {App, BaseApp} from '@app/app.component';
// import {AppThemeProvider, useAppTheme, LanguageProvider, PrimaryColorProvider} from '@app/core';
// import {Button} from 'react-native-paper';
// import {AppNavigation} from '@app/app.navigation';

it('update later', async () => {});

export {};

// const Wrapper = (): JSX.Element => {
//   const [, {setUseSystemTheme, setDarkMode}] = useAppTheme();
//   return (
//     <>
//       <BaseApp />
//       <Button onPress={() => setUseSystemTheme(false)}>Toggle system theme</Button>
//       <Button onPress={() => setDarkMode(true)}>Toggle dark theme</Button>
//     </>
//   );
// };

// beforeAll(() => {
//   RNBootSplash.hide = jest.fn();
//   jest.resetAllMocks();
// });

// it('renders correctly', async () => {
//   render(<App />, undefined, false);
//   // await waitForElement(() => getByText('components'));
//   expect(RNBootSplash.hide).toHaveBeenCalled();
// });

// it('renders Dark theme', async () => {
//   const {baseElement, getByTitle} = render(
//     <LanguageProvider>
//       <AppThemeProvider>
//         <PrimaryColorProvider>
//           <Wrapper />
//         </PrimaryColorProvider>
//       </AppThemeProvider>
//     </LanguageProvider>,
//     undefined,
//     false,
//   );
//   // await waitForElement(() => getByText('components'));
//   expect(RNBootSplash.hide).toHaveBeenCalled();
//   fireEvent.press(getByTitle('Toggle system theme'));
//   fireEvent.press(getByTitle('Toggle dark theme'));
//   expect(baseElement).toMatchSnapshot();
// });

// it('renders navigation', async () => {
//   const {baseElement} = render(
//     <AppThemeProvider>
//       <AppNavigation />
//     </AppThemeProvider>,
//   );
//   expect(baseElement).toMatchSnapshot();
// });
