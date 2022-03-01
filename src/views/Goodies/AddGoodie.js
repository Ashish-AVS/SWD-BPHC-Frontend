import React from 'react'
import Datetime from 'react-datetime'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'
import { BaseUrl } from 'variables/BaseUrl'
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
    paddingLeft: '25%',
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
  }
}
const useStyles = makeStyles(styles)

function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function AddGoodie ({ setVisible, setIsUpdated }) {
  const classes = useStyles()
  const yesterday = Datetime.moment().subtract(1, 'day')
  const token = JSON.parse(localStorage.getItem('tokens'))
  const [sendingData, setSendingData] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [err, setErr] = React.useState(false)
  const [errMsg, setErrMsg] = React.useState('')
  // const [loading,setLoading]=React.useState(false);
  const [goodieAddData, setGoodieAddData] = React.useState({
    g_type: '',
    g_name: '',
    g_host: '',
    g_img: '',
    g_price: '',
    min_amount: '',
    max_amount: '',
    limit: '',
    closing_time: '',
    host_name: '',
    host_id: '',
    host_mobile: '',
    xs: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0,
    xxxl: 0
  })

  const valid = function (current) {
    return current.isAfter(yesterday)
  }
  React.useEffect(() => {
    if (sendingData === true) {
      try {
        const sendData = async () => {
          const result = await fetch(`${BaseUrl}/api/goodies/add`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify({
              g_type: goodieAddData.g_type,
              g_name: goodieAddData.g_name,
              g_host: goodieAddData.g_host,
              g_img: goodieAddData.g_img,
              g_price: goodieAddData.g_price,
              min_amount: goodieAddData.min_amount,
              max_amount: goodieAddData.max_amount,
              limit: goodieAddData.limit,
              closing_time: goodieAddData.closing_time,
              host_name: goodieAddData.host_name,
              host_id: goodieAddData.host_id,
              host_mobile: goodieAddData.host_mobile,
              xs: goodieAddData.xs,
              s: goodieAddData.s,
              m: goodieAddData.m,
              l: goodieAddData.l,
              xl: goodieAddData.xl,
              xxl: goodieAddData.xxl,
              xxxl: goodieAddData.xxxl
            })
          })
          const res = await result.json()
          if (res.err === false) {
            setSendingData(false)
            setIsUpdated(`added ${goodieAddData.g_name}`)
            setSuccess(true)
          } else if (res.err === true) {
            setErr(true)
            setErrMsg(res.msg)
            setSendingData(false)
            setGoodieAddData({
              g_type: '',
              g_name: '',
              g_host: '',
              g_img: '',
              g_price: '',
              min_amount: '',
              max_amount: '',
              limit: '',
              closing_time: '',
              host_name: '',
              host_id: '',
              host_mobile: '',
              xs: 0,
              s: 0,
              m: 0,
              l: 0,
              xl: 0,
              xxl: 0,
              xxxl: 0
            })
          }
        }
        sendData()
      } catch (err) {
        console.log(err)
      }
    }
  }, [sendingData])

  function onChange (e) {
    const { name, value } = e.target
    setGoodieAddData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  function onCheckChange (e) {
    const { name, checked } = e.target
    if (checked === true) {
      setGoodieAddData(prevState => ({
        ...prevState,
        [name]: 1
      }))
    } else {
      setGoodieAddData(prevState => ({
        ...prevState,
        [name]: 0
      }))
    }
  }
  async function onImgChange (e) {
    const file = e.target.files[0]
    if (file !== undefined) {
      const base64 = await convertTobase64(file)
      setGoodieAddData(prevState => ({
        ...prevState,
        g_img: base64
      }))
    }
  }
  function convertTobase64 (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (

    <GridContainer justify='center' alignItems='center'>
      <GridItem xs={12} sm={12} md={11}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}><b>ADD NEW GOODIE</b></h4>

          </CardHeader>
          <CardBody>
            <h5 style={{ display: 'flex', justifyContent: 'center' }}><b>GOODIE INFORMATION</b></h5>
            <GridContainer justify='center' alignItems='center'>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText='Goodie Name'
                  onChange={onChange}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: goodieAddData.g_name,
                    name: 'g_name'
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.labelRoot}>Goodie Type</InputLabel>
                  <Select
                    name='g_type'
                    className={classes.input + ' ' + classes.underline}
                    onChange={onChange}
                    value={goodieAddData.g_type}
                  >
                    <MenuItem value=''>Select Type</MenuItem>
                    <MenuItem value={0}>T-Shirt/Hoodie</MenuItem>
                    <MenuItem value={1}>Ticket</MenuItem>
                    <MenuItem value={2}>Fund Raiser</MenuItem>

                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={10}>
                <CustomInput
                  labelText='Goodie Host Organisation'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'g_host',
                    value: goodieAddData.g_host
                  }}
                  onChange={onChange}
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={5}>
                <InputLabel className={classes.label}>
                  Goodie Image
                </InputLabel>
                <input name='g_img' type='file' style={{ marginTop: '10px' }} onChange={onImgChange} />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText='Goodie Price(in ₹)'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'g_price',
                    type: 'number',
                    value: goodieAddData.g_price
                  }}
                  onChange={onChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText='Host UID'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'host_id',
                    value: goodieAddData.host_id
                  }}
                  onChange={onChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Hosting Person's Name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'host_name',
                    value: goodieAddData.host_name
                  }}
                  onChange={onChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Hosting Person's Phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'host_mobile',
                    value: goodieAddData.host_mobile

                  }}
                  onChange={onChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Closing Date And Time
                  </InputLabel>
                  <Datetime
                    dateFormat='DD-MM-YYYY'
                    timeFormat='HH:mm'
                    className={classes.input + ' ' + classes.underline}
                    isValidDate={valid}
                    defaultValue={new Date()}
                    onChange={(e) => {
                      const date = new Date(`${e}`)
                      console.log(date)
                      setGoodieAddData(prevState => ({
                        ...prevState,
                        closing_time: date.getTime()
                      }))
                    }}
                  />
                </FormControl>

              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText='Limit'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'limit',
                    type: 'number',
                    value: goodieAddData.limit
                  }}
                  onChange={onChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText='Minimum Amount'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'min_amount',
                    type: 'number',
                    value: goodieAddData.min_amount
                  }}
                  onChange={onChange}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText='Maximum Amount'
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: 'max_amount',
                    type: 'number',
                    value: goodieAddData.max_amount
                  }}
                  onChange={onChange}
                />
              </GridItem>
              {goodieAddData.g_type === 0
                ? <GridItem xs={12} sm={12} md={10}>
                  <h6 style={{ display: 'flex', justifyContent: 'center' }}><b>AVAILABLE SIZES</b></h6>
                  <FormGroup aria-label='position' row style={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControlLabel

                    // checked={goodieAddData.xs}
                      control={<Checkbox color='primary' />}
                      label='XS'
                      name='xs'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                    <FormControlLabel
                      checked={goodieAddData.s}
                      control={<Checkbox color='primary' />}
                      label='S'
                      name='s'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                    <FormControlLabel
                      checked={goodieAddData.m}
                      control={<Checkbox color='primary' />}
                      label='M'
                      name='m'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                    <FormControlLabel
                      checked={goodieAddData.l}
                      control={<Checkbox color='primary' />}
                      label='L'
                      name='l'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                    <FormControlLabel
                      checked={goodieAddData.xl}
                      control={<Checkbox color='primary' />}
                      label='XL'
                      name='xl'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                    <FormControlLabel
                      checked={goodieAddData.xxl}
                      control={<Checkbox color='primary' />}
                      label='XXL'
                      name='xxl'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                    <FormControlLabel
                      checked={goodieAddData.xxxl}
                      control={<Checkbox color='primary' />}
                      label='XXXL'
                      name='xxxl'
                      onChange={onCheckChange}
                      labelPlacement='end'
                    />
                  </FormGroup>
                  </GridItem>
                : null}
            </GridContainer>
          </CardBody>
          <CardFooter style={{ display: 'flex', justifyContent: 'center' }}>
            <GridContainer>
              <GridItem>
                <Button color='success' disabled={sendingData} onClick={() => { setSendingData(true) }}>Submit</Button>
              </GridItem>
              <GridItem>
                <Button
                  color='danger'
                  onClick={() => {
                    setVisible(false)
                    setGoodieAddData({
                      g_type: '',
                      g_name: '',
                      g_host: '',
                      g_img: '',
                      g_price: '',
                      min_amount: '',
                      max_amount: '',
                      limit: '',
                      closing_time: '',
                      host_name: '',
                      host_id: '',
                      host_mobile: '',
                      xs: 0,
                      s: 0,
                      m: 0,
                      l: 0,
                      xl: 0,
                      xxl: 0,
                      xxxl: 0
                    })
                  }}
                >
                  Close
                </Button>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </GridItem>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={success}
        autoHideDuration={5000}
        onClose={() => { setSuccess(false) }}
      >
        <Alert
          onClose={() => { setSuccess(false) }}
          severity='success'
        >
          Goodie Added Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        open={err}
        autoHideDuration={5000}
        onClose={() => { setErr(false) }}
      >
        <Alert
          onClose={() => { setErr(false) }}
          severity='error'
        >
          {errMsg}
        </Alert>
      </Snackbar>

    </GridContainer>

  )
}
