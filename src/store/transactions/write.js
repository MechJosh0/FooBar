import Vue from 'vue';
import i18n from '@/plugins/i18n';
import { success, error } from '@/utils/notifications';

const test = {
	state: 'verifying',
	attempt: 1,
	transaction: {
		recipients: ['TTavS9d34z6byDS8KKxwmf1LprkdjB9G'],
		remark: null,
		amount: 0.01,
		fee: 0.005,
		autoFee: true,
		advanced: false
	},
	tx: {
		getHash: () => '00208e3c19c86571e974a2d5f026e7208288fad5c399840e5eceb56a0908ce2811f7',
		_time: new Date().getTime(),
		_fee_price: 100000
	}
};

const state = {
	confirming: {}
};

const mutations = {
	CREATE_CONFIRMING(state, { hash, payload })
	{
		Vue.set(state.confirming, hash, {
			type: '2-verifying',
			attempt: 1,
			time: new Date().getTime(),
			...payload
		});
	},
	UPDATE_ATTEMPT(state, hash)
	{
		Vue.set(state.confirming[hash], 'attempt', state.confirming[hash].attempt + 1);
	},
	SET_TYPE(state, { hash, type })
	{
		Vue.set(state.confirming[hash], 'type', type);
	},
	REMOVE_COMPLETED(state)
	{
		Object.keys(state.confirming).forEach((hash) =>
		{
			if(['2-success'].includes(state.confirming[hash].type))
			{
				Vue.delete(state.confirming, hash);
			}
		});
	}
};

const actions = {
	removeCompleted({ commit })
	{
		commit('REMOVE_COMPLETED');
	},
	async sendTransaction({ commit }, payload)
	{
		const hash = payload.tx.getHash();
		const attemptsCounter = setInterval(() => commit('UPDATE_ATTEMPT', hash), 10000);

		commit('CREATE_CONFIRMING', { hash, payload });

		try
		{
			const txReceipt = await payload.tx.send();

			clearInterval(attemptsCounter);
			commit('SET_TYPE', { hash, type: '2-success' });
			success(i18n.t('views.transfer.form.submit.success'));

			return txReceipt;
		}
		catch(e)
		{
			console.error(e.message);
			commit('SET_TYPE', { hash, type: '2-error' });
			error(i18n.t('views.transfer.form.submit.somethingWentWrong'));
			clearInterval(attemptsCounter);

			return false;
		}
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
