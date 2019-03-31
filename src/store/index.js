import Vue from 'vue';
import Vuex from 'vuex';
import account from './account';

const modules = {
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
