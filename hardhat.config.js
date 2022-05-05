/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// waffle is a testing library 
require('@nomiclabs/hardhat-waffle');

const ALCHEMY_URL = 'https://eth-rinkeby.alchemyapi.io/v2/1sqWXH22QCNepGOXSfPe27OPzFpFxtyH';
const PRIVATE_KEY = 'ab52850ae7e5dbc6cf23a4463409304165c9b176e6f2aa0f5764e5843b9a9447';

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: ALCHEMY_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
