import { contracts } from './contracts';

export const createContract = (address, abi) => async () => {
  return new window._web3.eth.Contract(abi, address);
};

export const loadContracts = (signer) => {
  const loadedContracts = {};
  contracts.map((contract) => {
    loadedContracts[contract.name] = createContract(contract.address, contract.abi);
    return contract;
  });

  return loadedContracts;
}