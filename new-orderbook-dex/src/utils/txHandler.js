// add notifications here
export const txHandler = async (contract, functionName, parameters) => {
    try {
        const tx = await contract[functionName](...parameters)
        tx.wait()
    } catch (error) {
        console.log(error)
        debugger
    }
}