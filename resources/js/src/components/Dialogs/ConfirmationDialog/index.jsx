import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
} from '@mui/material';

const ConfirmationDialog = ({ open, title, description, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle>
        { title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          { description }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Não</Button>
        <Button onClick={onConfirm} autoFocus>Sim</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;