import {config, updateConfig} from '@app/core/config';

it('update configuration correctly', async () => {
  expect(config()).toMatchInlineSnapshot(`
    Object {
      "android": Object {
        "id": "pro.thinhtran.starterkit",
      },
      "appInfo": Object {
        "author": "Thinh Tran",
        "build": "4",
        "copyright": "Copyright © 2020 by Thinh Tran",
        "name": "TQT Starter Kit",
        "privacyPolicyUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/privacypolicy.html",
        "tosUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/termsandconditions.html",
        "version": "0.5.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "defaultLang": "vi",
      "fb": Object {
        "id": "",
      },
      "ios": Object {
        "id": "pro.thinhtran.starterkit",
      },
    }
  `);
  updateConfig({
    android: {
      id: 'pro.thinhtran.test',
    },
    appInfo: {
      name: 'TQT Starter Kit Test',
    },
    ios: {
      id: 'pro.thinhtran.test',
    },
  });
  expect(config()).toMatchInlineSnapshot(`
    Object {
      "android": Object {
        "id": "pro.thinhtran.test",
      },
      "appInfo": Object {
        "author": "Thinh Tran",
        "build": "4",
        "copyright": "Copyright © 2020 by Thinh Tran",
        "name": "TQT Starter Kit Test",
        "privacyPolicyUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/privacypolicy.html",
        "tosUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/termsandconditions.html",
        "version": "0.5.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "defaultLang": "vi",
      "fb": Object {
        "id": "",
      },
      "ios": Object {
        "id": "pro.thinhtran.test",
      },
    }
  `);
});
