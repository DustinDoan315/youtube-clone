module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      test: './react-native.config.js',
      compact: false,
    },
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@router': './src/navigator/router',
          '@responsive': './src/utils/responsive',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
