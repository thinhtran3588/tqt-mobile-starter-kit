jest.mock('i18next', () => ({
  use: () => ({
    init: () => ({
      t: (k) => k,
      on: () => {},
    }),
  }),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
  I18nextProvider: 'I18nextProvider',
}));
