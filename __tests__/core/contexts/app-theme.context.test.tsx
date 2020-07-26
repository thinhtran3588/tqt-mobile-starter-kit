import React from 'react';
import {render, waitForElement} from '@test-utils';
import {BaseApp} from '@app/app.component';

it('throws error if not wrapped by AppThemeProvider', async () => {
  let hasError = false;
  try {
    const {getByText} = render(<BaseApp />, undefined, false);
    await waitForElement(() => getByText('components'));
  } catch {
    hasError = true;
  }
  expect(hasError).toBe(true);
});
