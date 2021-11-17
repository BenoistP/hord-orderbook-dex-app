export const useContractReader = async (
  contract,
  contractFunction,
  parameters = [],
  callMethod = (contractInstance) =>
    contractInstance?.methods?.[contractFunction](...parameters)?.call(),
) => {
  let result;
  try {
    result = await callMethod(contract);
  } catch (error) {
    result = error.message;
  }
  return result;
};
