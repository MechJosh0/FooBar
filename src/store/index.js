import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import account from './account';

const modules = {
	app,
	account
};

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {},
	mutations: {},
	actions: {},
	modules
});
