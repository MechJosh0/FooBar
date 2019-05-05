const state = {
	solution: 'chromeLocal'
};

const mutations = {
	SET_SOLUTION(state, solution)
	{
		state.solution = solution;
	}
};

const actions = {
	setSolution({ commit }, solution)
	{
		if(!['chromeLocal', 'chromSync'].includes(solution)) return false;

		commit('SET_SOLUTION', solution);

		return true;
	},
	set({ state }, { key, value })
	{
		return new Promise((resolve, reject) =>
		{
			switch(state.solution)
			{
				case 'chromeLocal':
					return chrome.storage.local.set({ [key]: value }, () => resolve(value));
				case 'chromSync':
					return chrome.storage.sync.set({ [key]: value }, () => resolve(value));
				default:
					throw new Error('Unknown storage solution');
				// resolve(localStorage.setItem(key));
			}
		});
	},
	remove({ state }, key)
	{
		return new Promise((resolve, reject) =>
		{
			switch(state.solution)
			{
				case 'chromeLocal':
					return chrome.storage.local.remove(key, (results) => resolve(results[key]));
				case 'chromSync':
					return chrome.storage.sync.remove(key, (results) => resolve(results[key]));
				default:
					throw new Error('Unknown storage solution');
				// resolve(localStorage.removeItem(key));
			}
		});
	}
};

const getters = {
	getSolution: (state) => state.solution,
	get: (state) => (key) =>
	{
		return new Promise((resolve, reject) =>
		{
			switch(state.solution)
			{
				case 'chromeLocal':
					return chrome.storage.local.get(key, (results) => resolve(results[key]));
				case 'chromSync':
					return chrome.storage.sync.get(key, (results) => resolve(results[key]));
				default:
					throw new Error('Unknown storage solution');
				// resolve(localStorage.getItem(key));
			}
		});
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
