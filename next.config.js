const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withImages = require('next-images');
const withTM = require('next-transpile-modules');

const ENV_BASE = {};

const ENV_DEV = {};

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: []
      }
    ],
    withTypescript,
    withImages
  ],
  {
    webpack: config => {
      return config;
    },
    env: {
      ...ENV_BASE,
      ...ENV_DEV
    }
  }
);
