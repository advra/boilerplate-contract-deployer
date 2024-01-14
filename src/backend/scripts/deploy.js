// Note: Within hardhat deployment we use hardhat runtime environment to reference 
// the ethers provider instead 
// import { ethers } from "ethers";
const hre = require("hardhat");

// custom logger
const UtilLogger = require('./UtilLogger');
const logger = new UtilLogger();

async function main() {

  // using hardhat get hardhats runtime environment to get signers
  const [deployer] = await hre.ethers.getSigners();

  logger.log("Deploying contracts with the account:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  logger.log("Account balance:", balance.toString());
  
  // Get the ContractFactories and Signers here.
  const AbstractSRNFT = await hre.ethers.getContractFactory("AbstractSRNFT");
  // deploy contracts
  const nft = await AbstractSRNFT.deploy();
  // Save copies of each contracts abi and address to the frontend.
  
  const contractAddress = await nft.getAddress();
  logger.log("Deployed contract address:", contractAddress);
  saveFrontendFiles(nft , "AbstractSRNFT", contractAddress);
}

function saveFrontendFiles(contract, name, contractAddress) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );

  const contractArtifact = hre.artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });