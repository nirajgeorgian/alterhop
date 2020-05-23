const {
	override,
	fixBabelImports,
	addLessLoader,
	adjustStyleLoaders,
	disableEsLint,
	addBundleVisualizer
} = require('customize-cra')

module.exports = override(
	// disable eslint in webpack
	disableEsLint(),

	// add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
	process.env.BUNDLE_VISUALIZE === 1 && addBundleVisualizer(),

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

		if (resolve) {
			resolve.options.sourceMap = true
		}

		// pre-processor
		if (processor && processor.loader.includes('less-loader')) {
			processor.options.sourceMap = true
		}
	})
)
