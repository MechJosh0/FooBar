module.exports = {
	pages: {
		'popup/popup': {
			entry: 'src/popup/popup.js',
			title: 'Popup'
		},
		'options/options': {
			entry: 'src/options/options.js',
			title: 'Options'
		},
		'standalone/standalone': {
			entry: 'src/standalone/standalone.js',
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
		}
	}
};
