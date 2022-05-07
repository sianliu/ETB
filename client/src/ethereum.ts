import { ethers, Contract } from 'ethers';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './Wallet.json'. Consider using... Remove this comment to see the full error message
import Wallet from './Wallet.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ethereum' does not exist on type 'Window... Remove this comment to see the full error message
      if(window.ethereum) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ethereum' does not exist on type 'Window... Remove this comment to see the full error message
        await window.ethereum.enable();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ethereum' does not exist on type 'Window... Remove this comment to see the full error message
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
