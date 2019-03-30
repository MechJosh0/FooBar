import Vue from 'vue';
import '../plugins/vuetify';
import i18n from '../i18n';
import App from './App';

/* eslint-disable no-new */
new Vue({
	el: '#app',
	i18n,
	render: (h) => h(App)
});
