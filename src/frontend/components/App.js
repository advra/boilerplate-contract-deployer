import React, { useState, useEffect } from 'react';
import { Button, TextField, Modal, Box, Typography, IconButton } from '@mui/material';
import ContractAbiModal from './ContractAbiModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AbstractSRNFTAbi from '../contractsData/AbstractSRNFT.json'
import AbstractSRNFTeAddress from '../contractsData/AbstractSRNFT-address.json'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [contractAddress, setContractAddress] = useState('');
  const [contractAbi, setContractAbi] = useState(JSON.stringify({}, null, 2));
  // const contractAddress = "0x82374987423"; // Replace with actual contract address

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMint = () => {
    // Call mint function here
    console.log(`Minting ${mintAmount} tokens`);
    
  };

  const incrementMintAmount = () => setMintAmount(mintAmount + 1);
  const decrementMintAmount = () => mintAmount > 0 && setMintAmount(mintAmount - 1);

  // // Dummy ABI data
  // const abiData = JSON.stringify(MarketplaceAbi.abi, null, 2);
  useEffect(() => {
    setContractAddress(AbstractSRNFTeAddress.address);
    setContractAbi(JSON.stringify(AbstractSRNFTAbi.abi, null, 2));

  }, []); // Empty dependency array to ensure this effect runs only once on mount

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App" style={{ 
            textAlign: 'center', 
            maxWidth: 650, 
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
        <Button
          variant="contained"
          onClick={handleMint}
          sx={{
            mt: 2,
            alignSelf: 'flex-end', // Aligns the button to the right
            backgroundColor: '#0a2bc0', // Sets the background color to red
            color: '#ffffff', // Sets the text color to white
            ':hover': {
              backgroundColor: '#2e46ad', // Optional: Changes color on hover for better UX
            },
          }}
        >
          Mint
        </Button>
        <ContractAbiModal open={open} close={handleClose} json={contractAbi} />
      </div>
    </ThemeProvider>
  );
}

export default App;