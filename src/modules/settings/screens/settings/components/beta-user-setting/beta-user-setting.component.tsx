import React from 'react';
import {useTranslation} from 'react-i18next';
import {useConfirmation} from '@core/contexts';
import {ListItem} from '@core/components';
import {useAuth} from '@auth/contexts';

export const BetaUserSetting = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const [{isTester}, {setIsTester}] = useAuth();
  const {
    dispatch: {openConfirmation},
  } = useConfirmation();

  const show = (): void => {
    openConfirmation({
      message: t(isTester ? 'leaveBetaUserConfirmation' : 'joinBetaUserConfirmation'),
      buttons: [
        {
          text: t('common:cancel'),
        },
        {
          text: t('common:confirm'),
          onPress: () => setIsTester(!isTester),
          type: 'PRIMARY',
        },
      ],
    });
  };

  return (
    <ListItem
      title={t('betaUser')}
      leftIcon='beta'
      switchRight
      switchRightValue={isTester}
      switchRightOnValueChange={show}
      switchRightTestID='beta-user-switch'
    />
  );
};
