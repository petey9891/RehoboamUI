const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/rehoboam/'
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		hot: true,
		port: 8090,
		publicPath: 'http://localhost:8080',
		proxy: {
			'/api': {
				target: 'http://localhost:8090',
				secure: false
			}
		}
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
			{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'src/index.html' }]
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
