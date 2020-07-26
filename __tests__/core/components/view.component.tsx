import React from 'react';
import {render, toJSON} from '@test-utils';
import {Text, View} from '@core/components';

it('renders correctly', async () => {
  const {baseElement} = render(
    <View>
      <Text>Text</Text>
    </View>,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders row correctly', async () => {
  const {baseElement} = render(
    <View row>
      <Text>Text</Text>
    </View>,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});
