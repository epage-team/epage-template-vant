const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.js')

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    '$${project_name}': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: '[name].min.js',
    library: '$${project_name_camel}',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'epage-core': {
      root: 'EpageCore',
      commonjs: 'epage-core',
      commonjs2: 'epage-core',
      amd: 'epage-core'
    },
    'epage-vant': {
      root: 'EpageVant',
      commonjs: 'epage-vant',
      commonjs2: 'epage-vant',
      amd: 'epage-vant'
    },
    vant: 'vant',
    vuex: {
      root: 'Vuex',
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex'
    },
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      parallel: true,
      sourceMap: false,
      uglifyOptions: {
        ecma: 8,
        warnings: false
      }
    })]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: path.resolve(__dirname, '../dist')
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 8,
        warnings: false
      },
      // exclude: /\/node_modules/,
      cache: true,
      parallel: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ],
  resolve: {
    // mainFields: ['main:epage', 'main']
  }
})

if (process.env.npm_config_report) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
