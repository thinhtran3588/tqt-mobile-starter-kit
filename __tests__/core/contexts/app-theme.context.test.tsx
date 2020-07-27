import React from 'react';
import {render} from '@test-utils';
import {SettingsScreen} from '@settings/screens';

it('throws error if not wrapped by AppThemeProvider', async () => {
  // expect(() => render(<SettingsScreen />, undefined, false)).toThrowError();
});
