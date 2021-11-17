import { Web3WalletConnector } from '@dcentralab/web3-wallet-connector';

export const web3WalletConnector = new Web3WalletConnector({
  portisDAppId: process.env.PORTIS_DAPP_ID,
  fortmaticKey: process.env.FORTMATIC_API_KEY,
});

export const getAccount = async () => {
  const accounts = await window._web3.eth.getAccounts();

  if (!accounts.length) throw new Error('errors.no_accounts_locked');
  return accounts[0];
};

export const getNetwork = (web3) => {
  if (web3) return web3.eth.net.getId();
  return window._web3.eth.net.getId();
};