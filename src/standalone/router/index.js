import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import appAccount from '@/utils/appAccount';

Vue.use(Router);

const loadComponent = (path) => () => import(`@/standalone/views${path}`);

// Check if the user is logged in
const logInCheck = (walletArea) => (to, from, next) =>
{
	console.log(appAccount.isLoggedIn());

	if(!appAccount.isLoggedIn())
	{
		return next({
			name: 'login'
		});
	}

	if(walletArea)
	{
		if(!store.getters['account/getActiveAccount'])
		{
			// User is trying to access an account area while logged out
			return next({
				name: 'login'
			});
		}

		// User is accessing their logged in account area
		return next();
	}

	if(store.getters['account/getActiveAccount'])
	{
		// Guest is trying to access Login page
		return next({
			name: 'account'
		});
	}

	// Guest is accessing guest area :)
	return next();
};

const accountArea = () =>
{
	return logInCheck(false);
};

const walletArea = () =>
{
	return logInCheck(true);
};

const routeConfig = [
	{
		name: 'index',
		path: '/',
		component: loadComponent('/Index')
	},
	{
		name: 'login',
		path: '/login',
		component: loadComponent('/Login')
	},
	{
		name: 'account',
		path: '/account',
		beforeEnter: accountArea(),
		redirect: {
			name: 'account.create'
		},
		component: loadComponent('/account/loggedIn/Index'),
		children: [
			{
				name: 'settings',
				path: 'settings',
				component: loadComponent('/Settings')
			},
			{
				name: 'account.create',
				path: 'create',
				component: loadComponent('/account/Create')
			},
			{
				name: 'account.import',
				path: 'import',
				component: loadComponent('/account/Import')
			},
			{
				name: 'account.wallet',
				path: ':account',
				beforeEnter: walletArea(),
				redirect: {
					name: 'account.user'
				},
				component: loadComponent('/account/loggedIn/Index'),
				children: [
					{
						name: 'account.wallet.user',
						path: 'user',
						component: loadComponent('/account/loggedIn/User')
					},
					{
						name: 'account.wallet.transactions',
						path: 'transactions',
						component: loadComponent('/account/loggedIn/Transactions')
					},
					{
						name: 'account.wallet.transfer',
						path: 'transfer',
						component: loadComponent('/account/loggedIn/Transfer')
					},
					{
						name: 'account.wallet.backup',
						path: 'backup',
						component: loadComponent('/account/loggedIn/Backup')
					},
					{
						name: 'account.wallet.export',
						path: 'export',
						component: loadComponent('/account/loggedIn/Export')
					}
				]
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
				name: 'index'
			});
		}

		store.dispatch('account/logIn', account.address);
	}

	return next();
});

export default router;
