const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development', //개발환경인지 배포환경인지 구분
  devtool: prod ? 'hidden-source-map' : 'eval', // 어떤 툴을 사용할것인지
  entry: './src/index.tsx', //웹펙이 파일을 시작점
  resolve: { //사용할수 있는 파일 확장자
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: { //웹펙 해석
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      },
    ],
  },
  output: { // 결과물 어디에 넣을것이냐?
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  optimization: {
    minimize: false
  },
  plugins: [ //부가적인 기능
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true
  },
};