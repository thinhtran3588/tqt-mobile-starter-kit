/* eslint-disable max-len */
/* eslint-disable no-console, no-control-regex */
import fs from 'fs';
import path from 'path';
import {config, updateConfig} from './src/core/config';

interface CopyFileTask {
  src: string;
  des: string;
}

interface ReplaceStringTask {
  src: string;
  replaces: {
    old: RegExp | string;
    new: string;
  }[];
}

const runReplaceTasks = (replaceTasks: ReplaceStringTask[]): void => {
  replaceTasks.forEach((replaceTask) => {
    if (!fs.existsSync(replaceTask.src)) {
      return;
    }
    const oldContent = fs.readFileSync(replaceTask.src, {
      encoding: 'utf8',
    });

    let newContent = oldContent;
    replaceTask.replaces.forEach((replace) => {
      newContent = newContent.replace(replace.old, replace.new);
    });

    fs.writeFileSync(replaceTask.src, newContent);
    console.log(`updated ${replaceTask.src}`);
  });
};

export const setEnv = async (environment: string = 'production'): Promise<void> => {
  const envFolder = `environments/${environment}`;
  const copyTasks: CopyFileTask[] = [
    {
      src: path.resolve(__dirname, `${envFolder}/android/app/mobile.keystore`),
      des: path.resolve(__dirname, `android/app/mobile.keystore`),
    },
    {
      src: path.resolve(__dirname, `${envFolder}/android/keystore.properties`),
      des: path.resolve(__dirname, `android/keystore.properties`),
    },
    {
      src: path.resolve(__dirname, `${envFolder}/android/app/google-services.json`),
      des: path.resolve(__dirname, `android/app/google-services.json`),
    },
    {
      src: path.resolve(__dirname, `${envFolder}/ios/GoogleService-Info.plist`),
      des: path.resolve(__dirname, `ios/GoogleService-Info.plist`),
    },
    {
      src: path.resolve(__dirname, `${envFolder}/config.override.json`),
      des: path.resolve(__dirname, `src/core/config/config.override.json`),
    },
  ];
  copyTasks.forEach((copyTask) => {
    if (!fs.existsSync(copyTask.src)) {
      return;
    }
    fs.copyFileSync(copyTask.src, copyTask.des);
    console.log(`copied ${copyTask.src} \n to ${copyTask.des}`);
  });

  const envOverrideConfig = await import(`./environments/${environment}/config.override.json`);
  updateConfig(envOverrideConfig);
  const replaceTasks: ReplaceStringTask[] = [
    {
      src: path.resolve(__dirname, `./android/app/build.gradle`),
      replaces: [
        {
          old: /applicationId "[\w,.]*"/,
          new: `applicationId "${config().android.id}"`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./android/app/src/main/res/values/strings.xml`),
      replaces: [
        {
          old: /<string name="app_name">.*<\/string>/,
          new: `<string name="app_name">${config().appInfo.name}</string>`,
        },
        {
          old: /<string name="facebook_app_id">.*<\/string>/,
          new: `<string name="facebook_app_id">${config().fb.id}</string>`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./android/fastlane/Appfile`),
      replaces: [
        {
          old: /package_name\("[\w, ,.,-]*"\)/,
          new: `package_name("${config().android.id}")`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./ios/fastlane/Appfile`),
      replaces: [
        {
          old: /app_identifier\("[\w, ,.,-]*"\)/,
          new: `app_identifier("${config().android.id}")`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./ios/fastlane/Fastfile`),
      replaces: [
        {
          old: /apple_id: "[\w, ,.,-]*"/,
          new: `apple_id: "${config().android.id}"`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./ios/mobile/Info.plist`),
      replaces: [
        {
          old: /<key>CFBundleName<\/key>[\n,	, ]*<string>.*<\/string>/,
          new: `<key>CFBundleName</key>\n		<string>${config().appInfo.name}</string>`,
        },
        {
          old: /<key>CFBundleDisplayName<\/key>[\n,	, ]*<string>.*<\/string>/,
          new: `<key>CFBundleDisplayName</key>\n		<string>${config().appInfo.name}</string>`,
        },
        {
          old: /<string>fb_url<\/string>[\n,	, ]*<key>CFBundleURLSchemes<\/key>[\n,	, ]*<array>[\n,	, ]*<string>\w+<\/string>[\n,	, ]*<\/array>/,
          new: `<string>fb_url</string>\n				<key>CFBundleURLSchemes</key>\n				<array>\n					<string>fb${
            config().fb.id
          }</string>\n				</array>`,
        },
        {
          old: /<key>FacebookAppID<\/key>[\n,	, ]*<string>[\w, ,.,-]*<\/string>/,
          new: `<key>FacebookAppID</key>\n		<string>${config().fb.id}</string>`,
        },
        {
          old: /<key>FacebookDisplayName<\/key>[\n,	, ]*<string>[\w, ,.,-,.]*<\/string>/,
          new: `<key>FacebookDisplayName</key>\n		<string>${config().appInfo.name}</string>`,
        },
        {
          old: /<string>google_url<\/string>[\n,	, ]*<key>CFBundleURLSchemes<\/key>[\n,	, ]*<array>[\n,	, ]*<string>[\w,.,-]*<\/string>[\n,	, ]*<\/array>/,
          new: `<string>google_url</string>\n				<key>CFBundleURLSchemes</key>\n				<array>\n					<string>${
            config().google.reverseClientId
          }</string>\n				</array>`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./ios/mobile.xcodeproj/project.pbxproj`),
      replaces: [
        {
          old: /PRODUCT_BUNDLE_IDENTIFIER = .*;/g,
          new: `PRODUCT_BUNDLE_IDENTIFIER = ${config().ios.id};`,
        },
        {
          old: /PROVISIONING_PROFILE_SPECIFIER = "match AppStore [\w, ,.,-]*";/g,
          new: `PROVISIONING_PROFILE_SPECIFIER = "match AppStore ${config().ios.id}";`,
        },
      ],
    },
  ];

  runReplaceTasks(replaceTasks);
};

export const updateVersion = (version: string): void => {
  if (!version) {
    return;
  }

  updateConfig({
    appInfo: {
      version,
    },
  });

  const replaceTasks: ReplaceStringTask[] = [
    {
      src: path.resolve(__dirname, `./android/app/build.gradle`),
      replaces: [
        {
          old: /versionName "[0-9,.]*"/,
          new: `versionName "${version}"`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./ios/mobile/Info.plist`),
      replaces: [
        {
          old: /<key>CFBundleShortVersionString<\/key>[\n,	, ]*<string>[\w, ,.,-]*<\/string>/,
          new: `<key>CFBundleShortVersionString</key>\n		<string>${version}</string>`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./package.json`),
      replaces: [
        {
          old: /"version": "[\w, ,.,-]*"/,
          new: `"version": "${config().appInfo.version}"`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./src/core/config/config.json`),
      replaces: [
        {
          old: /"version": ".*"/,
          new: `"version": "${version}"`,
        },
      ],
    },
  ];

  runReplaceTasks(replaceTasks);
};

export const updateBuild = (build: string = process.env.APP_BUILD_NO || ''): void => {
  if (!build) {
    return;
  }
  updateConfig({
    appInfo: {
      build,
    },
  });

  const replaceTasks: ReplaceStringTask[] = [
    {
      src: path.resolve(__dirname, `./android/app/build.gradle`),
      replaces: [
        {
          old: /versionCode [0-9]*/,
          new: `versionCode ${build}`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./ios/mobile/Info.plist`),
      replaces: [
        {
          old: /<key>CFBundleVersion<\/key>[\n,	, ]*<string>[\w, ,.,-]*<\/string>/,
          new: `<key>CFBundleVersion</key>\n		<string>${build}</string>`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./package.json`),
      replaces: [
        {
          old: /"version": "[\w, ,.,-]*"/,
          new: `"version": "${config().appInfo.version}"`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./src/core/config/config.json`),
      replaces: [
        {
          old: /"build": ".*"/,
          new: `"build": "${build}"`,
        },
      ],
    },
  ];

  runReplaceTasks(replaceTasks);
};

const run = (): void => {
  const command = process.argv[2];
  if (command === 'update-ver') {
    updateVersion(process.argv[3]);
  } else if (command === 'update-build') {
    updateBuild(process.argv[3]);
  } else if (command === 'env') {
    setEnv(process.argv[3]);
  }
};

run();
