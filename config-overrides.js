const path = require('path')
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
function modifyOutputPath(config) {
  // return function (config) {
  //   if (!config.output) {
  //     config.output = {}
  //   }
  //   Object.assign(config.output, output)
  //   return config
  // }
  const paths = require('react-scripts/config/paths')
  paths.appBuild = path.join(path.dirname(paths.appBuild), 'docs')
  return config
}
const stylus = () => config => {
  const stylusLoader = {
    test: /\.styl$/,
    use: [
      {
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'stylus-loader'
      }
    ]
  }
  const oneOf = config.module.rules.find(rule => rule.oneOf).oneOf
  oneOf.unshift(stylusLoader)
  return config
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '~': path.resolve(__dirname, 'public', 'imgs'),
    'utils': path.resolve(__dirname, 'src', 'utils')
  }),
  modifyOutputPath(),
  stylus()
);
