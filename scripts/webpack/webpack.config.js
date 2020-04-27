const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const tsTransformPaths = require('@zerollup/ts-transform-paths');

const { NODE_ENV } = process.env
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'
const devtool = isProduction ? false : 'inline-source-map'
const dist = path.resolve(__dirname, '..', '..', 'dist')
const plugins = [new webpack.NamedModulesPlugin(), new CleanWebpackPlugin({})]
const entry = isProduction ? ['webpack/hot/poll?1000', './server/src/index.ts'] : ['./server/src/index.ts']

console.log(`Building for : ${mode} environment`)
const srcPath = (subdir) => path.join(__dirname, 'src', subdir)

module.exports = merge(
	{},
	{
		entry,
		watch: !isProduction,
		mode,
		devtool,
		target: 'node',
		stats: 'minimal',
		externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
					options: {
						getCustomTransformers: (program) => {
						  const transformer = tsTransformPaths(program);
			   
						  return {
							before: [transformer.before], // for updating paths in generated code
							afterDeclarations: [transformer.afterDeclarations] // for updating paths in declaration files
						  };
						}
					  }
				},
				{
					test: /\.less$/,
					use: [{
						loader: 'style-loader',
					  }, {
						loader: 'css-loader', // translates CSS into CommonJS
					  }, {
						loader: 'less-loader', // compiles Less to CSS
					  }],
				}
			]
		},
		resolve: {
			modules: [path.resolve(__dirname, './src'), 'node_modules'],
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				app: srcPath('app'),
				components: srcPath('components'),
				containers: srcPath('containers'),
				graph: srcPath('graph'),
				utils: srcPath('utils')
			}
		},
		plugins: isProduction
			? [...plugins]
			: [
					...plugins,
					new StartServerPlugin({
						name: 'server.js',
						nodeArgs: ['--inspect']
					}),
					new webpack.HotModuleReplacementPlugin(),
					new webpack.NoEmitOnErrorsPlugin()
			  ],
		node: {
			__dirname: false,
			__filename: false
		},
		output: {
			path: dist,
			filename: 'server.js',
			hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
			hotUpdateMainFilename: '.hot/[hash].hot-update.json'
		}
	}
)
