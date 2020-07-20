import {config, updateConfig} from '@app/core/config';

it('update configuration correctly', async () => {
  expect(config()).toMatchInlineSnapshot(`
    Object {
      "android": Object {
        "id": "pro.thinhtran.starterkit",
      },
      "appInfo": Object {
        "build": "3",
        "name": "TQT Starter Kit",
        "version": "0.4.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "defaultLang": "vi",
      "fb": Object {
        "id": "",
      },
      "ios": Object {
        "id": "pro.thinhtran.starterkit",
      },
      "languages": Array [
        Object {
          "id": "en",
          "name": "English",
        },
        Object {
          "id": "vi",
          "name": "Tiếng Việt",
        },
      ],
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
        "build": "3",
        "name": "TQT Starter Kit Test",
        "version": "0.4.0",
      },
      "dateFormat": "DD/MM/YYYY",
      "defaultLang": "vi",
      "fb": Object {
        "id": "",
      },
      "ios": Object {
        "id": "pro.thinhtran.test",
      },
      "languages": Array [
        Object {
          "id": "en",
          "name": "English",
        },
        Object {
          "id": "vi",
          "name": "Tiếng Việt",
        },
      ],
    }
  `);
});
