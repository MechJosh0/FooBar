import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const loadComponent = (path) => () => import(`@/standalone/views${path}`);
const loadUI = (path) => () => import(`@/standalone/components${path}`);

// Check if the wallet extension exists (used for displaying either login or register pages)
const extensionWalletExists = (mustExist) => async (to, from, next) =>
{
	const extensionWallet = await store.getters['app/storage/get']('_extensionWallet');

	if(mustExist && !extensionWallet)
	{
		return next({
			name: 'register'
		});
	}

	if(!mustExist && extensionWallet)
	{
		return next({
			name: 'login'
		});
	}

	return next();
};

// Check if the user is logged in
const logInCheck = (walletArea) => (to, from, next) =>
{
	if(!store.getters['app/account/isLoggedIn']) // If the user is not logged into the application
	{
		return next({
			name: 'login'
		});
	}

	if(walletArea) // If we're visting a wallet area page (transfer, transactions etc)
	{
		if(!store.getters['wallets/getActiveWallet']) // If the user doesn't have an active wallet
		{
			// User is trying to access a wallet area while logged out
			return next({
				name: 'login'
			});
		}

		// User is accessing their logged in wallet area
		return next();
	}

	// User is accessing general logged in pages (creating and importing addresses etc)
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
		path: '/:wallet?',
		component: loadComponent('/Index')
	},
	{
		name: 'register',
		path: '/register',
		beforeEnter: extensionWalletExists(false),
		component: loadComponent('/account/Register')
	},
	{
		name: 'login',
		path: '/login',
		beforeEnter: extensionWalletExists(true),
		component: loadComponent('/account/Login')
	},
	{
		name: 'logout',
		path: '/logout',
		component: loadComponent('/account/Logout')
	},
	{
		name: 'account',
		path: '/account',
		beforeEnter: accountArea(),
		component: loadUI('/RouterView'),
		redirect: {
			name: 'account.create'
		},
		children: [
			{
				name: 'settings',
				path: 'settings',
				component: loadComponent('/account/Settings')
			},
			{
				name: 'account.wallet.create',
				path: 'wallet/create',
				component: loadComponent('/account/wallet/Create')
			},
			{
				name: 'account.wallet.import',
				path: 'wallet/import',
				component: loadComponent('/account/wallet/Import')
			},
			{
				name: 'account.wallet',
				path: 'wallet/:wallet',
				beforeEnter: walletArea(),
				redirect: {
					name: 'account.user'
				},
				component: loadComponent('/account/wallet/Index'),
				children: [
					{
						name: 'account.wallet.user',
						path: 'user',
						component: loadComponent('/account/wallet/User')
					},
					{
						name: 'account.wallet.transactions',
						path: 'transactions',
						component: loadComponent('/account/wallet/Transactions')
					},
					{
						name: 'account.wallet.transfer',
						path: 'transfer',
						component: loadComponent('/account/wallet/Transfer')
					},
					{
						name: 'account.wallet.backup',
						path: 'backup',
						component: loadComponent('/account/wallet/Backup')
					},
					{
						name: 'account.wallet.export',
						path: 'export',
						component: loadComponent('/account/wallet/Export')
					},
					{
						name: 'account.wallet.delete',
						path: 'delete',
						component: loadComponent('/account/wallet/Delete')
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
	if(to.params.wallet)
	{
		// Set this as activeWallet
		const wallet = store.getters['wallets/getWalletBy']('name', to.params.wallet);

		if(!wallet) // Wallet (URL path) not found
		{
			return next({
				name: 'index'
			});
		}

		store.dispatch('wallets/logIn', wallet.address);
	}

	return next();
});

export default router;
