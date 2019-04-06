export default {
	header: {
		title: 'FooBar',
		navigation: {
			account: 'Account',
			transactions: 'Transactions',
			backup: 'Back Up',
			export: 'Export',
			import: 'Import',
			newAccount: 'New Account'
		}
	},
	views: {
		login: {
			form: {
				buttons: {
					createAccount: 'Create'
				},
				submit: {
					somethingWentWrong: 'Something went wrong, please try again.',
					success: 'NULS account created.'
				},
				fields: {
					name: {
						hint: 'A readable name to assign your account',
						label: 'Name',
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
