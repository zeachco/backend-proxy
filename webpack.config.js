var path = require('path');
var BACKEND = process.env.BACKEND || 'http://localhost:8080';
var DIRS = {
	public: 'public',
	// app: './../AppDirect/appdirect-parent/appdirect',
	app: 'app',
	bundleName: 'bundle.js'
};

// Plugins
var WebpackNotifierPlugin = require('webpack-notifier');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
	// var webpackConfig = {
	//   entry: 'index.js',
	//   output: {
	//     path: 'dist',
	//     filename: 'index_bundle.js'
	//   },
	//   plugins: [new HtmlWebpackPlugin()]
	// }
var plugins = [
	new WebpackNotifierPlugin(),
	new LiveReloadPlugin(),
	new HtmlWebpackPlugin()
];

var proxy = {
	target: BACKEND,
	secure: BACKEND.indexOf('https') > -1,
};

// Server
var devServer = {
	contentBase: DIRS.public,
	port: 3000,
	host: '0.0.0.0',
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true
	},
	proxy: {
		'/*': proxy
	}
};
console.log(':: PROXY ::');
console.log(proxy.target, ' (SSL = ' + proxy.secure + ')\n');

// Loaders
var loaders = [{
	test: /\.css$/,
	loader: 'style!css'
}, {
	test: /\.js$/,
	exclude: /node_modules/,
	loader: 'babel-loader'
}, {
	test: /\.png$/,
	loader: 'url?name=img/[name].[ext]&mimetype=image/png'
}, {
	test: /\.gif$/,
	loader: 'url?name=img/[name].[ext]&mimetype=image/gif'
}];

module.exports = {
	resolve: {
		root: path.resolve('./app'),
		extensions: ['', '.webpack.js', '.web.js', '.js']
	},
	// devtool: "source-map",
	context: __dirname + "/app",
	entry: path.resolve(__dirname, DIRS.app),
	devServer: devServer,
	output: {
		path: path.resolve(__dirname, devServer.contentBase),
		filename: DIRS.bundleName
	},
	module: {
		loaders: loaders,
		preLoaders: [{
			test: /\.js$/, // include .js files
			exclude: /node_modules/, // exclude any and all files in the node_modules folder
			loader: "jshint-loader"
		}]
	},
	plugins: plugins
};
