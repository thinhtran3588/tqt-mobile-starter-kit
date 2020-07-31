import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {DEFAULT_LANGUAGE} from '@core/contexts';
import commonEn from '@assets/json/locales/en/common.json';
import settingsEn from '@assets/json/locales/en/settings.json';
import signInEn from '@assets/json/locales/en/sign-in.json';
import commonVi from '@assets/json/locales/vi/common.json';
import settingsVi from '@assets/json/locales/vi/settings.json';
import signInVi from '@assets/json/locales/vi/sign-in.json';

i18next.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  debug: __DEV__,
  resources: {
    en: {
      common: commonEn,
      settings: settingsEn,
      signIn: signInEn,
    },
    vi: {
      common: commonVi,
      settings: settingsVi,
      signIn: signInVi,
    },
  },
});

export {i18next};
