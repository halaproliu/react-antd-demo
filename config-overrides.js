const path = require('path')
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
function modifyOutputPath (config) {
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
    'imgs': path.resolve(__dirname, 'public/imgs')
  }),
  modifyOutputPath()
);
