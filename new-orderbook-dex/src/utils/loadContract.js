import { Contract } from 'ethers';

export const loadContract = (contract, signer) => {
  return new Contract(
    contract.address,
    contract.abi,
    signer,
  );
};