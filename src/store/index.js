import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/store/app';
import account from '@/store/account';
import i18n from '@/store/i18n';
import transactions from '@/store/transactions';
import blocks from '@/store/blocks';

const modules = {
	app,
	account,
	i18n,
	transactions,
	blocks
};

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	state: {},
	mutations: {},
	actions: {},
	modules
});
