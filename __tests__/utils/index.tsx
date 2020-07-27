// https://testing-library.com/docs/native-testing-library/setup
import React, {ReactNode, ReactElement} from 'react';
import {render, RenderResult, RenderOptions} from '@testing-library/react-native';
import {AppThemeProvider, useAppTheme, PrimaryColorProvider, LanguageProvider} from '@app/core/contexts';
import {PaperProvider, DefaultTheme, DarkTheme} from '@app/core/components';
import {useColorScheme} from 'react-native';

interface Props {
  children?: ReactNode;
}

const BaseApp = (props: Props): JSX.Element => {
  const {children} = props;
  const [appTheme] = useAppTheme();
  const colorScheme = useColorScheme();
  let useDarkTheme = true;
  if (appTheme.useSystemTheme) {
    useDarkTheme = colorScheme === 'dark';
  } else {
    useDarkTheme = appTheme.darkMode;
  }
  const theme: typeof DefaultTheme = {
    ...(useDarkTheme ? DarkTheme : DefaultTheme),
  };
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

const AllTheProviders = (props: Props): JSX.Element => {
  const {children} = props;
  return (
    <LanguageProvider>
      <PrimaryColorProvider>
        <AppThemeProvider>
          <BaseApp>{children}</BaseApp>
        </AppThemeProvider>
      </PrimaryColorProvider>
    </LanguageProvider>
  );
};

const customRender = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ui: ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>,
  useWrapper: boolean = true,
): RenderResult => {
  if (useWrapper) {
    return render(ui, {wrapper: AllTheProviders, ...options});
  }
  return render(ui, options);
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
