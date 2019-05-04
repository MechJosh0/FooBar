import { Account } from 'nuls-js';

const state = {
	password: null
};

const mutations = {
	SET_APP_PASSWORD(state, password)
	{
		if(state.password === password) return; // This avois inifite loop with chrome listeners

		state.password = password;
		chrome.runtime.sendMessage({ method: 'set', type: 'applicationPassword', data: password });
	}
};

const actions = {
	logout({ commit })
	{
		commit('SET_APP_PASSWORD', null);
	},
	async login({ commit, rootGetters }, password)
	{
		try
		{
			const extensionWallet = await rootGetters['app/storage/get']('_extensionWallet');

			(new Account()).import(extensionWallet.encryptedPrivateKey, password);
			commit('SET_APP_PASSWORD', password);

			return true;
		}
		catch(e)
		{
			throw new Error(e.message);
		}
	},
	register({ commit, dispatch }, password)
	{
		dispatch('app/storage/set', { key: '_extensionWallet', value: (new Account()).create(password) }, { root: true });

		commit('SET_APP_PASSWORD', password);
	}
};

const getters = {
	password: (state) => state.password,
	isLoggedIn: (state) => state.password !== null
};

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
