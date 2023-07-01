// babel.config.js

module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react', 'razzle'];
  const plugins = ['macros', 'proposal-export-default-from'];

  return {
    presets,
    plugins,
  };
};
