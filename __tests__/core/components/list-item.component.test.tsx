import React from 'react';
import {render, toJSON} from '@test-utils';
import {ListItem} from '@core/components';

it('renders correctly', async () => {
  const {baseElement} = render(<ListItem title='List Item' />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders with icons correctly', async () => {
  const {baseElement} = render(<ListItem title='List Item' leftIcon='format-color-fill' rightIcon='chevron-right' />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});

it('renders with switch correctly', async () => {
  const {baseElement} = render(
    <ListItem title='List Item' leftIcon='format-color-fill' switchRight switchRightValue />,
  );
  expect(toJSON(baseElement)).toMatchSnapshot();
});
