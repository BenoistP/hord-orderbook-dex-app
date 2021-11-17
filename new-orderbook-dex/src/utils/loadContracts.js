import { Contract } from 'ethers';
import { contracts } from './contracts';

export const loadContract = (address, abi, signer) => {
  return new Contract(
    address,
    abi,
    signer,
  );
};

export const loadContracts = (signer) => {
  const loadedContracts = {};
  contracts.map((contract) => {
    loadedContracts[contract.name] = loadContract(contract.address, contract.abi, signer);
    return contract;
  });

  return loadedContracts;
}

