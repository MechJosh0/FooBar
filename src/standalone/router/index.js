import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

// const routeConfig = [
// 	{
// 		path: '/',
// 		component: PageIndex
// 	}
// ];

// Guard to check if the user is an admin before accessing a page.
const logInCheck = (accountArea) => (to, from, next) =>
{
	if(accountArea)
	{
		if(!store.getters['account/getAccount'])
		{
			// User is trying to access an account area while logged out
			return next({
				path: '/'
			});
		}

		// User is accessing their logged in account area
		return next();
	}

	if(store.getters['account/getAccount'])
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
		name: 'login',
		beforeEnter: logInCheck(false),
		component: () => import('../views/account/Login')
	},
	{
		path: '/account',
		name: 'account',
		beforeEnter: logInCheck(true),
		redirect: {
			name: 'account.user'
		},
		component: () => import('../views/account/loggedIn/Index'),
		children: [
			{
				name: 'account.user',
				path: 'user',
				component: () => import('../views/account/loggedIn/User')
			},
			{
				name: 'account.transactions',
				path: 'transactions',
				component: () => import('../views/account/loggedIn/Transactions')
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
	next();
});

export default router;
