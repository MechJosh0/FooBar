import { Account } from 'nuls-js';

class ApplicationAccount
{
	password = null;

	// constructor(password)
	// {
	// 	this.set(password);
	// }

	isLoggedIn()
	{
		return !!this.password;
	}

	logout()
	{
		this.password = null;
	}

	login(newPassword)
	{
		if(typeof newPassword !== 'string') throw new Error('Password must be a string');

		this.password = newPassword;
	}

	decrypt(encryptedPrivateKey)
	{
		if(!this.password) throw new Error('No password is set');

		const account = Account.import(this.password, encryptedPrivateKey);

		return account.privateKey;
	}
}

export default new ApplicationAccount();
