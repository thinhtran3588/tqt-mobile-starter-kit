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
