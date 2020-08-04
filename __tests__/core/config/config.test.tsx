import {config, updateConfig} from '@core/config';

it('update configuration correctly', async () => {
  expect(config()).toMatchInlineSnapshot(`
    Object {
      "android": Object {
        "id": "pro.thinhtran.starterkit",
      },
      "appInfo": Object {
        "author": "Thinh Tran",
        "build": "5",
        "copyright": "Copyright © 2020 by Thinh Tran",
        "name": "TQT Starter Kit",
        "privacyPolicyUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/privacypolicy.html",
        "tosUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/termsandconditions.html",
        "version": "0.6.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "defaultCountryCode": "+84",
      "defaultLang": "vi",
      "fb": Object {
        "id": "284064976159443",
      },
      "google": Object {
        "reverseClientId": "com.googleusercontent.apps.460761628098-tbm75hbrsmlgs07saish5bjjo14u3uuf",
        "webClientId": "460761628098-g87fmrh182l040smb00ng28ps0svb5r7.apps.googleusercontent.com",
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
        "build": "5",
        "copyright": "Copyright © 2020 by Thinh Tran",
        "name": "TQT Starter Kit Test",
        "privacyPolicyUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/privacypolicy.html",
        "tosUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/termsandconditions.html",
        "version": "0.6.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "defaultCountryCode": "+84",
      "defaultLang": "vi",
      "fb": Object {
        "id": "284064976159443",
      },
      "google": Object {
        "reverseClientId": "com.googleusercontent.apps.460761628098-tbm75hbrsmlgs07saish5bjjo14u3uuf",
        "webClientId": "460761628098-g87fmrh182l040smb00ng28ps0svb5r7.apps.googleusercontent.com",
      },
      "ios": Object {
        "id": "pro.thinhtran.test",
      },
    }
  `);
});
