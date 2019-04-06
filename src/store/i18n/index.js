import { setI18nLanguage } from '@/plugins/i18n';

const state = {
	locale: null
};

const mutations = {
	SET_LOCALE(state, locale)
	{
		state.locale = locale;

		setI18nLanguage(locale);

		localStorage.setItem('locale', locale);
	}
};

const actions = {
	setLocale({ commit }, locale)
	{
		commit('SET_LOCALE', locale);
	},
	setLocaleFromMemory({ dispatch })
	{
		let locale = process.env.VUE_APP_I18N_LOCALE;

		if(localStorage.getItem('locale') !== 'en')
		{
			locale = localStorage.getItem('locale');
		}
		else if(chrome.i18n.getUILanguage() !== 'en')
		{
			locale = chrome.i18n.getUILanguage();
		}

		dispatch('setLocale', locale);
	}
};

const getters = {
	getLocale: (state) =>
	{
		return state.locale;
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
