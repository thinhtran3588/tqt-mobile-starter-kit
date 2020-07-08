import React from 'react';
import {render, fireEvent, toJSON} from '@test-utils';
import {BannerSample} from '@samples/screens/component-list/components';
import {sleep} from '@tqt/mobile';

it('presses Close Banner button', async () => {
  const {baseElement, getByText} = render(<BannerSample />);

  expect(toJSON(baseElement)).toMatchSnapshot();
  fireEvent.press(getByText('Close Banner'));
  await sleep(1000);
  // render updated view
  expect(toJSON(baseElement)).toMatchSnapshot();
});
