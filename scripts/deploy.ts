// scripts/deploy.js

const fs = require('fs');

async function main() {
    // ethers library automatically injected by hardhat 
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ethers'.
    const Wallet = await ethers.getContractFactory('Wallet');
    const wallet = await Wallet.deploy([], 3);
    console.log(`Wallet address: ${wallet.address}`);

    // const data = {
    //     address: wallet.address,
    //     abi: JSON.parse(wallet.interface.format('json'))
    // };
    // // path to frontend code goes here 
    // fs.writeFileSync('frontend/src/')
}

// https://hardhat.org/guides/deploying.html
main()
    .then(() => process.exit(0))
    .catch(error => { 
        console.error(error);
        process.exit(1);
    });