import { setI18nLanguage } from '@/plugins/i18n';
import storage from '@/utils/storage';

const state = {
	locale: null
};

const mutations = {
	SET_LOCALE(state, locale)
	{
		state.locale = locale;

		setI18nLanguage(locale);

		storage.set('locale', locale);
	}
};

const actions = {
	setLocale({ commit }, locale)
	{
		commit('SET_LOCALE', locale);
	},
	setLocaleFromStorage({ dispatch })
	{
		let locale = process.env.VUE_APP_I18N_LOCALE;

		if(storage.get('locale') !== 'en')
		{
			locale = storage.get('locale');
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
