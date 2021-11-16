import { Contract } from 'ethers';
import { contracts } from './contracts';

export const loadContract = (address, abi, provider) => {
  return new Contract(
    address,
    abi,
    provider,
  );
};

export const loadContracts = (provider) => {
  const loadedContracts = {};
  contracts.map((contract) => {
    loadedContracts[contract.name] = loadContract(contract.address, contract.abi, provider);
    return contract;
  });

  return loadedContracts;
}

