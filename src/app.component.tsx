import React from 'react';
import {Text, RootLayout} from '@core/components';

const App = (): JSX.Element => {
  return (
    <RootLayout>
      <Text type='h1'>H1</Text>
      <Text type='h2'>H2</Text>
      <Text type='h3'>H3</Text>
      <Text type='h4'>H4</Text>
      <Text type='h5'>H5</Text>
      <Text type='h6'>H6</Text>
      <Text type='label'>label</Text>
      <Text type='p'>paragraph</Text>
      <Text uppercase>uppercase</Text>
      <Text lowercase>LOWERCASE</Text>
    </RootLayout>
  );
};

export default App;
