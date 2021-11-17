import { contracts } from './contracts';

const createContract = (address, abi) => async () => {
  return new window._web3.eth.Contract(abi, address);
};

export const loadContracts = async () => {
  const loadedContracts = {};
  await Promise.all(
    contracts.map(async (contract) => {
      const loadedContract = await createContract(
        contract.address,
        contract.abi,
      )();
      loadedContracts[contract.name] = {
        address: loadedContract._address,
        ...loadedContract.methods,
      };
      return contract;
    }),
  );

  return loadedContracts;
};
