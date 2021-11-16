// reads single and multiple contracts and returns value from smart contract read function call
// NOTE: if you use this function for multiple contracts (with an Array[], it will return an Object with the contract name as key and result as value)
// NOTE: use you use this function for a single contract (with just the contract name as a String), it will just return the result of the contract function call
export const useContractReader = async (
  contracts,
  contractNames,
  contractFunction,
  parameters,
) => {
  let result;
  const withParameter = parameters && parameters.length > 0;
  // !!!!check if parameter logic is not necessary!!!
  try {
    if (Array.isArray(contractNames)) {
      // for multiple contracts call the same function
      result = {};
      if (withParameter) {
        // for function call with parameter
        await Promise.all(
          contractNames.map(
            async (contractName) =>
              (result[contractName] = (
                await contracts[contractName][contractFunction](...parameters)
              ).toString()),
          ),
        );
      } else {
        // for function call without parameter
        await Promise.all(
          contractNames.map(
            async (contractName) =>
              (result[contractName] = (
                await contracts[contractName][contractFunction]()
              ).toString()),
          ),
        );
      }
    } else {
      // for single contract function call
      if (withParameter) {
        // for function call with parameter
        result = (
          await contracts[contractNames][contractFunction](...parameters)
        ).toString();
      } else {
        // for function call without parameter
        result = (
          await contracts[contractNames][contractFunction]()
        ).toString();
      }
    }
  } catch (error) {
    if (error.message === 'header not found') {
      // this recursive call can repeat and repeat and hit max call stack!
      // be careful => add timeout
      
      // eslint-disable-next-line
      return useContractReader(
        contracts,
        contractNames,
        contractFunction,
        parameters,
      );
    }
  }
  return result;
};
