import React from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'

// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'
import Button from '@material-ui/core/Button'
import BusModal from 'views/Modals/BusModal.js'
import ProfConnect from './ProfConnect'
import OfficeConnect from './OfficeConnect'
import HostelConnect from './HostelConnect'
import PortalConnect from './PortalConnect'
import PorConnect from './PorConnect'
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)

export default function Connect () {
  const classes = useStyles()
  const [busModal, setBusModal] = React.useState(false)

  return (
    <div>
      <div className={classes.typo} style={{ marginTop: '-50px' }}>
        <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
        <h5>Want to contact someone?</h5>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <PorConnect />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <OfficeConnect />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <ProfConnect />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <PortalConnect />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <HostelConnect />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color='primary'>
              <h3 className={classes.cardTitleCon}>
                212 BUS TIMINGS
              </h3>
            </CardHeader>
            <CardBody>
              <p>Timings of 212 bus from Campus to Secundrabad Railway Station and vice-versa</p>
              <div className={classes.stats} style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button variant='outlined' style={{ borderRadius: '30px', border: '1px solid blue' }} color='primary' onClick={() => { setBusModal(true) }}>
                  View Directory
                </Button>
              </div>
            </CardBody>

            <BusModal Modal={busModal} openModal={setBusModal} />

          </Card>
        </GridItem>
      </GridContainer>

      {// isFetched?<ConnectModal open={open} setOpen={setOpen} data={profData}/>:null}
}
    </div>
  )
}
