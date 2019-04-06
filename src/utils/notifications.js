import { Notify } from 'quasar';

const notification = (data) =>
{
	const payload = typeof data === 'string' ? { message: data } : data;

	if(!payload.message)
	{
		return;
	}

	Notify.create({
		position: 'bottom',
		...payload
	});
};

export const success = (message) =>
{
	notification({
		color: 'positive',
		message
	});
};

export const error = (message) =>
{
	notification({
		color: 'negative',
		message
	});
};

export const warning = (payload) =>
{
	notification({
		color: 'warning',
		payload
	});
};

export const info = (message) =>
{
	notification({
		color: 'info',
		message
	});
};
