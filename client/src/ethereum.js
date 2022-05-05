import { ethers, Contract } from 'ethers';
import Wallet from './Wallet.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        const wallet = new Contract(
          Wallet.address,
          Wallet.abi,
          signer
        );

        resolve({signerAddress, wallet});
      }
      resolve({signerAddress: undefined, wallet: undefined});
    });
  });

export default getBlockchain;
