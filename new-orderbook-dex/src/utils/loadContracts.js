import { Contract } from 'ethers';
import { contracts } from './contracts';

export const loadContract = (contract, signer) => {
  return new Contract(
    contract.address,
    contract.abi,
    signer,
  );
};

export const loadedContracts = (signerAddress) => {
  return contracts.map((contract) => {
        contract = { [contract.name]: loadContract(contract, signerAddress) };
        return contract;
      });
}

