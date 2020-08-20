/* eslint-disable @typescript-eslint/no-explicit-any */
// https://testing-library.com/docs/native-testing-library/setup
import React, {ReactNode, ReactElement} from 'react';
import merge from 'lodash/merge';
import {render, RenderResult, RenderOptions} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import {PaperProvider, DefaultTheme, DarkTheme, COLORS_LOOKUP} from '@app/core';
import {RootState} from '@app/stores';

interface Props {
  children?: ReactNode;
}

const AllTheProviders = (props: Props): JSX.Element => {
  const {children} = props;
  const theme = useSelector((state: RootState) => state.settings.theme);
  const paperTheme: typeof DarkTheme = merge({}, theme.theme === 'dark' ? DarkTheme : DefaultTheme, {
    colors: {primary: COLORS_LOOKUP.CYAN.color},
  });

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};

const customRender = (
  ui: ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'>,
  useWrapper: boolean = true,
): RenderResult => {
  return render(ui, {wrapper: useWrapper ? AllTheProviders : options?.wrapper, ...options});
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
