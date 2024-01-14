# Boilerplate Contract Deloyer

This is a boilerplate contract deployer to ETH. It provides the base template to deploy to `localhost` or infura's `sepolia`.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- [Hardhat](https://hardhat.org/) (Development Framework)

## Requirements For Initial Setup
- Install current LTS for Node (preferrably using [NVM](https://github.com/nvm-sh/nvm))
- Install [Hardhat](https://hardhat.org/) with [hardhat-toolbox](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox)
- Optional: If using vscode install Solidity and Hardhat extensions

## Setting Up
### 1. Clone/Download the Repository
```bash
git clone this repo
mv .env.bak  .env 
# modify the .env file as needed
```
### 2. Install Dependencies:
```bash
cd boilerplate-contract-deployer
npm install
```
### 3. Deploying

#### Localhost
Note: Everytime local hardhat node is deployed you need to re-deploy the contract (make sure you delete the folder src//frontend//contractsData)
1. Startup local node blockchain
```bash
cd boilerplate-contract-deployer
rm -rf /src/frontend/contractsData/*.json
npx hardhat node
```
2. Update your private key 
Change the `PRIVATE_KEY` in `.env` to use one of the following private key wallets provided in the console above
3. Migrate Smart Contracts
```bash
npx hardhat run src/backend/scripts/deploy.js --network localhost
```
4. 
### 4. Connect development blockchain accounts to Metamask
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.  

### 4. Testing 
```bash
npx hardhat test 
# or in parallel
npx hardhat test --parallel
```

### 5. Migrate Smart Contracts
Use network localhost for hardhat or sepolia for testnet
`npx hardhat run src/backend/scripts/deploy.js --network localhost`
Optionally Verify Smart Contracts:
Enter contract address with constructor arguments used in deploy.js
`npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS INPUT_GAS` 

### 6. Run Tests
`$ npx hardhat test`

### 7. Launch Frontend
`$ npm run start`

License
----
MIT

## On Chain Verficiation:
Change network to your desired network (ie sepoloa):
```
npm install --save-dev @nomiclabs/hardhat-etherscan
```


### Note: 
If you get error rpc-internal on metamask or node shows nonce too high, then go to metamask and clear recent activities.
