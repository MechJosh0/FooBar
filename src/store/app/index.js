import storage from '@/utils/storage';

const state = {
	mainNet: true,
	server: {
		name: 'nulsWorld',
		url: 'https://nuls.world/'
	}
};

const mutations = {
	SET_MAIN_NET(state, payload)
	{
		state.mainNet = payload;

		storage.set('mainNet', payload);
	},
	SET_SERVER(state, payload)
	{
		state.server = payload;

		storage.set('server', JSON.stringify(payload));
	}
};

const actions = {
	load({ dispatch }, account)
	{
		dispatch('setServerFromStorage');
		dispatch('i18n/setLocaleFromStorage', null, { root: true });
		dispatch('account/loginFromStorage', null, { root: true });
	},
	setMainNet({ commit }, payload)
	{
		commit('SET_MAIN_NET', payload);
	},
	setServer({ commit }, payload)
	{
		commit('SET_SERVER', payload);
	},
	setServerFromStorage({ dispatch })
	{
		dispatch('setMainNet', storage.get('mainNet'));
		dispatch('setServer', JSON.parse(storage.get('server')));
	}
};

const getters = {
	isMainNet: (state) =>
	{
		return state.mainNet === true;
	},
	getServerData: (state) =>
	{
		return state.server;
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
