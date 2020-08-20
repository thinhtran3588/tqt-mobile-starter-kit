import React, {useState} from 'react';
import {Checkbox, CheckboxStatus} from '@app/core';

export const CheckboxSample = (): JSX.Element => {
  const [status1, setStatus1] = useState<CheckboxStatus>('indeterminate');
  const [status2, setStatus2] = useState<CheckboxStatus>('unchecked');
  const [status3, setStatus3] = useState<CheckboxStatus>('checked');
  const [status4] = useState<CheckboxStatus>('checked');
  return (
    <>
      <Checkbox
        title='Option 1'
        status={status1}
        onPress={() => setStatus1(status1 === 'checked' ? 'unchecked' : 'checked')}
      />
      <Checkbox
        title='Option 2'
        status={status2}
        onPress={() => setStatus2(status2 === 'checked' ? 'unchecked' : 'checked')}
      />
      <Checkbox
        title='Option 3'
        status={status3}
        onPress={() => setStatus3(status3 === 'checked' ? 'unchecked' : 'checked')}
      />
      <Checkbox title='Option 4 (disabled)' status={status4} disabled />
    </>
  );
};
