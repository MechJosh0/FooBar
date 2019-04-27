import { getAddressTransactions } from '@/utils/api';

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

		const data = await getAddressTransactions(release, address);

		commit('SET_TRANSACTIONS', { release, address, data });

		return data.transactions;
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
