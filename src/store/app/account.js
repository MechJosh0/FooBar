import { Account } from 'nuls-js';

const state = {
	password: null,
	account: null
};

const mutations = {
	SET_ACCOUNT(state, account)
	{
		state.account = account;
	},
	SET_PASSWORD(state, password)
	{
		if(state.password === password) return; // This avois inifite loop with chrome listeners

		state.password = password;
		chrome.runtime.sendMessage({ method: 'set', type: 'applicationPassword', data: password });
	}
};

const actions = {
	logout({ commit })
	{
		commit('SET_PASSWORD', null);
	},
	login({ commit, getters }, password)
	{
		if(getters.isValidPassword(password))
		{
			commit('SET_PASSWORD', password);

			return true;
		}

		return false;
	},
	register({ commit, dispatch }, password)
	{
		const extensionWallet = (new Account()).create(password);

		dispatch('app/storage/set', { key: '_extensionWallet', value: extensionWallet }, { root: true });

		commit('SET_ACCOUNT', extensionWallet);
		commit('SET_PASSWORD', password);
	},
	async setAccount({ commit, rootGetters })
	{
		const extensionWallet = await rootGetters['app/storage/get']('_extensionWallet');

		commit('SET_ACCOUNT', extensionWallet);
	}
};

const getters = {
	accountExists: (state) => !!state.account,
	password: (state) => state.password,
	isLoggedIn: (state) => state.password !== null,
	isValidPassword: (state) => (password) =>
	{
		try
		{
			(new Account()).import(state.account.encryptedPrivateKey, password);

			return true;
		}
		catch(e)
		{
			return false;
		}
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
