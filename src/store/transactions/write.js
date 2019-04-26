import Vue from 'vue';
import i18n from '@/plugins/i18n';
import { success, error } from '@/utils/notifications';

const test = {
	state: 'verifiyng',
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
	confirming: {},
	confirmingAttempts: {}
};

const mutations = {
	CREATE_CONFIRMING(state, { hash, payload })
	{
		state.confirmingAttempts[hash] = 1;
		state.confirming[hash] = {
			state: 'verifiyng',
			attempt: 1,
			...payload
		};
	},
	UPDATE_ATTEMPT(state, { hash, attempt })
	{
		console.log(1, hash, attempt);
		// Vue.set(state.confirming[hash], 'attempt', attempt);
		Vue.set(state.confirmingAttempts, hash, attempt);
		// state.confirming[hash].attempt += 1;
	},
	SET_STATE(state, { hash, status })
	{
		Vue.set(state.confirming[hash], 'state', status);
	},
	REMOVE_COMPLETED(state)
	{
		Object.keys(state.confirming).forEach((hash) =>
		{
			if(['success'].includes(state.confirming[hash].state))
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
		payload = test;
		const hash = payload.tx.getHash();
		let attempt = 1;

		commit('CREATE_CONFIRMING', { hash, payload });

		const attemptsCounter = setInterval(() =>
		{
			attempt += 1;
			commit('UPDATE_ATTEMPT', { hash, attempt });
		}, 1000);

		try
		{
			// const txReceipt = await payload.tx.send();

			// clearInterval(attemptsCounter);
			commit('SET_STATE', { hash, status: 'success' });
			success(i18n.t('views.transfer.form.submit.success'));

			// return txReceipt;
		}
		catch(e)
		{
			console.error(e.message);
			commit('SET_STATE', { hash, status: 'error' });
			error(i18n.t('views.transfer.form.submit.somethingWentWrong'));
			clearInterval(attemptsCounter);

			return false;
		}
	}
};

const getters = {
	getConfirming: () => state.confirming,
	getConfirmingAttempts: () => state.confirmingAttempts
};

export default {
	namespaced: true,
	modules: {},
	state,
	mutations,
	actions,
	getters
};
