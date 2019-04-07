import Vue from 'vue';
import { Account } from 'nuls-js';
import storage from '@/utils/storage';

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
			return 'nameExists';
		}

		const account = new Account();

		commit('CREATE_ACTIVE_ACCOUNT', { name, release, account: account.create(password) });

		return true;
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

		commit('CREATE_ACTIVE_ACCOUNT', { name, release, account: account.getAccount() });

		return {
			success: true,
			account: account.getAccount()
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
