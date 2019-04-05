module.exports = {
	pages: {
		'popup/popup': {
			entry: 'src/popup/main.js',
			title: 'Popup'
		},
		'options/options': {
			entry: 'src/options/main.js',
			title: 'Options'
		},
		'standalone/standalone': {
			entry: 'src/standalone/main.js',
			filename: 'index.html',
			title: 'chrome-test'
		}
	},
	pluginOptions: {
		browserExtension: {
			registry: undefined,
			components: {
				background: true,
				popup: true,
				options: true,
				contentScripts: true,
				standalone: true
			},
			api: 'chrome',
			componentOptions: {
				background: {
					entry: 'src/background.js'
				},
				contentScripts: {
					entries: {
						'content_scripts/content-script': [
							'src/content_scripts/content-script.js'
						]
					}
				}
			}
		},
		i18n: {
			locale: 'en',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableInSFC: false
		},
		quasar: {
			treeShake: true
		}
	},
	transpileDependencies: [
		/[\\\/]node_modules[\\\/]quasar[\\\/]/
	]
};
