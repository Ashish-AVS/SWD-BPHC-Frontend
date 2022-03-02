import React from 'react'
import MaterialTable from 'material-table'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
// core components
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import Check from '@material-ui/icons/Check'
// import CardFooter from "components/Card/CardFooter.js";
import Button from 'components/CustomButtons/Button.js'
import Badge from 'components/Badge/Badge.js'
import SnackbarContent from 'components/Snackbar/SnackbarContent.js'
import Clearfix from 'components/Clearfix/Clearfix.js'
import CancelBooking from './CancelBooking.js'

// Auth Components
import { useAuth } from 'context/auth'

import { BaseUrl } from 'variables/BaseUrl'
import {
  primaryColor,
  defaultFont
} from 'assets/jss/material-kit-react.js'
const styles = {
  typo: {
    paddingLeft: '25%',
    marginBottom: '40px',
    position: 'relative'
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: '10px',
    color: '#c0c1c2',
    display: 'block',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '13px',
    left: '0',
    marginLeft: '20px',
    position: 'absolute',
    width: '260px'
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  labelRoot: {
    ...defaultFont,
    color: '#AAAAAA !important',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.42857',
    top: '10px',
    letterSpacing: 'unset',
    '& + $underline': {
      marginTop: '0px'
    }
  },
  input: {
    color: '#495057',
    height: 'unset',
    '&,&::placeholder': {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400',
      lineHeight: '1.42857',
      opacity: '1'
    },
    '&::placeholder': {
      color: '#AAAAAA'
    }
  },
  formControl: {
    margin: '0 0 17px 0',
    paddingTop: '27px',
    position: 'relative',
    '& svg,& .fab,& .far,& .fal,& .fas,& .material-icons': {
      color: '#495057'
    }
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: '#D2D2D2 !important',
      borderWidth: '1px !important'
    },
    '&:after': {
      borderColor: primaryColor
    }
  },
  label: {
    color: 'rgba(0, 0, 0, 0.78)',
    top: '-17px',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: '400',
    paddingLeft: '0',
    letterSpacing: 'normal',
    '& + $underline': {
      marginTop: '0px'
    }
  }
}

