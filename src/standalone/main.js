import Vue from 'vue';
import App from '@/standalone/App';
import store from '@/store';
import router from '@/standalone/router';
import i18n from '@/plugins/i18n';
import '@/plugins/quasar';

store.dispatch('app/load');

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	i18n,
	render: (h) => h(App)
});
