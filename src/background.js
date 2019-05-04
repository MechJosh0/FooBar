const state = {
	applicationPassword: null
};

chrome.runtime.onMessage.addListener(({ method, type, data }, sender, response) =>
{
	switch(method)
	{
		case 'get':
			response(state[type]);
			break;
		case 'set':
			state[type] = data;
			response(state[type]);
			break;
		default:
			response(`unknown method: [${method}, ${type}, ${data}]`);
			break;
	}
});
