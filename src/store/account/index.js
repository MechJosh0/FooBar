import { Account } from 'nuls-js';

const state = {
	account: null
};

const mutations = {
	SET_ACCOUNT(state, account)
	{
		state.account = account;

		localStorage.setItem('account', JSON.stringify(account));
	},
	CLEAR_ACCOUNT(state)
	{
		state.account = null;

		localStorage.removeItem('account');
	}
};

const actions = {
	createNewAccount({ commit })
	{
		const account = new Account();

		commit('SET_ACCOUNT', account.create());
	},
	logIn({ commit }, account)
	{
		commit('SET_ACCOUNT', account);
	},
	loginLocalStorage({ dispatch })
	{
		if(!localStorage.getItem('account')) return;

		const account = JSON.parse(localStorage.getItem('account'));

		dispatch('logIn', account);
	},
	logOut({ commit })
	{
		commit('CLEAR_ACCOUNT');
	}
};

const getters = {
	getAccount(state)
	{
		return state.account;
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
