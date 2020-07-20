// https://testing-library.com/docs/native-testing-library/setup
import React, {ReactNode, ReactElement} from 'react';
import {render, RenderResult, RenderOptions} from '@testing-library/react-native';

interface AllTheProvidersProps {
  children?: ReactNode;
}
const AllTheProviders = (props: AllTheProvidersProps): JSX.Element => {
  const {children} = props;
  return <>{children}</>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: ReactElement<any>, options?: Omit<RenderOptions, 'queries'>): RenderResult => {
  return render(ui, {wrapper: AllTheProviders, ...options});
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
