const { override, fixBabelImports, addLessLoader, adjustStyleLoaders } = require('customize-cra')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {}
	}),
	adjustStyleLoaders(({ use: [, css, , resolve, processor] }) => {
		delete css.options.localIdentName

		// css.options.sourceMap = true // css-loader
		// css.options.modules = {
		// 	localIdentName: '[path][name]__[local]--[hash:base64:5]'
		// }

		if (resolve) {
			resolve.options.sourceMap = true // resolve-url-loader
		}
		// pre-processor
		if (processor && processor.loader.includes('sass-loader')) {
			processor.options.sourceMap = true // sass-loader
		}
	})
)
