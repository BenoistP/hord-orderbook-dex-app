import { contracts } from './contracts';

const createContract = (address, abi) => async () => {
  return new window._web3.eth.Contract(abi, address);
};

export const loadContracts = async () => {
  const loadedContracts = {};
  await Promise.all(contracts.map(async (contract) => {
    loadedContracts[contract.name] = await createContract(contract.address, contract.abi)();
    return contract;
  }));

  return loadedContracts;
}