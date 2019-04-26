import Vue from 'vue';
import storage from '@/utils/storage';
import Account from '@/utils/nuls-js/account';

const state = {
	accounts: {
		mainNet: {},
		testNet: {}
	},
	activeAccount: {
		mainNet: null,
		testNet: null
	}
};

const mutations = {
	CREATE_ACTIVE_ACCOUNT(state, { name, release, account })
	{
		state.accounts[release][account.address] = { name, ...account };
		state.activeAccount[release] = account.address;

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
	CLEAR_ACTIVE_ACCOUNT(state, release)
	{
		Vue.delete(state.accounts[release], state.activeAccount[release]);
		state.activeAccount[release] = null;

		storage.set('activeAccount', JSON.stringify(state.activeAccount));
	}
};

const actions = {
	createNewAccount({ state, commit, rootGetters }, { name, password })
	{
		const release = rootGetters['app/getRelease'];

		if(Object.keys(state.accounts[release]).find((address) => state.accounts[release][address].name === name))
		{
			return {
				success: false,
				error: 'nameExists'
			};
		}

		// FIXME Do not store the privateKey
		commit('CREATE_ACTIVE_ACCOUNT', { name, release, account: Account.create(password) });

		return {
			success: true
		};
	},
	loginFromStorage({ commit })
	{
		if(!storage.get('accounts')) return;

		commit('SET_ACCOUNTS', JSON.parse(storage.get('accounts')));

		if(!storage.get('activeAccount'))
		{
			return;
		}

		const account = JSON.parse(storage.get('activeAccount'));

		commit('SET_ACTIVE_ACCOUNT', account);
	},
	logIn({ commit, state, rootGetters }, account)
	{
		const release = rootGetters['app/getRelease'];

		commit('SET_ACTIVE_ACCOUNT', {
			...state.activeAccount,
			[release]: account
		});
	},
	logOut({ commit, rootGetters })
	{
		const release = rootGetters['app/getRelease'];

		commit('CLEAR_ACTIVE_ACCOUNT', release);
	},
	async importAccount({ commit, rootGetters }, { name, password, accountData })
	{
		const release = rootGetters['app/getRelease'];

		if(accountData.prikey)
		{
			Account.import(accountData.prikey);
		}
		else
		{
			try
			{
				Account.import(accountData.encryptedPrivateKey, password);
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

		// FIXME Do not store the privateKey
		commit('CREATE_ACTIVE_ACCOUNT', { name, release, account: Account.getAccount() });

		return {
			success: true,
			account: Account.getAccount()
		};
	}
};

const getters = {
	getActiveAccount: (state, getters, rootState, rootGetters) =>
	{
		const release = rootGetters['app/getRelease'];

		return state.accounts[release][state.activeAccount[release]];
	},
	getAccounts: (state, getters, rootState, rootGetters) =>
	{
		const release = rootGetters['app/getRelease'];

		return state.accounts[release];
	},
	getAccountBy: (state, getters, rootState, rootGetters) => (key, val) =>
	{
		const release = rootGetters['app/getRelease'];
		const address = Object.keys(state.accounts[release]).find((address) => state.accounts[release][address][key] === val);

		return state.accounts[release][address];
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
