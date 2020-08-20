/* eslint-disable @typescript-eslint/no-explicit-any */
// https://testing-library.com/docs/native-testing-library/setup
import React, {ReactNode, ReactElement} from 'react';
import {render, RenderResult, RenderOptions} from '@testing-library/react-native';
import {InternetConnectionProvider, LoadingProvider} from '@core/contexts';
import {PaperProvider, DefaultTheme, DarkTheme} from '@core/components';
import {AuthProvider} from '@auth/contexts';
import {useSelector} from 'react-redux';
import {RootState} from '@app/stores';
import merge from 'lodash/merge';
import {COLORS_LOOKUP} from '@app/core/constants';

interface Props {
  children?: ReactNode;
}

const BaseApp = (props: Props): JSX.Element => {
  const {children} = props;
  const theme = useSelector((state: RootState) => state.theme);
  const paperTheme: typeof DarkTheme = merge({}, theme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: COLORS_LOOKUP.CYAN.color},
  });

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};

const AllTheProviders = (props: Props): JSX.Element => {
  const {children} = props;
  return (
    <LoadingProvider>
      <AuthProvider>
        <InternetConnectionProvider>
          <BaseApp>{children}</BaseApp>
        </InternetConnectionProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

const customRender = (
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
