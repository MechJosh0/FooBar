import Vue from 'vue';

const state = {
	confirming: {}
};

const mutations = {
	SET_CONFIRMING(state, payload)
	{
		state.confirming[payload.tx.getHash()] = payload;
	},
	REMOVE_CONFIRMING(state, tx)
	{
		Vue.delete(state.confirming, tx.getHash());
	}
};

const actions = {
	async sendTransaction({ commit }, payload)
	{
		commit('SET_CONFIRMING', payload);

		const txReceipt = await payload.tx.send();

		commit('REMOVE_CONFIRMING', payload.tx);

		return txReceipt;
	}
};

const getters = {
	getConfirming: () => state.confirming
};

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
