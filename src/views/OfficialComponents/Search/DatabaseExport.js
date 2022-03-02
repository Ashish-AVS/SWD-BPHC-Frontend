import React from 'react'
import { saveAs } from 'file-saver'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select'
import { CircularProgress } from '@material-ui/core'

// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'

import AlertComponent from 'components/Alert/Alert'

import {
  primaryColor,
  defaultFont
} from 'assets/jss/material-kit-react.js'
import { BaseUrl } from 'variables/BaseUrl'

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

const useStyles = makeStyles(styles)

export default function DatabaseExport () {
  const token = JSON.parse(localStorage.getItem('officialtokens'))
  const [data, setData] = React.useState([])
  const [sendingExportData, setSendingExportData] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const classes = useStyles()
  const [success, setSuccess] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [errMsg, setErrMsg] = React.useState('')
  const [batch, setBatch] = React.useState(null)

  React.useEffect(() => {
    if (sendingExportData === true) {
      setLoading(true)
      try {
        const SendData = async () => {
          const result = await fetch(`${BaseUrl}/api/o/search/export/${batch}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'text/csv'
            }
          })
          const res = await result.text()
          if (result.status === 201 || result.status === 200 || result.status === 304) {
            const csvBlob = new Blob([res], { type: 'text/csv' })
            saveAs(csvBlob, 'Database.csv')
            setSuccess(true)
          } else {
            setErr(true)
            setErrMsg('Error in Downloading!')
          }
          setLoading(false)
        }
        SendData()
        setSendingExportData(false)
      } catch (err) {
        console.log(err)
      }
    }
  })
  return (
    <div>
      <Card>
        <CardHeader color='primary'>
          <h4 className={classes.cardTitleWhite}><b>STUDENT DATABASE DOWNLOAD</b></h4>
        </CardHeader>
        <CardBody>
          <GridContainer spacing={4} justify='center' alignItems='center'>
            <GridItem xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Batch</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Batch'
                  disabled={loading}
                  value={batch}
                  onChange={(e) => {
                    setBatch(e.target.value)
                  }}
                >
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2017}>2017</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <div style={{ display: 'flex' }}>
                <Button color='success' round disabled={loading} onClick={() => { setSendingExportData(true) }}>
                  Download DB
                </Button>
                {loading
                  ? <CircularProgress size={20} style={{ marginTop: '15px' }} />
                  : null}
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
      <AlertComponent
        type='success'
        isOpen={success}
        handleClose={() => setSuccess(false)}
        msg='File downloaded successfully'
      />
      <AlertComponent
        type='error'
        isOpen={err}
        handleClose={() => setErr(false)}
        msg={errMsg}
      />
    </div>
  )
}
