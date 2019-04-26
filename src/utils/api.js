import axios from 'axios';

export const getAddressTransactions = async (release, address) =>
{
	try
	{
		// release = 'mainNet';
		// address = 'Nse93nWppH1FZXwMbMv4bMifvhycyFZb';
		const domain = release === 'mainNet' ? 'nuls.world' : 'testnet.nuls.world';
		const { data } = await axios.get(`https://${domain}/addresses/${address}.json`);

		return data;
	}
	catch(e)
	{
		throw Error(e.message);
	}
};

export const getLatestHeight = async () =>
{
	// TODO
};
