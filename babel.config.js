// babel.config.js

module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react', 'razzle'];
  const plugins = [
    'macros',
    [
      '@babel/plugin-transform-spread',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from',
  ];

  return {
    presets,
    plugins,
  };
};
