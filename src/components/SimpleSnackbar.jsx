import React from 'react';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({duration, message, setEggsCompleted}) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;

    setOpen(false);

    if (setEggsCompleted != null)
      setEggsCompleted();
  };

  const action = ( 
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration != null ? duration : undefined}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}