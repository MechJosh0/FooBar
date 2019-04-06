import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const loadComponent = (path) => () => import(`@/standalone/views${path}`);

// Guard to check if the user is an admin before accessing a page.
const logInCheck = (accountArea) => (to, from, next) =>
{
	if(accountArea)
	{
		if(!store.getters['account/getActiveAccount'])
		{
			// User is trying to access an account area while logged out
			return next({
				path: '/'
			});
		}

		// User is accessing their logged in account area
		return next();
	}

	if(store.getters['account/getActiveAccount'])
	{
		// Guest is trying to access Login page
		return next({
			path: '/account'
		});
	}

	// Guest is accessing guest area :)
	return next();
};

const routeConfig = [
	{
		path: '/',
		name: 'index',
		component: loadComponent('/account/Create')
	},
	{
		path: '/create',
		name: 'account.create',
		component: loadComponent('/account/Create')
	},
	{
		path: '/import',
		name: 'account.import',
		component: loadComponent('/account/Import')
	},
	{
		path: '/account/:account',
		name: 'account',
		beforeEnter: logInCheck(true),
		redirect: {
			name: 'account.user'
		},
		component: loadComponent('/account/loggedIn/Index'),
		children: [
			{
				name: 'account.user',
				path: 'user',
				component: loadComponent('/account/loggedIn/User')
			},
			{
				name: 'account.transactions',
				path: 'transactions',
				component: loadComponent('/account/loggedIn/Transactions')
			},
			{
				name: 'account.transfer',
				path: 'transfer',
				component: loadComponent('/account/loggedIn/Transfer')
			},
			{
				name: 'account.backup',
				path: 'backup',
				component: loadComponent('/account/loggedIn/Backup')
			},
			{
				name: 'account.export',
				path: 'export',
				component: loadComponent('/account/loggedIn/Export')
			}
		]
	}
];

const router = new Router({
	// mode: 'history', // Doesn't work in extensions :/
	routes: routeConfig
});

router.beforeEach(async (to, from, next) =>
{
	if(to.params.account)
	{
		// Set this as activeAccount
		const account = store.getters['account/getAccountBy']('name', to.params.account);

		if(!account) // Account (URL path) not found
		{
			return next({
				path: '/'
			});
		}

		store.dispatch('account/logIn', account.address);
	}

	return next();
});

export default router;
