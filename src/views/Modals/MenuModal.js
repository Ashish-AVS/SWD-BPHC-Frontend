import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

// Core Components
import Button from 'components/CustomButtons/Button.js'
import Table from 'components/Table/Table'

import styles from 'assets/jss/material-kit-react/modalStyle'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})
Transition.displayName = 'Transition'

export default function MenuModal ({ Mess, openMess, messMenu }) {
  const classes = useStyles()

  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      maxWidth='lg'
      fullWidth
      open={Mess}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => openMess(false)}
      aria-labelledby='classic-modal-slide-title'
      aria-describedby='classic-modal-slide-description'
    >
      <DialogTitle
        id='classic-modal-slide-title'
        disableTypography
        className={classes.modalHeader}
      >
        <IconButton
          className={classes.modalCloseButton}
          key='close'
          aria-label='Close'
          color='inherit'
          onClick={() => openMess(false)}
        >
          <Close className={classes.modalClose} />
        </IconButton>
        <h3 className={classes.modalTitle}><strong>Mess Menu</strong></h3>
      </DialogTitle>
      <DialogContent
        id='classic-modal-slide-description'
        className={classes.modalBody}
      >

        <Table
          tableHeaderColor='primary'
          tableHead={['Day', 'Breakfast', 'Lunch', 'Tiffin', 'Dinner']}
          tableData={messMenu}
        />

      </DialogContent>
      <DialogActions className={classes.modalFooter}>

        <Button
          onClick={() => openMess(false)}
          color='danger'
          simple
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>

  )
}
