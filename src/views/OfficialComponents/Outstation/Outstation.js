import React from 'react'
import MaterialTable from 'material-table'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'

import CustomTabs from 'components/CustomTabs/EditedTabs.js'
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
function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles(styles)

export default function Outstation () {
  const classes = useStyles()
  const token = JSON.parse(localStorage.getItem('officialtokens'))
  const [data0, setData0] = React.useState([])
  const [data1, setData1] = React.useState([])
  const [data2, setData2] = React.useState([])
  const [status, setStatus] = React.useState(0)
  const [dataSent, setDataSent] = React.useState(false)
  // const [loading,setLoading]=React.useState(false)
  // const [outData,setOutData]=React.useState({
  //  outstation_id:null,
  // new_status:null
  // })
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  React.useEffect(() => {
    try {
      if (status == 0) {
        const fetchData0 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/outstation/?status=0`, {
            headers: { Authorization: `Bearer ${token}` }

          })
          const res = await result.json()
          if (res.err === false) {
            setData0(
              res.data.map((info, index) => {
                return { sno: index + 1, uid: info.uid, outstation_id: info.outstation_id, location: info.location, from: info.from, to: info.to, reason: info.reason }
              })
            )
          }
        }
        fetchData0()
      }
      if (status === 1) {
        const fetchData1 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/outstation/?status=1`, {
            headers: { Authorization: `Bearer ${token}` }

          })
          const res = await result.json()
          if (res.err === false) {
            setData1(
              res.data.map((info, index) => {
                return { sno: index + 1, uid: info.uid, outstation_id: info.outstation_id, location: info.location, from: info.from, to: info.to, reason: info.reason }
              })
            )
          }
        }
        fetchData1()
      }
      if (status === -1) {
        const fetchData2 = async () => {
          const result = await fetch(`${BaseUrl}/api/o/outstation/?status=-1`, {
            headers: { Authorization: `Bearer ${token}` }

          })
          const res = await result.json()
          if (res.err === false) {
            setData2(
              res.data.map((info, index) => {
                return { sno: index + 1, uid: info.uid, outstation_id: info.outstation_id, location: info.location, from: info.from, to: info.to, reason: info.reason }
              })

            )
          } else if (result.status === 400) {
            alert('task not completed')
          } else if (result.status === 401) {
            alert('Session timed out. Login again')
          }
        }
        fetchData2()
      }
    } catch (err) {
      console.log(err)
    }
  }, [status, token, dataSent])

  const sendData = async (id, sta) => {
    const result = await fetch(`${BaseUrl}/api/o/outstation`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        outstation_id: id,
        new_status: sta
      })
    })
    const res = await result.json()
    if (result.status === 200 || result.status === 201 || result.status === 304) {
      setDataSent(`sent-${id}-${sta}`)
      setTimeout(() => {
        handleClick()
      }, 1000)
    } else if (res.err === false) {
      alert('error')
    } else if (result.status === 422) {
      alert('another error')
    } else if (result.status === 500) {
      alert('Server Error Contact SWD Nucleus')
    }
  }

  return (
    <div>
      <div className={classes.typo} style={{ marginTop: '-50px' }}>
        <h2><strong>BITS-PILANI,HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer direction='column' justify='center' alignItems='center'>
        <GridItem xs={12} sm={12} md={11}>
          <CustomTabs
            setStatus={setStatus}
            headerColor='primary'
            tabs={[
              {
                tabName: 'Pending',

                tabContent: (
                  <MaterialTable
                    title='PENDING OUTSTATION REQUESTS'
                    columns={[
                      { title: 'S No.', field: 'sno' },
                      { title: 'Student ID', field: 'uid' },
                      { title: 'Travelling To', field: 'location' },
                      { title: 'From Date', field: 'from' },
                      { title: 'To Date', field: 'to' },
                      { title: 'Reason', field: 'reason' }
                    ]}
                    data={data0}
                    actions={[
                      {
                        icon: 'check',
                        tooltip: 'Approve',
                        onClick: async (event, rowData) => {
                          sendData(rowData.outstation_id, 1)
                        }

                      },
                      {
                        icon: 'close',
                        tooltip: 'Reject',
                        onClick: async (event, rowData) => {
                          sendData(rowData.outstation_id, -1)
                        }
                      }
                    ]}

                    options={{

                      search: true,
                      pageSize: 10,
                      emptyRowsWhenPaging: false
                    }}
                  />
                )
              },
              {
                tabName: 'Approved',

                tabContent: (
                  <MaterialTable
                    title='APPROVED OUTSTATION REQUESTS'
                    columns={[
                      { title: 'S No.', field: 'sno' },
                      { title: 'Student ID', field: 'uid' },
                      { title: 'Travelling To', field: 'location' },
                      { title: 'From Date', field: 'from' },
                      { title: 'To Date', field: 'to' },
                      { title: 'Reason', field: 'reason' }
                    ]}
                    data={data1}
                    actions={[

                      {
                        icon: 'close',
                        tooltip: 'Reject',
                        onClick: async (event, rowData) => {
                          sendData(rowData.outstation_id, -1)
                        }
                      }
                    ]}

                    options={{

                      search: true,
                      pageSize: 10,
                      emptyRowsWhenPaging: false
                    }}
                  />
                )
              },
              {
                tabName: 'Rejected',

                tabContent: (
                  <MaterialTable
                    title='REJECTED OUTSTATION REQUESTS'
                    columns={[
                      { title: 'S No.', field: 'sno' },
                      { title: 'Student ID', field: 'uid' },
                      { title: 'Travelling To', field: 'location' },
                      { title: 'From Date', field: 'from' },
                      { title: 'To Date', field: 'to' },
                      { title: 'Reason', field: 'reason' }
                    ]}
                    data={data2}
                    actions={[
                      {
                        icon: 'check',
                        tooltip: 'Approve',
                        onClick: async (event, rowData) => {
                          sendData(rowData.outstation_id, 1)
                        }
                      }
                    ]}

                    options={{

                      search: true,
                      pageSize: 10,
                      emptyRowsWhenPaging: false
                    }}
                  />
                )
              }
            ]}
          />
          <Snackbar
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity='success'
            >
              Task Completed SuccessFully
            </Alert>
          </Snackbar>
        </GridItem>
      </GridContainer>

    </div>
  )
}
