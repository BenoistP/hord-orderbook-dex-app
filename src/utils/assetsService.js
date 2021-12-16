import Dec from 'decimal.js';
import { getErc20Contract as _ } from './contractsRegistryService';

const assetAmountInEth = (amount) => {
  const decimals = 18;
  return Dec(amount?.toString() || 0)
    .div(10 ** decimals)
    .toString();
};

const getAssetAllowanceForAddress = async (owner, spender, contract) => {
  debugger
  const data = await contract.allowance(owner, spender).call();
  debugger

  return assetAmountInEth(data);
};

export const isAddressApprovedOnAsset = async (account, addressToCheck, contract, amount) => {
  const allowance = await getAssetAllowanceForAddress(account, addressToCheck, contract);
  return Dec(allowance).gte(amount);
};