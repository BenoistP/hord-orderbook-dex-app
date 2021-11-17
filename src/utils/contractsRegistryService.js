import configJson from 'config/config.json';
// import contracts from 'config/contracts.json';
import { handleResponse } from './apiService';
import { wait } from './utilsService';

export const fetchContracts = async () =>
  fetch(`${configJson.apiPath}/config/contracts`).then((res) => handleResponse(res, false));

// GETTERS
export const getContractAddress = (name, contracts = {}) => {
  const address = contracts?.[name]?.networks?.[configJson.network]?.['Proxy'];
  return address;
};

const findInContracts = (contractName, contracts = {}) => {
  let newContractsObject = {};
  Object.entries(contracts).forEach(([key, value]) => {
    const newKey = key.toLocaleLowerCase();
    newContractsObject = { ...newContractsObject, [newKey]: value };
  });
  const lowerCasedName = contractName.toLocaleLowerCase();
  return newContractsObject?.[lowerCasedName];
};

export const createContract = (name, address, contracts) => async () => {
  // this method has been added to avoid search contracts names case-sensitivity
  const contract = findInContracts(name, contracts);
  return new window._web3.eth.Contract(contract.abi, address);
};

export const getErc20Contract = async (address) => createContract('Erc20', address)();

export const hordAddress = getContractAddress('HORD');
export const hordContract = createContract('HORD', hordAddress);
export const hordTicketManagerAddress = getContractAddress('HordTicketManager');
export const HordTicketManagerContract = createContract('HordTicketManager', hordTicketManagerAddress);
export const hordTicketFactoryAddress = getContractAddress('HordTicketFactory');
export const HordTicketFactoryContract = createContract('HordTicketFactory', hordTicketFactoryAddress);
export const HPoolManagerAddress = getContractAddress('HordHpoolManager');
export const HPoolManagerContract = createContract('HordHpoolManager', HPoolManagerAddress);
export const hordConfigurationAddress = getContractAddress('HordConfiguration');
export const HordConfigurationContract = createContract('HordConfiguration', hordConfigurationAddress);
