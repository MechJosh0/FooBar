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
	dates: {
		duration: {
			yesterday: 'Yesterday',
			today: 'Today',
			hoursAgo: '{hours} hour ago | {hours} hours ago',
			minutesAgo: '{minutes} minute ago | {minutes} minutes ago',
			secondsAgo: '{seconds} second ago | {seconds} seconds ago'
		}
	},
	views: {
		settings: {
			form: {
				serverOptions: {
					label: 'API Network',
					options: {
						nulsWorld: {
							label: 'NULS World',
							url: 'https://nuls.world/'
						}
					}
				},
				releaseOptions: {
					label: 'Release Version',
					options: {
						mainNet: {
							label: 'Main Network (recommended)',
							caption: 'The live main network where real transactions occurr and real money is involved.'
						},
						testNet: {
							label: 'Test Network (developers only)',
							caption: 'The test network to play with fake internet money.'
						}
					}
				}
			}
		},
		index: {
			table: {
				label: 'Accounts',
				columns: {
					address: 'Address',
					name: 'Name',
					balance: 'Balance'
				}
			}
		},
		transactions: {
			table: {
				label: 'Transactions',
				recordsPerPage: 'Records per page',
				columns: {
					inOut: 'In/Out',
					date: 'Date',
					address: 'Address',
					remark: 'Remark',
					type: {
						label: 'Type',
						types: {
							'2-received': 'Funds Received',
							'2-sent': 'Funds Sent',
							5: 'Consensus Staked',
							101: 'Contract Vote',
							'2-verifying': 'Verifying [{num}/15]',
							unknown: 'unknownType[{type}]'
						}
					},
					change: 'Change',
					balance: 'Balance'
				},
				panel: {
					txHash: 'Transaction Hash',
					blockHeight: 'Block Height',
					sent: 'Funds Sent',
					fee: 'Fee',
					remark: 'Remark'
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
		},
		transfer: {
			form: {
				buttons: {
					submit: 'Send'
				},
				submit: {
					somethingWentWrong: 'Something went wrong, please try again.',
					success: 'Your transaction was successful',
					viewTransaction: 'View Transaction'
				},
				fields: {
					autoFee: {
						label: 'Auto Calculate Fee'
					},
					advanced: {
						label: 'Advanced'
					},
					fee: {
						label: 'Fee {amount}'
					},
					password: {
						label: 'Password',
						errors: {
							required: 'A password is required'
						}
					},
					recipients: {
						hint: 'The recipient of the transfer',
						label: 'Recipient Address',
						errors: {
							required: 'Please enter a recipient address',
							length: 'This isn\'t a valid NULS address',
							testNet: 'This isn\'t a valid testNet NULS address',
							mainNet: 'This isn\'t a valid NULS address',
							unknownRelease: 'The release server you\'re on is known'
						}
					},
					remark: {
						label: 'Remark',
						hint: 'Add a public note this transaction'
					},
					amount: {
						label: 'Amount',
						hint: 'The amount of NULS to send',
						errors: {
							required: 'An amount to send is required',
							minimum: 'The lowest amount you can send is 0.01',
							number: 'You must enter a valid number'
						}
					}
				}
			}
		}
	}
};
