// import React, { useState, useEffect } from 'react';
// import './App.css';

// import AbstractSRNFTAbi from '../contractsData/AbstractSRNFT.json'
// import AbstractSRNFTeAddress from '../contractsData/AbstractSRNFT-address.json'

// function App() {
//   const [contractAddress, setContractAddress] = useState('');
//   // const [contractABI, setContractABI] = useState([]);

//   useEffect(() => {

//     setContractAddress(AbstractSRNFTeAddress.address);


//     // If you need to fetch the ABI as well, you can add another fetch call here

//   }, []); // Empty dependency array to ensure this effect runs only once on mount

//   return (
//     <div className="App">
//       <div>Boilerplate Contract Deployer</div>
//       <div>This is a minimal web example:</div>
//       <div>Contract Address: {contractAddress} </div>
//       {/* <div>Contract ABI: {JSON.stringify(contractABI, null, 2)} </div> */}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Button, TextField, Modal, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AbstractSRNFTAbi from '../contractsData/AbstractSRNFT.json'
import AbstractSRNFTeAddress from '../contractsData/AbstractSRNFT-address.json'

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    maxHeight: '80vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'hidden' // This ensures that any overflow is within the TextField
  };

  // // Dummy ABI data
  // const abiData = JSON.stringify(MarketplaceAbi.abi, null, 2);
  useEffect(() => {
    setContractAddress(AbstractSRNFTeAddress.address);
    setContractAbi(JSON.stringify(AbstractSRNFTAbi.abi, null, 2));

  }, []); // Empty dependency array to ensure this effect runs only once on mount

    return (
      <div className="App" style={{ 
          textAlign: 'center', 
          maxWidth: 550, 
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
          <Typography variant='h6'>Contract Deployed:</Typography>
          <TextField
            value={contractAddress}
            InputProps={{ readOnly: true }}
            variant="outlined"
            style={{ marginRight: 8 }}
          />
          <Button 
          style={{ height: '55px' }}
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
        size="large"
        variant="contained" 
        color="primary" 
        onClick={handleMint} 
        style={{ marginTop: 16 }}>
        Mint
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Contract ABI
          </Typography>
          <TextField
            id="modal-description"
            multiline
            fullWidth
            label="JSON Preview"
            value={contractAbi}
            InputProps={{ readOnly: true }}
            variant="outlined"
            margin="normal"
            sx={{
              height: '500px', // Subtract the padding from the height
               // Re-enable vertical scrolling
              '&& .MuiInputBase-inputMultiline': {
                padding: '10px', // Padding inside the TextField
                // overflowY: 'auto',
              }
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default App;