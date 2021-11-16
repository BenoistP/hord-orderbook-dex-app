import { ethers } from 'ethers';
// import { store } from '../App';
// import { createNotification } from 'store/actions/uiActions';

const connectWallet = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const signerAddress = await signer.getAddress();

      return { signerAddress };
    } else {
      // store.dispatch(
      //   createNotification(
      //     'error',
      //     'Right now we just support Metamask, please download Metamask and come back :)',
      //     4000,
      //   ),
      // );
    }
  } catch (error) {
    debugger;
    console.log(error);
  }
};

export default connectWallet;
