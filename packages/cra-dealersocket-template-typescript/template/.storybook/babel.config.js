module.exports = function() {
  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ];

  const plugins = [
    'babel-plugin-flow-react-proptypes',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
  ];

  return {
    presets,
    plugins,
  };
};
