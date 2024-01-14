import React from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';

const ContractAbiModal = ({ open, close, json }) => {
  return (
    <Modal open={open} onClose={close}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
      }}>
        <div style={{ flex: '1 1 auto' }}>
          <Typography variant="h6" component="h2">
            Contract ABI
          </Typography>
          <TextField
            multiline
            rows={35}
            variant="outlined"
            fullWidth
            value={json}
            sx={{
              flex: '1 1 auto', // Makes the TextField flexible
              '& .MuiInputBase-root': {
                padding: '25px',
                height: '100%', // TextField takes the full height
              },
              '& .MuiInputBase-inputMultiline': {
                height: '100%', // Ensures the inner part takes full height
              },
            }}
          />
        </div>
        <Button
          variant="contained"
          onClick={close}
          sx={{
            mt: 2,
            alignSelf: 'flex-end', // Aligns the button to the right
            backgroundColor: '#ba0000', // Sets the background color to red
            color: 'white', // Sets the text color to white
            ':hover': {
              backgroundColor: '#990000', // Optional: Changes color on hover for better UX
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};


export default ContractAbiModal;
