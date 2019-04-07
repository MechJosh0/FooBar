import storage from '@/utils/storage';
import { Account } from '@/utils/nuls-js';

const state = {
	release: 'mainNet',
	server: {
		name: 'nulsWorld',
		url: 'https://nuls.world/'
	}
};

const mutations = {
	SET_RELEASE(state, payload)
	{
		state.release = payload;

		Account.switchChain(payload === 'testNet' ? 261 : 8964);

		storage.set('release', payload);
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
	setRelease({ commit }, payload)
	{
		commit('SET_RELEASE', payload);
	},
	setServer({ commit }, payload)
	{
		commit('SET_SERVER', payload);
	},
	setServerFromStorage({ dispatch })
	{
		if(storage.get('release'))
		{
			dispatch('setRelease', storage.get('release'));
		}

		if(storage.get('server'))
		{
			dispatch('setServer', JSON.parse(storage.get('server')));
		}
	}
};

const getters = {
	isMainNet: (state) =>
	{
		return state.release === true;
	},
	getRelease: (state) =>
	{
		return state.release;
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