const useStyles = makeStyles(styles)

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function Counsellor () {
  const classes = useStyles()
  const { onLogin } = useAuth()

  const { uid } = JSON.parse(localStorage.getItem('data'))
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [bookingsData, setBookingsData] = React.useState([])
  const [bookData, setBookData] = React.useState({ date: '', slot: '' })
  const [slotData, setSlotData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [reqSent, setReqSent] = React.useState(false)
  const [dateValues, setDateValues] = React.useState([])
  const [sendingData, setSendingData] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [cancelId, setCancelId] = React.useState(null)
  const [success, setSuccess] = React.useState(false)
  const [isUpdated, setIsUpdated] = React.useState(null)
  const [enabled, setEnabled] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [errMsg, setErrMsg] = React.useState('')
  const DateArray = []

  React.useEffect(() => {
    try {
      const fetchData0 = async () => {
        const result = await fetch(`${BaseUrl}/api/counsellor`, {
          headers: { Authorization: token }
        })
        const res = await result.json()
        if (res.err === false) {
          setSlotData(
            res.data.map((info) => {
              const hour = moment(info.slot, 'H').format('hh:mm a')
              const hour1 = moment(info.slot, 'H').add(1, 'h').format('hh:mm a')
              DateArray.push(info.date)
              return { date: info.date, slotTime: `${hour}-${hour1}`, slot: info.slot }
            })
          )
          setDateValues(removeDuplicates(DateArray))
        } else if (res.err === true && result.status === 401) {
          logout()
        } else if (res.err === true) {
          setErr(true)
          setErrMsg(res.msg)
        }
      }
      fetchData0()
    } catch (err) {
      console.log(err)
    }
  }, [])

  React.useEffect(() => {
    try {
      const fetchData1 = async () => {
        const result = await fetch(`${BaseUrl}/api/counsellor/bookings`, {
          headers: { Authorization: token }
        })
        const res = await result.json()
        if (res.err === false) {
          setBookingsData(
            res.data.map((info, index) => {
              const hour = moment(info.slot, 'H').format('hh:mm a')
              const hour1 = moment(info.slot, 'H').add(1, 'h').format('hh:mm a')
              return { sno: index + 1, bdate: info.date, btime: `${hour}-${hour1}`, booking_id: info.booking_id }
            })
          )
        } else if (res.err === true) {
          setErr(true)
          setErrMsg(res.msg)
        }
      }
      fetchData1()
    } catch (err) {
      console.log(err)
    }
  }, [token, reqSent, isUpdated])
  function removeDuplicates (array) {
    return [...new Set(array)]
  }
  React.useEffect(() => {
    if (sendingData === true) {
      setLoading(true)
      setReqSent(false)
      setErr(false)

      try {
        const sendData = async () => {
          const result = await fetch(`${BaseUrl}/api/counsellor`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify({
              date: bookData.date,
              slot: bookData.slot
            })
          })
          const res = await result.json()
          if (res.err === false) {
            setReqSent(true)
            setSuccess(true)
            setBookData({
              date: '',
              slot: ''
            })
            setSendingData(false)
            setLoading(false)
          } else if (res.err === true && result.status === 401) {
            logout()
          } else if (res.err === true && result.status === 422) {
            setErrMsg('Empty Fields Detected')
            setErr(true)
            setSendingData(false)
            setLoading(false)
          } else if (res.err === true) {
            setErrMsg(res.msg)
            setErr(true)
            setSendingData(false)
            setLoading(false)
          }
        }
        sendData()
      } catch (err) {
        console.log(err)
      }
    }
  }, [sendingData, uid, token])

  const logout = () => {
    localStorage.removeItem('tokens')
    localStorage.removeItem('data')
    onLogin(false)
    return (<Redirect exact to='/login-page' />)
  }

  function onDateChange (e) {
    const { value } = e.target
    setBookData({
      date: value,
      slot: ''
    })
    if (value !== '') { setEnabled(true) }
  }
  function onSlotChange (e) {
    const { value } = e.target
    setBookData(previosState => ({
      ...previosState,
      slot: value
    }))
    if (value !== 'select') { setEnabled(true) }
  }
  return (
    <div>
      <div className={classes.typo} style={{ marginTop: '-50px' }}>
        <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <GridContainer justify='center' alignItems='center'>
        <GridItem xs={12} sm={12} md={11}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}><b>COUNSELLOR BOOKING</b></h4>
            </CardHeader>
            <CardBody>

              <h3 style={{ display: 'flex', justifyContent: 'center' }}><b>BOOK AN APPOINTMENT</b></h3>
              <GridContainer justify='center' alignItems='center'>
                <GridItem xs={12} sm={12} md={5}>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel className={classes.labelRoot}>Select Date</InputLabel>
                    <Select
                      name='date'
                      className={classes.input + ' ' + classes.underline}
                      value={bookData.date}
                      onChange={onDateChange}
                    >
                      <MenuItem value=''>SELECT DATE</MenuItem>
                      {dateValues.map(item => {
                        return <MenuItem value={item}>{item}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <FormControl fullWidth className={classes.formControl} disabled={!enabled}>
                    <InputLabel className={classes.labelRoot}>Select Slot</InputLabel>
                    <Select
                      name='slot'
                      className={classes.input + ' ' + classes.underline}
                      value={bookData.slot}
                      onChange={onSlotChange}
                    >
                      <MenuItem value=''>Select</MenuItem>
                      {slotData.map(item => {
                        if (bookData.date === item.date) { return <MenuItem value={item.slot}>{item.slotTime}</MenuItem> }
                      })}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} md={5}>
                  <GridContainer direction='row' justify='center' alignItems='center'>
                    <GridItem>
                      <Button color='success' disabled={loading} onClick={() => { setSendingData(true) }}>Book Appointment</Button>
                      {loading ? <CircularProgress size={24} color='primary' /> : null}
                    </GridItem>
                  </GridContainer>
                </GridItem>

              </GridContainer>

            </CardBody>
            <CancelBooking open={open} setOpen={setOpen} cancelId={cancelId} setIsUpdated={setIsUpdated} />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={11}>
          <MaterialTable
            title='PREVIOUS BOOKED APPOINTMENTS'
            columns={[
              { title: 'S No.', field: 'sno' },
              { title: 'Booking Date', field: 'bdate' },
              { title: 'Booking Time', field: 'btime' }
            ]}
            data={bookingsData}
            options={{
              search: false,
              pageSize: 10,
              emptyRowsWhenPaging: false,
              actionsColumnIndex: -1
            }}
            actions={[
              rowData => ({
                icon: 'close',
                tooltip: 'Cancel Booking',
                onClick: (event, row) => {
                  setCancelId(row.booking_id)
                  setOpen(true)
                }
              })
            ]}
          />
        </GridItem>
      </GridContainer>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={err}
        autoHideDuration={4000}
        onClose={() => { setErr(false) }}
      >
        <Alert
          onClose={() => { setErr(false) }}
          severity='error'
        >
          {errMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={success}
        autoHideDuration={4000}
        onClose={() => { setSuccess(false) }}
      >
        <Alert
          onClose={() => { setSuccess(false) }}
          severity='success'
        >
          Appointment Booked!
        </Alert>
      </Snackbar>
    </div>
  )
}
