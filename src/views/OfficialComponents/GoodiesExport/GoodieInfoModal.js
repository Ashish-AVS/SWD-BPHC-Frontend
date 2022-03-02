import React from 'react'
import { Redirect } from 'react-router-dom'
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

// Auth Components
import { useAuth } from 'context/auth'

import { BaseUrl } from 'variables/BaseUrl'

import styles from 'assets/jss/material-kit-react/modalStyle'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})

Transition.displayName = 'Transition'
export default function CancelModal ({
  open,
  setOpen,
  goodieId,
  goodieType,
  hostname,
  hostmobile

}) {
  const classes = useStyles()

  // const {uid}=JSON.parse(localStorage.getItem("data"));

  const token = JSON.parse(localStorage.getItem('officialtokens'))
  const [goodieDetails, setGoodieDetails] = React.useState({})
  const [recievedData, setRecievedData] = React.useState(false)
  const { onOfficialLogin } = useAuth()

  React.useEffect(() => {
    setRecievedData(false)

    try {
      const sendData = async () => {
        const result = await fetch(`${BaseUrl}/api/o/goodies/info?g_id=${goodieId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const res = await result.json()
        if (res.err === false) {
          setGoodieDetails(res.data)
          setRecievedData(true)
        } else if (res.err === true && result.status === 401) {
          logout()
        }
      }

      sendData()
      // console.log(totalQty);
    } catch (err) {
      console.log(err)
    }
  }, [token, goodieId])

  const logout = () => {
    localStorage.removeItem('officialtokens')

    onOfficialLogin(false)
    return (<Redirect exact to='/login-page' />)
  }

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
        <h3 className={classes.modalTitle}><strong>Goodie Sales Detail</strong></h3>
      </DialogTitle>
      <DialogContent
        id='classic-modal-slide-description'
        className={classes.modalBody}
      >
        <div>
          <h4>Here is the sales detail of your goodie till now:</h4>
          <br />

          {goodieType === 0 && recievedData === true
            ? <div>
              <h5>Host Name- {hostname}</h5>
              <h5>Host Mobile No.- {hostmobile}</h5>
              <p>XS- {goodieDetails.xs}</p>
              <p>S- {goodieDetails.s}</p>
              <p>M- {goodieDetails.m}</p>
              <p>L- {goodieDetails.l}</p>
              <p>XL- {goodieDetails.xl}</p>
              <p>XXL- {goodieDetails.xxl}</p>
              <p>XXXL- {goodieDetails.xxxl}</p>
              <h5>Net Quantity Ordered- {goodieDetails.net_quantity}</h5>
              <h5>Net Amount - ₹ {goodieDetails.total_amount}</h5>
            </div>
            : goodieType === 1 && recievedData === true
              ? <div>
                <h5>Host Name- {hostname}</h5>
                <h5>Host Mobile No.- {hostmobile}</h5>
                <h5>Quantity Ordered- {goodieDetails.net_quantity} </h5>
                <h5>Net Amount - ₹ {goodieDetails.total_amount}</h5>
              </div>
              : goodieType === 2 && recievedData === true
                ? <div>
                  <h5>Host Name- {hostname}</h5>
                  <h5>Host Mobile No.- {hostmobile}</h5>
                  <h5>Net Amount Raised- ₹{goodieDetails.total_amount}</h5>
                </div>
                : <p>Loading Information...</p>}

        </div>

      </DialogContent>
      <DialogActions className={classes.modalFooter}>

        <Button
          onClick={() => setOpen(false)}
          color='danger'
          solid='true'
          round
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
