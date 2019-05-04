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
	login({ commit, state }, password)
	{
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
