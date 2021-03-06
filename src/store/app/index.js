import { ChainIdType } from 'nuls-js';
import Account from '@/utils/nuls-js/account';
import storage from '@/store/app/storage';
import account from '@/store/app/account';

const modules = {
	storage,
	account
};

const state = {
	release: 'mainNet',
	server: {
		name: 'nulsWorld',
		url: 'https://nuls.world/'
	},
	popup: false
};

const mutations = {
	SET_RELEASE(state, payload)
	{
		state.release = payload;

		Account.switchChain(ChainIdType[Object.keys(ChainIdType).find((key) => key.toLowerCase() === payload.toLowerCase())]);

		localStorage.setItem('release', payload);
	},
	SET_SERVER(state, payload)
	{
		state.server = payload;

		localStorage.setItem('server', JSON.stringify(payload));
	},
	POPUP_TRUE(state)
	{
		state.popup = true;
	}
};

const actions = {
	async load({ dispatch })
	{
		await dispatch('app/account/setAccount', null, { root: true });
		await dispatch('wallets/loginFromStorage', null, { root: true });
		dispatch('setServerFromStorage');
		dispatch('i18n/setLocaleFromStorage', null, { root: true });
		// dispatch('blocks/init', null, { root: true });
	},
	setStorageSolution({ commit }, solution)
	{
		if(!['chromeLocal', 'chromSync'].includes(solution)) return false;

		commit('SET_RELEASE', solution);

		return true;
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
		if(localStorage.getItem('release'))
		{
			dispatch('setRelease', localStorage.getItem('release'));
		}

		if(localStorage.getItem('server'))
		{
			dispatch('setServer', JSON.parse(localStorage.getItem('server')));
		}
	},
	appIsPopup({ commit })
	{
		commit('POPUP_TRUE');
	}
};

const getters = {
	isMainNet: (state) => state.release === 'mainNet',
	getRelease: (state) => state.release,
	getServerData: (state) => state.server,
	isAppPopup: (state) => state.popup
};

export default {
	namespaced: true,
	modules,
	state,
	mutations,
	actions,
	getters
};
