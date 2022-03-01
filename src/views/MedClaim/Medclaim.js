import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components

import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'
import Button from 'components/CustomButtons/Button.js'
import { BaseUrl } from 'variables/BaseUrl'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'

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
  }
}

const useStyles = makeStyles(styles)

export default function Medclaim () {
  const [medData, setMedData] = React.useState({
    member_id: '',
    username: '',
    password: '',
    card: ''
  })
  const classes = useStyles()
  const token = JSON.parse(localStorage.getItem('tokens'))

  React.useEffect(() => {
    try {
      const fetchData1 = async () => {
        const result = await fetch(`${BaseUrl}/api/ll/insurance`, {
          headers: { Authorization: token }
        })
        const res = await result.json()
        if (res.err === false) {
          setMedData(res.data)
        } else if (res.err === true) {
          alert(res.msg)
        }
      }
      fetchData1()
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <div>
      <div className={classes.typo} style={{ marginTop: '-50px' }}>
        <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <Card>
        <CardHeader color='success'>
          <h4 className={classes.cardTitleWhite}><b>MEDICAL INSURANCE DETAILS</b></h4>

        </CardHeader>
        <CardBody>
          <h3 style={{ display: 'flex', justifyContent: 'center' }}><b>POLICY DETAILS OF INSTITUTE</b></h3>
          <p><b>Policy Number:</b> 81-21-00436-00-00<br />
            <b>Insured Name:</b> M/s Birla Institute of Technology and Science Pilani Hyd<br />
            <b>Period of Insurance:</b> From 00:01 Hrs of 03/09/2021 To Midnight 23:59 Hrs of 02/09/2022<br /><br />

            <b>Name:</b> Ashok Singh, ADITYA BIRLA INSURANCE BROKERS LTD<br />
            <b>Email:</b> <a href='mailto:ashok.singh12@adityabirlacapital.com'>ashok.singh12@adityabirlacapital.com</a><br />
            <b>Mobile Number:</b>+91 7840038777<br /><br />
          </p>
          {/* <b><p>For Group Mediclaim Policy Ready Reckoner of BITS Pilani Hyderabad Campus for AY 2020 - 21 :</p></b><Button disabled round color="primary">Click Here</Button><br/><br/> */}
          <h4><b>For Policy Related Assistance:</b></h4>
          <GridContainer justify='flex-start'>
            <GridItem xs={12} sm={5} md={5}>
              <p>Mail at <b><a href='mailto:swd-enquiry@hyderabad.bits-pilani.ac.in?subject=Query Regarding Medical Insurance Policy'>swd-enquiry@hyderabad.bits-pilani.ac.in</a></b><br />
                or Contact Mr. Prasanth Inturi at <b>9010202837</b> <br />
                or Visit SWD office (C-224)
              </p>
              <p><b>For more details:</b>&nbsp;&nbsp;&nbsp;
                <a target='_blank' href={`${BaseUrl}/public_storage/medical_insurance/insurance_instructions.pdf`} style={{ textDecoration: 'none', color: 'white' }} rel='noreferrer'>
                  <Button round color='primary'>Click Here</Button>
                </a>
              </p>
            </GridItem>
            <GridItem xs={12} sm={1} md={1}>
              <b>OR</b>
            </GridItem>
            <GridItem xs={12} sm={5} md={5}>
              <p>Please feel free to write to them at <b><a href='mailto:crcm@rakshatpa.com?subject=Query Regarding Medical Insurance Policy'>crcm@rakshatpa.com</a></b></p>
              <div style={{ lineHeight: '10px' }}>
                <p>Faridabad :<b>0129-4289999,1800-180-1444</b></p>
                <p>Mumbai :<b>022-67876666,1800-220-456</b></p>
                <p>Bangalore :<b>080-42839999, 1800-425-8910</b></p>
                <p>Special Assistance number:<b>18001801555</b></p>
              </div>

              <p><b>Network Hospitals List:</b>&nbsp;&nbsp;&nbsp;
                <a target='_blank' href='https://www.rakshatpa.com/WebPortal/Login/search_PPN' style={{ textDecoration: 'none', color: 'white' }} rel='noreferrer'>
                  <Button round color='primary'>Click Here</Button>
                </a>
              </p>
            </GridItem>
          </GridContainer>

          {/* <br/>
		<center><p><b>OR</b></p></center>
		<p>Please feel free to write to them on <b><a href="mailto:crcm@rakshatpa.com?subject=Query Regarding Medical Insurance Policy">crcm@rakshatpa.com</a></b></p>
		<center><p><b>OR</b></p></center>
		<p>Call the Toll Free number <b>1800 266 5844</b> (between 8:00 am to 8:00 pm, 7 days of the week) for help.<br/> For Claim related assistance: Please feel free to write to them on Email ID or call the Toll Free number</p><br/> */}

          <h3 style={{ display: 'flex', justifyContent: 'center' }}><b>POLICY DETAILS OF STUDENT</b></h3>
          {/* <p><b>Policy Number:</b> 51-20-00561-00-00</p>
    <p><b>Corporate ID:</b> 27367</p>
    <p><b>Membership ID:</b> {medData.member_id}</p>
    <p><b>UHID:</b> {medData.username}</p>
    <p><b>User ID:</b> YOUR ID Number <i>(e.g. 2015AAPS0274H)</i></p>
    <p><b>Password:</b> {medData.password}</p>  */}
          {/* <p>Use the above credentials to login to the fhpl website <a href="https://www.fhpl.net/FhplLogins/Ecard/Login.aspx?Type=ecard"><b>here</b></a> and view your insurance details.</p>
    <p>For information about claiming Medical Insurance download your medical card.</p> */}
        </CardBody>
        <CardFooter>

          <Button round color='primary' onClick={() => { window.open(medData.card) }}> Download Medical Card</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
