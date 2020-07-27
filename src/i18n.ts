import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {DEFAULT_LANGUAGE} from '@core/contexts';
import commonEn from '@assets/json/locales/en/common.json';
import settingsEn from '@assets/json/locales/en/settings.json';
import commonVi from '@assets/json/locales/vi/common.json';
import settingsVi from '@assets/json/locales/vi/settings.json';

i18next.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  debug: __DEV__,
  resources: {
    en: {
      common: commonEn,
      settings: settingsEn,
    },
    vi: {
      common: commonVi,
      settings: settingsVi,
    },
  },
});

export {i18next};
