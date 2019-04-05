const state = { };

const mutations = { };

const actions = {
	load({ dispatch }, account)
	{
		dispatch('account/loginLocalStorage', null, { root: true });
	}
};

const getters = { };

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
