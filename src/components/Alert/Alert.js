import React from 'react'

// @material-ui/core components
import Snackbar from '@material-ui/core/Snackbar'

// @material-ui/lab components
import MuiAlert from '@material-ui/lab/Alert'

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function AlertComponent ({
  isOpen,
  msg,
  handleClose,
  type
}) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  )
}
