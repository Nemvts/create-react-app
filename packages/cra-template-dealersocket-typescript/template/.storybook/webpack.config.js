// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const src = path.resolve(__dirname, '../src');
const node_modules = path.resolve(__dirname, '../node_modules');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // storybookBaseConfig.resolve.modules = [src, node_modules];
  storybookBaseConfig.resolve.modules = [node_modules];

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.rules.push(
    {
      test: /\.css$/,
      include: path.resolve(__dirname, '../'),
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.stories\.js?$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: {
            prettierConfig: {
              parser: 'babel',
            },
            uglyCommentsRegex: [/^:/],
          },
        },
      ],
      enforce: 'pre',
    }
  );

  // Return the altered config
  return storybookBaseConfig;
};
