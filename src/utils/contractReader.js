import { createContract, fetchContracts } from './contractsRegistryService';
import configJson from '../config/config.json';
import { wait } from './utilsService';
import { getValueByMultiProps } from '../utils/mapper';

// used to read data from contract
let contracts = null;

(async () => {
  contracts = await fetchContracts();
})();

const findInContracts = (contractName) => {
  let newContractsObject = {};

  Object.entries(contracts).forEach(([key, value]) => {
    const newKey = key.toLocaleLowerCase();
    newContractsObject = { ...newContractsObject, [newKey]: value };
  });

  const lowerCasedName = contractName.toLocaleLowerCase();
  return newContractsObject?.[lowerCasedName];
};

export const getContractAddress = (contractName) => {
  if (!contracts) {
    return getContractAddress(contractName);
  }
  const contract = findInContracts(contractName);
  const contractAddress = getValueByMultiProps(contract?.networks?.[configJson.network], ['Proxy', 'address']);
  return contractAddress;
};

export const useContractReader = async (
  contractName,
  contractFunction,
  parameters = [],
  callMethod = (contractInstance) => contractInstance?.methods?.[contractFunction](...parameters)?.call(),
  passedAddress,
) => {
  let result;
  try {
    if (!contracts) {
      return useContractReader(contractFunction, contractName, parameters);
    }
    const contractAddress = passedAddress || getContractAddress(contractName);

    const _contract = await createContract(contractName, contractAddress, contracts);
    const contract = await _contract();

    result = await callMethod(contract);
  } catch (error) {
    result = error.message;
  }
  return result;
};

export const getContractInstance = async (contractName, passedAddress) => {
  const foundContract = findInContracts(contractName);
  const address = passedAddress || foundContract?.networks?.[configJson.network]?.['Proxy'];

  const _contract = await createContract(contractName, address, contracts);
  const contract = await _contract();

  return contract;
};

export const HORD_TOKEN_ADDRESS = '';
