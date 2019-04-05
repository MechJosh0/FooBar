import Vue from 'vue';
import '../plugins/vuetify';
import App from './App';
import store from '../store';
import i18n from '../i18n';
import router from './router';

store.dispatch('app/load');

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	i18n,
	render: (h) => h(App)
});
