import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import account from './account';
import i18n from './i18n';

const modules = {
	app,
	account,
	i18n
};

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {},
	mutations: {},
	actions: {},
	modules
});
