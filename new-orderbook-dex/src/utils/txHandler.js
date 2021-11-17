// add notifications here
export const txHandler = async (contract, functionName, parameters) => {
    try {
        const tx = await contract[functionName](...parameters)
        debugger;
        await tx.wait()
        debugger
    } catch (error) {
        console.log(error)
        debugger
    }
}