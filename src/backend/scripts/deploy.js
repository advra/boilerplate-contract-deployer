async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  
  // Get the ContractFactories and Signers here.
  // Note the variable must be the same as the contract name and string
  const AbstractSRNFT = await ethers.getContractFactory("AbstractSRNFT");
  // add additional contract factories here
  
  // deploy contracts
  const nft = await AbstractSRNFT.deploy();
  // deploy all other contracts here

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(nft , "AbstractSRNFT");
  // save contract json outputs here
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });