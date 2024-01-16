# Boilerplate Contract Deloyer

By Abstract Core Systems

This is a boilerplate ethereum smart contract deployer. The project is structured with a front end and backend. It provides the base template to deploy to ethereum `localhost` or ethereum testnet on `sepolia` via [Infura](https://www.infura.io/). Special credits to [Space Riders NFT](https://opensea.io/collection/spaceridersnft) which the example contract `Abstract Space Riders NFT` is based off of.

#### TODO 
- [x] contract deployement 
- [x] full test coverage 
- [x] deployment scripts 
- [x] logging 
- [ ] working react front end (almost complete) 

## I. Technology Stack & Tools

- Solidity (Writing Smart Contract)
- [Hardhat](https://hardhat.org/) (using the [hardhat-toolbox](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox) plugin)
- React
- Ethers.js

## II. Requirements For Initial Setup
- Install current LTS for Node (preferrably using [NVM](https://github.com/nvm-sh/nvm))
- Install [Hardhat](https://hardhat.org/) with [hardhat-toolbox](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox)
- Optional: If using vscode install Solidity and Hardhat extensions

## III. Setting Up
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
Note: Everytime local hardhat node is deployed you need to re-deploy the contract (make sure you delete the folder located in [src/frontend/contractsData](./src/frontend/contractsData)
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

## IV. Other Useful Commands

### 1. Running Unit Tests
Run unit tests against hardhat: 
```bash
npx hardhat test 
# optinally this can be done in parallel
npx hardhat test --parallel
```

### 2. Etherscan Verficiation:
When deploying on chain you can optionally verify your contract using hardhat's etherscan verify plugin. Make sure you set your `ETHERSCAN_API_KEY` in the [.env](./.env) file (you can obtain an etherscan apikey by creating an account on etherscan). 

Note: Make sure you use constructor arguments that match your contracts constructor in both the .sol and  in deploy.js 
```bash
npx hardhat verify <YOUR_DEPLOYED_CONTRACT_ADDRESS> <OPTIONAL_CONSTRUCTOR_ARGS> --network sepolia
## Example Without consturctor args
## npx hardhat verify 0xb8090EeBe1fE886D8543dc933D6069ef717FA4B0 --network sepolia
## Example with constructor args
## npx hardhat verify --contract src/backend/contracts/AbstractSRNFT.sol:AbstractSRNFT 0xb8090EeBe1fE886D8543dc933D6069ef717FA4B0 0x07814fD88beA3167474A1761b8A923cb782B3715 --network sepolia
```

## V. Other Notes: 
If you get error rpc-internal on metamask or node an error that shows nonce too high you need to go to metamask and "Clear Recent Activities" to reset the nonce for that account.


License
----
MIT