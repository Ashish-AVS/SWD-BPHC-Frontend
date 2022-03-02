import React from 'react'
import { Redirect } from 'react-router-dom'
import { saveAs } from 'file-saver'
import MaterialTable from 'material-table'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import VisibilityIcon from '@material-ui/icons/Visibility'
import GetAppIcon from '@material-ui/icons/GetApp'
import MuiAlert from '@material-ui/lab/Alert'

// Auth Components
import { useAuth } from 'context/auth'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { BaseUrl } from 'variables/BaseUrl'
import GoodieInfoModal from './GoodieInfoModal'
import {
  primaryColor,
  defaultFont
} from 'assets/jss/material-kit-react.js'

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  typo: {
    paddingLeft: '20%',
    marginBottom: '30px',
    position: 'relative'

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
    color: 'rgba(0, 0, 0, 0.26)',
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
  }
}
function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles(styles)

export default function GoodieExport () {
  const token = JSON.parse(localStorage.getItem('officialtokens'))

  // const [sendingData,setSendingData]=React.useState(false);
  const [goodieData, setGoodieData] = React.useState([])
  const [sendingData, setSendingData] = React.useState(false)
  // const [sendingData1,setSendingData1]=React.useState(false);
  const [goodieDetails, setGoodieDetails] = React.useState({})
  const [recievedData, setRecievedData] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const [success, setSuccess] = React.useState(false)
  const { onOfficialLogin } = useAuth()
  const classes = useStyles()
  const [err, setErr] = React.useState(false)
  const [errMsg, setErrMsg] = React.useState('')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setErr(false)
    setSuccess(false)
  }

  React.useEffect(() => {
    // setRecievedData(false);
    try {
      const SendData = async () => {
        const result = await fetch(`${BaseUrl}/api/o/goodies`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const res = await result.json()
        if (res.err === false) {
          setGoodieData(res.data.map((info, index) => {
            let gtype = null
            if (info.g_type === 0) {
              gtype = 'Shirt/Hoodie'
            } else if (info.g_type === 1) {
              gtype = 'Tickets'
            } else if (info.g_type === 2) {
              gtype = 'Fund Raiser'
            }
            return { sno: index + 1, g_name: info.g_name, g_host: info.g_host, gtype: gtype, g_id: info.g_id, g_type: info.g_type, h_name: info.host_name, h_mobile: info.host_mobile }
          }))
          // setRecievedData(true);
          // setSendingData(false);
        } else if (res.err === true && result.status === 401) {
          logout()
        } else if (res.err === true) {
          setErr(true)
          setErrMsg(res.msg)
        }
      }
      SendData()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const sendGoodieData = async (g_id, g_name) => {
    const result = await fetch(`${BaseUrl}/api/o/goodies/export?g_id=${g_id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'text/csv' }
    })
    const res = await result.text()
    if (result.status === 201 || result.status === 200 || result.status === 304) {
      const csvBlob = new Blob([res], { type: 'text/csv' })
      saveAs(csvBlob, `GoodieData-${g_name}.csv`)
      setSuccess(true)
    } else {
      setErr(true)
      setErrMsg('Error in Downloading!')
    }
  }
  const logout = () => {
    localStorage.removeItem('officialtokens')
    onOfficialLogin(false)
    return (<Redirect exact to='/' />)
  }
  return (
    <div>
      <div className={classes.typo} style={{ marginTop: '-50px' }}>
        <h2><strong>BITS PILANI , HYDERABAD CAMPUS</strong></h2>
      </div>
      <GridContainer justify='center' alignItems='center'>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}><b>GOODIES DATA</b></h4>
            </CardHeader>
            <MaterialTable
              title='GOODIE DATA'
              columns={[
                { title: 'S No.', field: 'sno' },
                { title: 'Goodie Name', field: 'g_name' },
                { title: 'Sold By', field: 'g_host' },
                { title: 'Goodie Type', field: 'gtype' }
              ]}
              data={goodieData}
              actions={[
                {
                  icon: () => <VisibilityIcon />,
                  // disabled:rowData.statusCode!==0,
                  tooltip: 'View Goodie Sales',
                  onClick: async (event, rowData) => {
                    setGoodieDetails({ g_id: rowData.g_id, g_type: rowData.g_type, h_name: rowData.h_name, h_mobile: rowData.h_mobile })
                    // console.log(goodieDetails);
                    setOpen(true)
                    setSendingData(true)
                  }

                },
                {
                  icon: () => <GetAppIcon />,
                  // disabled:rowData.statusCode!==0,
                  tooltip: 'Download CSV',
                  onClick: async (event, rowData) => {
                    sendGoodieData(rowData.g_id, rowData.g_name)
                  }

                }

              ]}

              options={{

                search: true,
                pageSize: 20,
                emptyRowsWhenPaging: false,
                actionsColumnIndex: -1
              }}
            />
          </Card>
        </GridItem>

      </GridContainer>
      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={success}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='success'
        >
          File Download completed
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={err}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity='error'
        >
          {errMsg}
        </Alert>
      </Snackbar>

      {sendingData
        ? <GoodieInfoModal
            open={open}
            setOpen={setOpen}
            goodieId={goodieDetails.g_id}
            goodieType={goodieDetails.g_type}
            hostname={goodieDetails.h_name}
            hostmobile={goodieDetails.h_mobile}
          />
        : null}
    </div>
  )
}
