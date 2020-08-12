import {config, updateConfig} from '@core/config';

it('update configuration correctly', async () => {
  expect(config()).toMatchInlineSnapshot(`
    Object {
      "android": Object {
        "codepush": Object {
          "productionKey": "8vdSCmDvLeSpO6Er2UG6xbv0om3XgXx8Ve95t",
          "stagingKey": "s3bYcJA6YvaJrDQwuWhbVFi5EV5NXHYwao3Os",
        },
        "id": "pro.thinhtran.starterkit",
      },
      "appInfo": Object {
        "author": "Thinh Tran",
        "build": "1",
        "copyright": "Copyright © 2020 by Thinh Tran",
        "name": "TQT Starter Kit",
        "privacyPolicyUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/privacypolicy.html",
        "tosUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/termsandconditions.html",
        "version": "0.9.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "datetimeFormat": "DD/MM/YYYY HH:mm",
      "defaultCountryCode": "VN",
      "defaultLang": "vi",
      "fb": Object {
        "id": "284064976159443",
      },
      "google": Object {
        "reverseClientId": "com.googleusercontent.apps.460761628098-tbm75hbrsmlgs07saish5bjjo14u3uuf",
        "webClientId": "460761628098-g87fmrh182l040smb00ng28ps0svb5r7.apps.googleusercontent.com",
      },
      "ios": Object {
        "codepush": Object {
          "productionKey": "7J9BCHEdnWDkV6k90ch3sr7vZGjpzcpKOVn5F",
          "stagingKey": "1YgrCzumnKpHTA5a17B_LGHhhA5bGNqEXQfcE",
        },
        "id": "pro.thinhtran.starterkit",
      },
      "sentry": Object {
        "dns": "https://fb6b09b4e69340159611ffd2563898c6@o430974.ingest.sentry.io/5380662",
      },
      "timeFormat": "HH:mm",
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
        "codepush": Object {
          "productionKey": "8vdSCmDvLeSpO6Er2UG6xbv0om3XgXx8Ve95t",
          "stagingKey": "s3bYcJA6YvaJrDQwuWhbVFi5EV5NXHYwao3Os",
        },
        "id": "pro.thinhtran.test",
      },
      "appInfo": Object {
        "author": "Thinh Tran",
        "build": "1",
        "copyright": "Copyright © 2020 by Thinh Tran",
        "name": "TQT Starter Kit Test",
        "privacyPolicyUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/privacypolicy.html",
        "tosUrl": "https://thinhtran.pro/tqt-mobile-starter-kit/termsandconditions.html",
        "version": "0.9.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "datetimeFormat": "DD/MM/YYYY HH:mm",
      "defaultCountryCode": "VN",
      "defaultLang": "vi",
      "fb": Object {
        "id": "284064976159443",
      },
      "google": Object {
        "reverseClientId": "com.googleusercontent.apps.460761628098-tbm75hbrsmlgs07saish5bjjo14u3uuf",
        "webClientId": "460761628098-g87fmrh182l040smb00ng28ps0svb5r7.apps.googleusercontent.com",
      },
      "ios": Object {
        "codepush": Object {
          "productionKey": "7J9BCHEdnWDkV6k90ch3sr7vZGjpzcpKOVn5F",
          "stagingKey": "1YgrCzumnKpHTA5a17B_LGHhhA5bGNqEXQfcE",
        },
        "id": "pro.thinhtran.test",
      },
      "sentry": Object {
        "dns": "https://fb6b09b4e69340159611ffd2563898c6@o430974.ingest.sentry.io/5380662",
      },
      "timeFormat": "HH:mm",
    }
  `);
});
