require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Ensure this line is at the top to load environment variables

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Access environment variables using process.env
const INFURA_API_KEY = process.env.INFURA_API_KEY;

module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    localhost: {
      accounts: [
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',   // hardhat account 1
        '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',   // hardhat account 2
      ],
    }
  }
}