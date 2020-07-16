/*  eslint-disable no-console, no-control-regex  */
import fs from 'fs';
import path from 'path';
import {config, updateConfig, appVersion} from './src/core/config';

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
      src: path.resolve(__dirname, `./ios/mobile/Info.plist`),
      replaces: [
        {
          old: /<key>CFBundleName<\/key>[\n,	, ]*<string>.*<\/string>/,
          new: `<key>CFBundleName</key>\n	<string>${config().appInfo.name}</string>`,
        },
        {
          old: /<key>CFBundleDisplayName<\/key>[\n,	, ]*<string>.*<\/string>/,
          new: `<key>CFBundleDisplayName</key>\n	<string>${config().appInfo.name}</string>`,
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
      ],
    },
  ];

  runReplaceTasks(replaceTasks);
};

export const updateVersion = (version: string): void => {
  if (!version) {
    return;
  }

  const nextBuild = +config().appInfo.build + 1;
  updateConfig({
    appInfo: {
      build: nextBuild.toString(),
      version,
    },
  });

  const replaceTasks: ReplaceStringTask[] = [
    {
      src: path.resolve(__dirname, `./android/app/build.gradle`),
      replaces: [
        {
          old: /versionCode [0-9]*/,
          new: `versionCode ${nextBuild}`,
        },
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
          old: /<key>CFBundleVersion<\/key>[\n,	, ]*<string>[\w, ,.,-]*<\/string>/,
          new: `<key>CFBundleVersion</key>\n	<string>${nextBuild}</string>`,
        },
        {
          old: /<key>CFBundleShortVersionString<\/key>[\n,	, ]*<string>[\w, ,.,-]*<\/string>/,
          new: `<key>CFBundleShortVersionString</key>\n	<string>${version}</string>`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./package.json`),
      replaces: [
        {
          old: /"version": "[\w, ,.,-]*"/,
          new: `"version": "${appVersion()}"`,
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
        {
          old: /"build": ".*"/,
          new: `"build": "${nextBuild}"`,
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
          new: `<key>CFBundleVersion</key>\n	<string>${build}</string>`,
        },
      ],
    },
    {
      src: path.resolve(__dirname, `./package.json`),
      replaces: [
        {
          old: /"version": "[\w, ,.,-]*"/,
          new: `"version": "${appVersion()}"`,
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
