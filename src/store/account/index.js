import { Account } from 'nuls-js';
import storage from '@/utils/storage';

const state = {
	accounts: {},
	activeAccount: null
};

const mutations = {
	CREATE_ACTIVE_ACCOUNT(state, { name, account })
	{
		state.accounts[account.address] = { name, ...account };
		state.activeAccount = account.address;

		storage.set('accounts', JSON.stringify(state.accounts));
		storage.set('activeAccount', JSON.stringify(state.activeAccount));
	},
	SET_ACCOUNTS(state, accounts)
	{
		state.accounts = accounts;
	},
	SET_ACTIVE_ACCOUNT(state, account)
	{
		state.activeAccount = account;
	},
	CLEAR_ACTIVE_ACCOUNT(state)
	{
		state.activeAccount = null;

		storage.remove('activeAccount');
	}
};

const actions = {
	createNewAccount({ state, commit }, name)
	{
		if(Object.keys(state.accounts).find((address) => state.accounts[address].name === name))
		{
			return 'nameExists';
		}

		const account = new Account();

		commit('CREATE_ACTIVE_ACCOUNT', { name, account: account.create() });

		return true;
	},
	logIn({ commit }, account)
	{
		commit('SET_ACTIVE_ACCOUNT', account);
	},
	loginFromStorage({ commit, dispatch })
	{
		if(!storage.get('accounts')) return;

		commit('SET_ACCOUNTS', JSON.parse(storage.get('accounts')));

		if(!storage.get('activeAccount'))
		{
			return;
		}

		const account = JSON.parse(storage.get('activeAccount'));

		dispatch('logIn', account);
	},
	logOut({ commit })
	{
		commit('CLEAR_ACTIVE_ACCOUNT');
	},
	async importAccount({ commit }, { name, password, accountData })
	{
		console.log('Import account:', name, password, accountData);

		const account = new Account();

		if(accountData.prikey)
		{
			account.import(accountData.prikey);
		}
		else
		{
			try
			{
				account.import(accountData.encryptedPrivateKey, password);
			}
			catch(e)
			{
				switch(e.message)
				{
					case 'Invalid password or encrypted private key provided.':
						return { success: false, errorCode: 'invalidPassword' };
					default:
						console.log('Unknown error message:', e.message);

						return { success: false, errorCode: 'somethingWentWrong' };
				}
			}
		}

		commit('CREATE_ACTIVE_ACCOUNT', { name, account: account.getAccount() });

		return {
			success: true,
			account: account.getAccount()
		};
	}
};

const getters = {
	getActiveAccount: (state) =>
	{
		return state.accounts[state.activeAccount];
	},
	getAccounts: (state) =>
	{
		return state.accounts;
	},
	getAccountBy: (state) => (key, val) =>
	{
		const address = Object.keys(state.accounts).find((address) => state.accounts[address][key] === val);

		return state.accounts[address];
	}
};

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
