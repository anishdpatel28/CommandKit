const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.web.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.web.json'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "crypto": false,
      "stream": false,
      "util": false,
      "buffer": false,
      "events": false,
      "assert": false,
      "constants": false,
      "domain": false,
      "punycode": false,
      "querystring": false,
      "string_decoder": false,
      "sys": false,
      "timers": false,
      "tty": false,
      "url": false,
      "vm": false,
      "zlib": false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 3001,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
  ignoreWarnings: [/Failed to parse source map/],
  externals: {
    'react-native': 'ReactNative',
  },
};
