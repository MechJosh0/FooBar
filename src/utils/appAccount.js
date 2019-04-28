import { Account } from 'nuls-js';

const ApplicationAccount = class
{
	password = null;

	constructor(password)
	{
		this.set(password);
	}

	set(newPassword)
	{
		this.password = newPassword;
	}

	decrypt(encryptedPrivateKey)
	{
		if(!this.password) throw new Error('No password is set');

		const account = Account.import(this.password, encryptedPrivateKey);

		return account.privateKey;
	}
}();

export default ApplicationAccount;
