import Vue from 'vue';
import PortalVue from 'portal-vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import App from '@/standalone/App';
import store from '@/store';
import router from '@/standalone/router';
import i18n from '@/plugins/i18n';
import '@/plugins/quasar';

Vue.use(PortalVue);

if(process.env.VUE_APP_SENTRY_API_KEY)
{
	Sentry.init({
		dsn: process.env.VUE_APP_SENTRY_API_KEY,
		integrations: [
			new Integrations.Vue({
				Vue,
				attachProps: true
			})
		]
	});
}

const main = () =>
{
	/* eslint-disable no-new */
	new Vue({
		el: '#app',
		store,
		router,
		i18n,
		render: (h) => h(App)
	});
};

const setApplicationPassword = (password) =>
{
	if(!password)
	{
		store.dispatch('app/account/logout');

		return;
	}

	store.dispatch('app/account/login', password);
};

// Listen for when the user logs in and out using the chrome onMessage, we trigger the store to run the login/logout function
chrome.runtime.onMessage.addListener(({ method, type, data }, sender, response) =>
{
	if(method === 'set' && type === 'applicationPassword')
	{
		setApplicationPassword(data);
	}
});

// This will get the applicationPassword from the users extension memory straight away
chrome.runtime.sendMessage({ method: 'get', type: 'applicationPassword' }, async (res) =>
{
	// We have the applicationPassword, but first we need to load the application account (from chrome storage) into the store
	await store.dispatch('app/load');

	// Now we log the user into the account using the password
	setApplicationPassword(res);

	// And finally, we can load the actual application
	main();
});

export default store;
