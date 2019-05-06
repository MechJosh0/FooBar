import { getAddressTransactions, getAddressFullTransactions } from '@/utils/api';

const state = {
	transactions: {
		mainNet: {},
		testNet: {}
	}
};

const mutations = {
	SET_TRANSACTIONS(state, { release, address, data })
	{
		state.transactions[release][address] = data;

		localStorage.setItem('transactions', JSON.stringify(state.transactions));
	}
};

const actions = {
	async getAddressTransactions({ state, commit, rootGetters }, address)
	{
		const release = rootGetters['app/getRelease'];
		const res = await getAddressTransactions(release, address);

		commit('SET_TRANSACTIONS', { release, address, data: res });

		return res.transactions;
	},
	async getAddressFullTransactions({ state, commit, rootGetters }, { address, page })
	{
		const release = rootGetters['app/getRelease'];
		const res = await getAddressFullTransactions(release, address, page);

		return res;
	}
};

const getters = {
	getTransactions: (state, commit, rootGetters) => (account) =>
	{
		const release = rootGetters['app/getRelease'];

		return state.accounts[release][account].transactions;
	}
};

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
