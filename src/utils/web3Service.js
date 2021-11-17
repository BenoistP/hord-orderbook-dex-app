import Web3 from 'web3';
import Dec from 'decimal.js';
import configJson from '../config/config.json';
import { wait } from './utilsService';
import { getNetwork, web3WalletConnector } from './walletService';
import { getContractAddress } from './contractReader';

export const setupWeb3 = (provider) => {
  if (!provider) {
    web3WalletConnector.disconnect();
  }
  const rpcProvider = provider || configJson.rpcUrl;
  window._web3 = new Web3(rpcProvider);
};

export const setWeb3toInPageProvider = async (retryNum = 0) => {
  const exists = window.ethereum || window.web3?.currentProvider;

  if (!exists) {
    if (retryNum < 5) {
      await wait(300);
      return setWeb3toInPageProvider(retryNum + 1);
    }

    throw new Error('errors.no_wallet');
  }

  const testWeb3 = new Web3(window.ethereum || window.web3.currentProvider);
  const testWeb3Network = await getNetwork(testWeb3);

  if (configJson.network !== testWeb3Network) throw new Error('errors.wrong_network');

  window._web3 = new Web3(window.ethereum || window.web3.currentProvider);
  return testWeb3Network;
};

export const ethToWei = (_ethVal, size = 'ether') => {
  const parts = Dec(_ethVal.toString()).toString().split('.');
  let val = parts[0];

  if (parts[1]) {
    const decimals = parts[1].length > 18 ? parts[1].substring(0, 18) : parts[1];
    val += `.${decimals}`;
  }

  return window._web3.utils.toWei(`${val}`, size);
};

export const WeiToEth = (value) => window._web3.utils.fromWei(value.toString(), 'ether');

const sendAsync = (payload) =>
  new Promise((resolve, reject) => {
    window._web3.currentProvider.sendAsync(payload, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.result);
      }
    });
  });

export const signTypedDataV4 = async (message, type, primaryType, championAddress) => {
  // this is signature Validator Contract Address
  const address = getContractAddress('SignatureValidator');
  const data = {
    domain: {
      chainId: 3,
      // take name from here: https://github.com/hord/smart-contracts/blob/develop/contracts/SignatureValidator.sol
      name: 'Hord.app',
      // // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
      verifyingContract: address || '', // contract address from this contract: https://github.com/hord/smart-contracts/blob/develop/contracts/SignatureValidator.sol needs to be added later
      // take version from here: https://github.com/hord/smart-contracts/blob/develop/contracts/SignatureValidator.sol
      version: '1',
    },
    message,
    ...primaryType,
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      ...type,
    },
  };

  const msgParams = JSON.stringify(data);
  const from = (await window._web3.eth.getAccounts())[0];
  const params = [from, msgParams];
  const method = 'eth_signTypedData_v4';
  const result = await sendAsync({
    method,
    params,
    from,
  });

  const signature = result.substring(2);
  const r = `0x${signature.substring(0, 64)}`;
  const s = `0x${signature.substring(64, 128)}`;
  let v = parseInt(signature.substring(128, 130), 16);
  v = v < 27 ? v + 27 : v;

  return {
    r,
    s,
    v,
  };
};

window.signTypedDataV4 = signTypedDataV4;
