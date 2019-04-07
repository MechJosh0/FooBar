const state = { };

const mutations = { };

const actions = {
	load({ dispatch }, account)
	{
		dispatch('i18n/setLocaleFromStorage', null, { root: true });
		dispatch('account/loginFromStorage', null, { root: true });
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
