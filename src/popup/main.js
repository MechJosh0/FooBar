import Vue from 'vue';
import App from '@/popup/App';
import store from '@/store';
import router from '@/popup/router';
// import i18n from '../i18n';
import '@/plugins/quasar';

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	// i18n,
	render: (h) => h(App)
});
