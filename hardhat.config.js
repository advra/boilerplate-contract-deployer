require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Ensure this line is at the top to load environment variables

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Access environment variables using process.env
const INFURA_API_KEY = process.env.INFURA_API_KEY;

module.exports = {
  solidity: "0.8.4",
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
    }
  }
}