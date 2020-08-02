import React from 'react';
import {render, toJSON} from '@test-utils';
import {LoadingModal} from '@core/components';

it('renders correctly', async () => {
  const {baseElement} = render(<LoadingModal loading />);
  expect(toJSON(baseElement)).toMatchSnapshot();
});
