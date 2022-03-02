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
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

// Core Components
import Button from 'components/CustomButtons/Button.js'

import { BaseUrl } from 'variables/BaseUrl'

import styles from 'assets/jss/material-kit-react/modalStyle'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

Transition.displayName = 'Transition'
export default function RemarkModal ({
  open,
  setOpen,
  setUpdated,
  data
}) {
  const classes = useStyles()
  const token = JSON.parse(localStorage.getItem('officialtokens'))
  const [loading, setLoading] = React.useState(false)
  const [sendingData, setSendingData] = React.useState(false)
  const [remark, setRemark] = React.useState('')

  React.useEffect(() => {
    if (sendingData === true) {
      try {
        const sendData = async () => {
          setLoading(true)
          const result = await fetch(`${BaseUrl}/api/o/saf/change`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              new_status: 0,
              remark: remark,
              uid: data.uid
            })
          })
          const res = await result.json()
          if (res.err === false) {
            setLoading(false)
            setUpdated(`${data.uid}-${remark}`)
            setOpen(false)
          } else if (res.err === false) {
            alert('Error in sending Request.Try Again')
          }
        }
        sendData()
        // console.log(totalQty);

        setSendingData(false)
      } catch (err) {
        console.log(err)
      }
    }
  }, [sendingData, token])

  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}

      fullWidth
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
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
          onClick={() => setOpen(false)}
        >
          <Close className={classes.modalClose} />
        </IconButton>
        <h3 className={classes.modalTitle}><strong>Give Remarks to the applicant</strong></h3>
      </DialogTitle>
      <DialogContent
        id='classic-modal-slide-description'
        className={classes.modalBody}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4>Applicant's Name:&nbsp;&nbsp;&nbsp;{data.name}</h4>
          <h4>Applicant's Uid:&nbsp;&nbsp;&nbsp;{data.uid}</h4>
          <TextField
            id='outlined-multiline-static'
            label='Remarks'
            multiline
            rows={4}
            defaultValue=''
            variant='outlined'
            value={remark}
            onChange={(e) => {
              setRemark(e.target.value)
            }}
          />
        </div>

      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        {loading ? <CircularProgress size={24} /> : null}
        <Button
          onClick={() => setSendingData(true)}
          color='info'
          solid='true'
          round
          disabled={loading}
        >
          Submit
        </Button>

        <Button
          onClick={() => {
            setOpen(false)
            setRemark('')
          }}
          color='danger'
          solid='true'
          round
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
