require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['imask', 'react-imask', 'client-zip']);

const nextConfig = {
  webpack5: false,
  poweredByHeader: false,
  webpack: (config, options) => {
    const { isServer } = options;

    if (!isServer) {
      // // eslint-disable-next-line no-param-reassign
      // config.resolve.fallback.net = false;
      // // eslint-disable-next-line no-param-reassign
      // config.resolve.fallback.tls = false;

      // eslint-disable-next-line no-param-reassign
      config.node = {
        net: 'empty',
        tls: 'empty',
      };
    }

    // eslint-disable-next-line no-param-reassign
    config.plugins = config.plugins || [];

    config.plugins.push(
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    );

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'babel-loader',
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true,
            svgo: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });

    // TODO: remove when using only typescript
    // allow using all file extensions while we transition into full typescript
    // eslint-disable-next-line no-param-reassign
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];

    return config;
  },
};

module.exports = withPlugins([withTM], nextConfig);
