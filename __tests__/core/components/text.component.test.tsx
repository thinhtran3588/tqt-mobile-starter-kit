import 'react-native';
import React from 'react';
import {render, toJSON} from '@test-utils';
import {Text} from '@core/components';

it('renders correctly', async () => {
  const {baseElement} = render(<Text>Text</Text>);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders type correctly', async () => {
  const {baseElement} = render(<Text type='h1'>Text</Text>);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders uppercase correctly', async () => {
  const {baseElement} = render(
    <Text type='h1' uppercase>
      Text
    </Text>,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders lowercase correctly', async () => {
  const {baseElement} = render(
    <Text type='h1' lowercase>
      Text
    </Text>,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders nested child correctly', async () => {
  const {baseElement} = render(
    <Text type='h1' lowercase>
      <Text>Text</Text>
    </Text>,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});
