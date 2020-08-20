module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@test-utils': './__tests__/utils',
          '@app': './src',
          '@auth': './src/modules/auth',
          '@settings': './src/modules/settings',
          '@samples': './src/modules/samples',
        },
      },
    ],
  ],
};
