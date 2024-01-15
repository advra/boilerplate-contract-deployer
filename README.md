# Boilerplate Contract Deloyer

This is a boilerplate contract deployer to ETH. It provides the base template to deploy to `localhost` or infura's `sepolia`.

## I. Technology Stack & Tools

- Solidity (Writing Smart Contract)
- [Hardhat](https://hardhat.org/) (Development Framework)

## II. Requirements For Initial Setup
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

#### 3a. Localhost Network
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
4. Connect development blockchain accounts to Metamask
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.  
5. Launching Front End
```bash
npm run start
```

#### 3b. Sepolia Test Net
1. Update your private key 
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.  
2. Migrate Smart Contracts
```bash
npx hardhat run src/backend/scripts/deploy.js --network sepolia
```
3. Launching Front End
```bash
npm run start
# Browser should automatically open otherwise visit localhost:3000
```

### III. Other Useful Commands

#### Running Unit Tests
```bash
npx hardhat test 
# or in parallel
npx hardhat test --parallel
```

#### Etherscan Verficiation:
When deploying on chain you can optionally verify your contract. Note: Enter contract address with constructor arguments used in deploy.js (if any).
Make sure you set your `ETHERSCAN_API_KEY` in (.env)[./.env] (obtained by creating an account on etherscan)
```bash
npx hardhat verify YOUR_CONTRACT_ADDRESS CONSTRUCTOR_ARGS --network sepolia
## EXAMPLE
npx hardhat verify 0x876D71dA191F15A2912cB8DaA3a3577532A96EA1 --network sepolia
```

### Other Notes: 
If you get error rpc-internal on metamask or node an error that shows nonce too high you need to go to metamask and "Clear Recent Activities" to reset the nonce for that account.


License
----
MIT