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
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'

// Core Components
import Button from 'components/CustomButtons/Button.js'
import Table from 'components/Table/Table'

import styles from 'assets/jss/material-kit-react/modalStyle'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})
Transition.displayName = 'Transition'

export default function MenuModal ({ open, setOpen, data, setRecievedDetailsData }) {
  const classes = useStyles()
  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      fullScreen
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen(false)
        setRecievedDetailsData(false)
      }}
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
          onClick={() => {
            setOpen(false)
            setRecievedDetailsData(false)
          }}
        >
          <Close className={classes.modalClose} />
        </IconButton>
        <h3 className={classes.modalTitle}><strong>Student Details</strong></h3>
      </DialogTitle>
      <DialogContent
        id='classic-modal-slide-description'
        className={classes.modalBody}
      >
        <h3><b>BASIC DETAILS</b></h3>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Name'
              id='name'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.name,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Room No.'
              id='room'

              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.room,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Phone No.'
              id='phone'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.phone,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='ID'
              id='myid'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.id,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Birth-Day'

              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.dob,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Gender'

              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.gender,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Aadhaar Card No.'
              id='aadhar'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.aadhaar,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='PAN Card No.'
              id='pan'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.pan, disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Category'
              id='category'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.pan_card, disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Personal Mail'
              id='mail'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'email',
                defaultValue: data.general.email,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='BITSmail'
              id='bitsmail'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'email',
                defaultValue: `${data.general.uid}@hyderabad.bits-pilani.ac.in`,
                disabled: true
              }}
            />
          </GridItem>
        </GridContainer>
        <h3><b>MEDICAL DETAILS</b></h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Blood Group'
              id='bloodgroup'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: 'email',
                defaultValue: data.general.blood,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Medical History'
              id='medHistory'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                defaultValue: data.general.med_history,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Current Medication'
              id='CurrMed'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                defaultValue: data.general.current_med,
                disabled: true
              }}
            />
          </GridItem>
        </GridContainer>
        <h3><b>ADDRESS</b></h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <CustomInput
              labelText='Address'
              id='Address'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                defaultValue: data.general.homeadd,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='City/Town'
              id='city'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.city,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='State'
              id='state'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.state,
                disabled: true
              }}
            />
          </GridItem>

        </GridContainer>
        <h3><b>BANK ACCOUNT DETAILS</b></h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Account Number'
              id='accno'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.name,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='Bank Name'
              id='bankname'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.bank,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText='IFSC Code'
              id='ifscCode'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: 'IFSC -XXXXX',
                disabled: true
              }}
            />
          </GridItem>

        </GridContainer>
        <h3><b>LOCAL GUARDIAN'S DETAILS</b></h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Name'
              id='locname'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.guardian,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Phone No.'
              id='locphno'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.gphone,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <CustomInput
              labelText='Address'
              id='Address'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                multiline: true,
                defaultValue: data.general.locadd,
                disabled: true
              }}
            />
          </GridItem>
        </GridContainer>
        <h3><b>OTHER DETAILS</b></h3>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Father's Name"
              id='paname'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.father,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Father's Phone No."
              id='paphno'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.fphone,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <CustomInput
              labelText="Father's Email"
              id='pamail'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.fmail,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Father's Occupation"
              id='paocc'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.foccup,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Father's Company"
              id='pacomp'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.fcomp,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Father's Designation"
              id='padesg'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.fdesg,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Mother's Name"
              id='maname'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.mother,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Mother's Phone No."
              id='maphno'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.mphone,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <CustomInput
              labelText="Mothers's Email"
              id='mamail'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.mmail,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Mother's Occupation"
              id='maocc'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.moccup,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Mother's Company"
              id='macomp'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.mcomp,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Mother's Designation"
              id='madesg'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.mdesg,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Family Income'
              id='madesg'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.income,
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText='Nationality'
              id='nationality'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                defaultValue: data.general.nation,
                disabled: true
              }}
            />
          </GridItem>
        </GridContainer>

      </DialogContent>
      <DialogActions className={classes.modalFooter}>

        <Button
          onClick={() => {
            setOpen(false)
            setRecievedDetailsData(false)
          }}
          color='danger'

          solid='true'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>

  )
}
