import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, Dispatch} from '@app/stores';
import {ListItem, Confirmation} from '@app/core';

export const BetaUserSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [open, setOpen] = useState(false);
  const isTester = useSelector((state: RootState) => state.settings.isTester);
  const {
    settings: {setIsTester},
  } = useDispatch<Dispatch>();

  const show = (): void => {
    setOpen(true);
  };

  return (
    <>
      <ListItem
        title={t('betaUser')}
        leftIcon='beta'
        switchRight
        switchRightValue={isTester}
        switchRightOnValueChange={show}
        switchRightTestID='beta-user-switch'
      />
      <Confirmation
        message={t(isTester ? 'leaveBetaUserConfirmation' : 'joinBetaUserConfirmation')}
        open={open}
        onClose={() => setOpen(false)}
        buttons={[
          {
            text: t('common:cancel'),
          },
          {
            text: t('common:confirm'),
            onPress: () => setIsTester(!isTester),
            type: 'PRIMARY',
          },
        ]}
      />
    </>
  );
};
