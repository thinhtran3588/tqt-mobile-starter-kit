import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import commonEn from '@assets/json/locales/en/common.json';
import settingsEn from '@assets/json/locales/en/settings.json';
import authEn from '@assets/json/locales/en/auth.json';
import commonVi from '@assets/json/locales/vi/common.json';
import settingsVi from '@assets/json/locales/vi/settings.json';
import authVi from '@assets/json/locales/vi/auth.json';
import {config} from '@core/config';

i18next.use(initReactI18next).init({
  lng: config().defaultLang,
  debug: __DEV__,
  resources: {
    en: {
      common: commonEn,
      settings: settingsEn,
      auth: authEn,
    },
    vi: {
      common: commonVi,
      settings: settingsVi,
      auth: authVi,
    },
  },
});

export {i18next};
