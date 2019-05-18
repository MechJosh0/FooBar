import Vue from 'vue';
import Account from '@/utils/nuls-js/account';

const state = {
	wallets: {
		mainNet: {},
		testNet: {}
	},
	activeWallet: {
		mainNet: null,
		testNet: null
	}
};

const mutations = {
	CREATE_ACTIVE_WALLET(state, { name, release, wallet })
	{
		delete wallet.prikey;

		state.wallets[release][wallet.address] = { name, ...wallet };
		state.activeWallet[release] = wallet.address;

		localStorage.setItem('activeWallet', JSON.stringify(state.activeWallet));
	},
	SET_WALLETS(state, wallets)
	{
		state.wallets = wallets;
	},
	SET_ACTIVE_WALLET(state, wallet)
	{
		state.activeWallet = wallet;
		localStorage.setItem('activeWallet', JSON.stringify(state.activeWallet));
	},
	CLEAR_ACTIVE_WALLET(state, release)
	{
		Vue.delete(state.wallets[release], state.activeWallet[release]);
		state.activeWallet[release] = null;

		localStorage.setItem('activeWallet', JSON.stringify(state.activeWallet));
	},
	REMOVE_WALLET(state, { address, release })
	{
		Vue.delete(state.wallets[release], address);
	}
};

const actions = {
	createNewWallet({ state, dispatch, commit, rootGetters }, name)
	{
		const release = rootGetters['app/getRelease'];
		const password = rootGetters['app/account/password'];

		if(Object.keys(state.wallets[release]).find((address) => state.wallets[release][address].name === name))
		{
			return {
				success: false,
				error: 'nameExists'
			};
		}

		commit('CREATE_ACTIVE_WALLET', { name, release, wallet: Account.create(password) });
		dispatch('updateStorage');

		return {
			success: true
		};
	},
	async loginFromStorage({ commit, rootGetters })
	{
		const wallets = await rootGetters['app/storage/get']('wallets');

		if(!wallets)
		{
			return;
		}

		commit('SET_WALLETS', wallets);

		if(!localStorage.getItem('activeWallet'))
		{
			return;
		}

		const activeAcount = JSON.parse(localStorage.getItem('activeWallet'));

		commit('SET_ACTIVE_WALLET', activeAcount);
	},
	logIn({ commit, state, rootGetters }, wallet)
	{
		const release = rootGetters['app/getRelease'];

		commit('SET_ACTIVE_WALLET', {
			...state.activewallet,
			[release]: wallet
		});
	},
	logOut({ commit, rootGetters })
	{
		const release = rootGetters['app/getRelease'];

		commit('CLEAR_ACTIVE_WALLET', release);
	},
	async importWallet({ commit, dispatch, rootGetters }, { name, walletPassword, wallet })
	{
		const release = rootGetters['app/getRelease'];
		const password = rootGetters['app/account/password'];

		if(wallet.prikey)
		{
			Account.import(wallet.prikey);
		}
		else
		{
			try
			{
				Account.import(wallet.encryptedPrivateKey, walletPassword);
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

		// Recreate the imported wallet with our app password
		Account.import(Account.getAccount().prikey, password);

		commit('CREATE_ACTIVE_WALLET', { name, release, wallet: Account.getAccount() });
		dispatch('updateStorage');

		return {
			success: true,
			wallet: Account.getAccount()
		};
	},
	deleteWallet({ commit, dispatch, rootGetters }, address)
	{
		const release = rootGetters['app/getRelease'];

		commit('REMOVE_WALLET', { address, release });
		dispatch('updateStorage');
	},
	updateStorage({ dispatch })
	{
		dispatch('app/storage/set', { key: 'wallets', value: state.wallets }, { root: true });
	}
};

const getters = {
	getActiveWallet: (state, getters, rootState, rootGetters) =>
	{
		const release = rootGetters['app/getRelease'];

		return state.wallets[release][state.activeWallet[release]];
	},
	getWallets: (state, getters, rootState, rootGetters) =>
	{
		const release = rootGetters['app/getRelease'];

		return state.wallets[release];
	},
	getWalletBy: (state, getters, rootState, rootGetters) => (key, val) =>
	{
		const release = rootGetters['app/getRelease'];
		const address = Object.keys(state.wallets[release]).find((address) => state.wallets[release][address][key] === val);

		return state.wallets[release][address];
	},
	decryptedActiveWalletPrivateKey: (state, getters, rootState, rootGetters) =>
	{
		const wallet = Account.import(getters.getActiveWallet.encryptedPrivateKey, rootGetters['app/account/password']);

		return wallet.prikey;
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
