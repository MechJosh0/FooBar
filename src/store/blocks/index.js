// import { BlockApi } from 'nuls-js';

const state = {
	latestHeight: 0
};

const mutations = {
	SET_LATEST_BLOCK(state, height)
	{
		state.latestHeight = height;
	}
};

const actions = {
	init()
	{
		// TODO
	}
};

const getters = {};

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
