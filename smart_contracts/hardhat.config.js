// https://eth-mainnet.g.alchemy.com/v2/1zWUeQHx_hDUYax-EDhM3IcNcm9Uk9FJ

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    // ropsten: {
    //   url: 'https://eth-sepolia.g.alchemy.com/v2/1zWUeQHx_hDUYax-EDhM3IcNcm9Uk9FJ',
    //   accounts: ['c354190a6c417652953f10da8c60d389b2aec1975ae0ecf85dca014de41e4c13']
    // }
  }
}