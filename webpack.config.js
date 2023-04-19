const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
  entry: './src/index.ts',
  devServer: {
    static: {
      directory: path.join(__dirname, 'static'),
    },
    historyApiFallback: {
      rewrites: {
        from: { from: '*', to: 'index.html' },
      },
    },
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ],
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      entities: path.resolve(__dirname, './src/entities'),
      pages: path.resolve(__dirname, './src/pages'),
      shared: path.resolve(__dirname, './src/shared'),
      processes: path.resolve(__dirname, './src/processes'),
      widgets: path.resolve(__dirname, './src/widgets'),
      handlebars: 'handlebars/dist/handlebars.js',
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: '/',
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {},
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new NodePolyfillPlugin(),
  ],
};

module.exports = (env, argv) => {
  console.log(`Webpack mode ${argv.mode}`);
  config.mode = argv.mode;
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [{ from: 'static', to: 'static' }],
      })
    );
  } else if (argv.mode === 'production') {
    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ];
  }

  return config;
};
