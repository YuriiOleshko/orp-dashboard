/* eslint-disable */
import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { getWallet, getContract } from '../utils/near-utils';

export const {
	networkId, nodeUrl, contractName, contractMethods
} = getConfig();

export const {
	utils: {
		format: {
			formatNearAmount
		}
	}
} = nearAPI;

export const initNear = () => async ({ update, getState, dispatch }) => {
	const { near, wallet, contractAccount } = await getWallet();

	wallet.signIn = () => {
		wallet.requestSignIn(contractName, 'Blah Blah');
	};
	const signOut = wallet.signOut;
	wallet.signOut = () => {
		signOut.call(wallet);
		update('wallet.signedIn', false);
		update('', { account: null });
	};

	wallet.signedIn = wallet.isSignedIn();

	let account;
	if (wallet.signedIn) {
		account = wallet.account();
		wallet.balance = formatNearAmount((await wallet.account().getAccountBalance()).available, 2);
		await update('', { near, wallet, contractAccount, account });
		const contract = getContract(account, contractMethods);
		const userProfile = await contract.get_data({account_id: account.accountId});
		console.log('userProfile', userProfile)
		await update('app', {profile: JSON.parse(userProfile)});
	}

	await update('', { near, wallet, contractAccount, account });
};

export const updateWallet = () => async ({ update, getState }) => {
    const { wallet } = await getState()
    wallet.balance = formatNearAmount((await wallet.account().getAccountBalance()).available, 2);
    await update('', { wallet });
}
