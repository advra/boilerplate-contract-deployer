import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Button, TextField, Modal, Box, Typography, Tooltip, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AbstractSRNFTAbi from '../contractsData/AbstractSRNFT.json'
import AbstractSRNFTeAddress from '../contractsData/AbstractSRNFT-address.json'
// components
import ContractAbiModal from './ContractAbiModal';
import NavigationBar from './NavigationBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [account, setAccount] = useState(null)
  const [open, setOpen] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [nftContract, setNftContract] = useState({});
  const [contractAddress, setContractAddress] = useState('');
  const [contractAbi, setContractAbi] = useState(JSON.stringify({}, null, 2));
  // const contractAddress = "0x82374987423"; // Replace with actual contract address

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMint = async () => {
    try {
      // Call mint function here
      // const amount = ethers.utils.BigNumber.from(mintAmount);
      const tx = await nftContract.mint(mintAmount);
      const receipt = await tx.wait(); // Wait for the transaction to be mined
      console.log('Transaction receipt:', receipt);
      if (receipt.status === 1) {
        console.log(`Minting ${mintAmount} tokens was successful`);
      } else {
        console.error('Transaction failed: Transaction was reverted.');
      }
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };
  

  const incrementMintAmount = () => setMintAmount(mintAmount + 1);
  const decrementMintAmount = () => mintAmount > 1 && setMintAmount(mintAmount - 1);

  // // Dummy ABI data
  // const abiData = JSON.stringify(MarketplaceAbi.abi, null, 2);
  useEffect(() => {
    setContractAddress(AbstractSRNFTeAddress.address);
    setContractAbi(JSON.stringify(AbstractSRNFTAbi.abi, null, 2));

  }, []); // Empty dependency array to ensure this effect runs only once on mount

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      provider = ethers.getDefaultProvider()
    } else {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum)
  
      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();
  }

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })

    loadContracts(signer)
  }

  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const nft = new ethers.Contract(AbstractSRNFTeAddress.address, AbstractSRNFTAbi.abi, signer)
    setNftContract(nft)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavigationBar web3Handler={web3Handler} account={account}/>
      <div className="App" style={{ 
          textAlign: 'center', 
          maxWidth: 650, 
          height: 'calc(100vh - 56px)',
          margin: 'auto', 
          paddingTop:'10vh' 
      }}>
        <Typography variant="h4">
          Boilerplate Contract Deployer
        </Typography>
        <Box
          marginTop={8}
          marginBottom={2}
          display="flex"
          alignItems="center" // Align items vertically
          gap={1} // Spacing between items
        >
          <Typography variant='h6'>Contract:</Typography>
          <TextField
            value={contractAddress}
            InputProps={{ readOnly: true }}
            variant="outlined"
            style={{ 
              marginRight: 8,
              width: '100%',
            }}
          />
          <Button 
            style={{ 
              height: '55px',
              width: '150px',
            }}
            variant="outlined" 
            onClick={handleOpen}>
              Check ABI
          </Button>
        </Box>
        <Box>
            <IconButton onClick={decrementMintAmount} disabled={mintAmount <= 0}>
              <RemoveIcon />
              </IconButton>
          <TextField
            value={mintAmount}
            InputProps={{ readOnly: true }}
            style={{ width: 50, textAlign: 'center' }}
          />
          <IconButton onClick={incrementMintAmount}>
            <AddIcon />
          </IconButton>
        </Box>
        <Tooltip title={!account || account.length === 0 ? "Connect Wallet to Mint" : "Mint Token"}>
          <Button
            variant="contained"
            onClick={handleMint}
            disabled={!account || account.length === 0} // Disable if accounts is falsy or empty
            sx={{
              mt: 2,
              alignSelf: 'flex-end', // Aligns the button to the right
              backgroundColor: '#0a2bc0', // Sets the background color
              color: '#ffffff', // Sets the text color to white
              ':hover': {
                backgroundColor: '#2e46ad', // Optional: Changes color on hover for better UX
              },
            }}
          >
            Mint
          </Button>
        </Tooltip>
        <ContractAbiModal open={open} close={handleClose} json={contractAbi} />
      </div>
    </ThemeProvider>
  );
}

export default App;