module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@app': './src',
          '@core': './src/core',
          '@assets': './src/assets',
          '@settings': './src/modules/settings',
        },
      },
    ],
  ],
};
