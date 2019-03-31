
import { Account } from 'nuls-js';

const state = {
	account: null
};

const mutations = {
	SET_ACCOUNT(state, account)
	{
		state.account = account;
	},
	CLEAR_ACCOUNT(state)
	{
		state.account = null;
	}
};

const actions = {
	createNewAccount({ commit })
	{
		const account = new Account();

		commit('SET_ACCOUNT', account.create());
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
