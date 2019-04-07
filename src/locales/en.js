export default {
	header: {
		title: 'FooBar',
		navigation: {
			home: 'Home',
			account: 'Account',
			transactions: 'Transactions',
			transfer: 'Transfer',
			backup: 'Back Up',
			export: 'Export',
			import: 'Import',
			newAccount: 'New Account',
			settings: 'Settings'
		}
	},
	views: {
		index: {
			table: {
				label: 'Accounts',
				columns: {
					address: 'Address'
				}
			}
		},
		import: {
			form: {
				fields: {
					file: {
						label: 'Import Account',
						errors: {
							required: 'You must provide a keystore to import',
							fileType: 'The file type must be a .keystore or .txt',
							fileSize: 'The file size must be smaller than 1kb',
							invalidWalletData: 'Your wallet data is invalid and doesn\'t contain the expected/required format'
						}
					},
					password: {
						label: 'Password',
						errors: {
							required: 'A password is required',
							incorrect: 'Incorrect password'
						}
					},
					name: {
						label: 'Account Name',
						errors: {
							required: 'Please enter a readable name for your account',
							exists: 'You already have an account under this name'
						}
					}
				},
				buttons: {
					create: 'Create',
					import: 'Import'
				},
				submit: {
					somethingWentWrong: 'Something went wrong, please try again.',
					invalidPassword: 'Invalid password for the provided encrypted private key.',
					success: 'NULS account imported.'
				}
			}
		},
		create: {
			form: {
				buttons: {
					submit: 'Create',
					import: 'Import',
					help: 'Help'
				},
				submit: {
					somethingWentWrong: 'Something went wrong, please try again.',
					success: 'NULS account created.'
				},
				fields: {
					password: {
						label: 'Password',
						errors: {
							required: 'A password is required'
						}
					},
					name: {
						hint: 'A readable name to assign your account',
						label: 'Account Name',
						errors: {
							required: 'Please enter a readable name for your account',
							exists: 'You already have an account under this name'
						}
					}
				}
			}
		}
	}
};
