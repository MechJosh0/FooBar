import Vue from 'vue';
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
		delete account.prikey;

		state.accounts[release][account.address] = { name, ...account };
		state.activeAccount[release] = account.address;

		localStorage.setItem('activeAccount', JSON.stringify(state.activeAccount));
	},
	SET_ACCOUNTS(state, accounts)
	{
		state.accounts = accounts;
	},
	SET_ACTIVE_ACCOUNT(state, account)
	{
		state.activeAccount = account;
		localStorage.setItem('activeAccount', JSON.stringify(state.activeAccount));
	},
	CLEAR_ACTIVE_ACCOUNT(state, release)
	{
		Vue.delete(state.accounts[release], state.activeAccount[release]);
		state.activeAccount[release] = null;

		localStorage.setItem('activeAccount', JSON.stringify(state.activeAccount));
	},
	REMOVE_ACCOUNT(state, { address, release })
	{
		Vue.delete(state.accounts[release], address);
	}
};

const actions = {
	createNewAccount({ state, dispatch, commit, rootGetters }, name)
	{
		const release = rootGetters['app/getRelease'];
		const password = rootGetters['app/account/password'];

		if(Object.keys(state.accounts[release]).find((address) => state.accounts[release][address].name === name))
		{
			return {
				success: false,
				error: 'nameExists'
			};
		}

		commit('CREATE_ACTIVE_ACCOUNT', { name, release, account: Account.create(password) });
		dispatch('updateStorage');

		return {
			success: true
		};
	},
	async loginFromStorage({ commit, rootGetters })
	{
		const accounts = await rootGetters['app/storage/get']('accounts');

		if(!accounts)
		{
			return;
		}

		commit('SET_ACCOUNTS', accounts);

		if(!localStorage.getItem('activeAccount'))
		{
			return;
		}

		const activeAcount = JSON.parse(localStorage.getItem('activeAccount'));

		commit('SET_ACTIVE_ACCOUNT', activeAcount);
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
	async importAccount({ commit, dispatch, rootGetters }, { name, walletPassword, accountData })
	{
		const release = rootGetters['app/getRelease'];
		const password = rootGetters['app/account/password'];

		if(accountData.prikey)
		{
			Account.import(accountData.prikey);
		}
		else
		{
			try
			{
				Account.import(accountData.encryptedPrivateKey, walletPassword);
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

		// Recreate the imported account with our app password
		Account.import(Account.getAccount().prikey, password);

		commit('CREATE_ACTIVE_ACCOUNT', { name, release, account: Account.getAccount() });
		dispatch('updateStorage');

		return {
			success: true,
			account: Account.getAccount()
		};
	},
	deleteActive({ commit, dispatch, rootGetters }, address)
	{
		const release = rootGetters['app/getRelease'];

		commit('REMOVE_ACCOUNT', { address, release });
		dispatch('updateStorage');
	},
	updateStorage({ dispatch })
	{
		dispatch('app/storage/set', { key: 'accounts', value: state.accounts }, { root: true });
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
	},
	decryptedActiveAccountPrivateKey: (state, getters, rootState, rootGetters) =>
	{
		const account = Account.import(getters.getActiveAccount.encryptedPrivateKey, rootGetters['app/account/password']);

		return account.prikey;
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
