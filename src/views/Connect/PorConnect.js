import React from 'react'
// import MaterialTable from "material-table";
// import {csv} from "d3";
import MaterialTable from 'material-table'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

// Core Components
// import Button from "components/CustomButtons/Button.js";
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import { BaseUrl } from 'variables/BaseUrl'
import CustomTabs from 'components/CustomTabs/CustomTabs.js'
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
// import Table from "components/Table/Table";
// import prof from "./professors.csv";
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'
import { title } from 'assets/jss/material-dashboard-react'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})
Transition.displayName = 'Transition'

function PorModal ({ open, setOpen, porData }) {
  const classes = useStyles()
  return (
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal
      }}
      maxWidth='xl'
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
        <h3 className={classes.modalTitle}><strong>RESPONSIBILITY BEARERS</strong></h3>
      </DialogTitle>
      <DialogContent
        id='classic-modal-slide-description'
        className={classes.modalBody}
      >
        <GridContainer justify='center' alignItems='center'>
          <GridItem xs={12} sm={12} md={11}>
            <CustomTabs

              headerColor='primary'
              tabs={[
                {
                  tabName: 'SWD',
                  tabContent: (
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <MaterialTable
                          title='SWD Nucleus'
                          columns={[{ title: 'Name', field: 'name' },
                                    { title: 'User ID', field: 'uid' },
                                    { title: 'Phone No.', field: 'phone' },
                                    { title: 'Designation', field: 'designation' }]}
                          data={porData.swd}

                          options={{

                                    search: true,
                                    pageSize: 10,
                                    emptyRowsWhenPaging: false

                                  }}
                        />
                      </GridItem>
                    </GridContainer>

                  )
                },
                {
                  tabName: 'SUC',
                  tabContent: (
                    <MaterialTable
                      title='Student Union'
                      columns={[{ title: 'Name', field: 'name' },
                        { title: 'User ID', field: 'uid' },
                        { title: 'Phone No.', field: 'phone' },
                        { title: 'Designation', field: 'designation' }]}
                      data={porData.suc}
                      options={{

                        search: true,
                        pageSize: 10,
                        emptyRowsWhenPaging: false

                      }}
                    />
                  )
                },
                {
                  tabName: 'EC',
                  tabContent: (
                    <MaterialTable
                      title='Election Commission'
                      columns={[{ title: 'Name', field: 'name' },
                        { title: 'User ID', field: 'uid' },
                        { title: 'Phone No.', field: 'phone' },
                        { title: 'Designation', field: 'designation' }]}
                      data={porData.ec}
                      options={{

                        search: true,
                        pageSize: 10,
                        emptyRowsWhenPaging: false

                      }}
                    />
                  )
                },
                {
                  tabName: 'CRC',
                  tabContent: (
                    <MaterialTable
                      title='CRC Committee'
                      columns={[{ title: 'Name', field: 'name' },
                        { title: 'User ID', field: 'uid' },
                        { title: 'Phone No.', field: 'phone' },
                        { title: 'Designation', field: 'designation' }]}
                      data={porData.crc}
                      options={{

                        search: true,
                        pageSize: 10,
                        emptyRowsWhenPaging: false

                      }}
                    />
                  )
                },
                {
                  tabName: 'SMC',
                  tabContent: (
                    <MaterialTable
                      title='Student Mess Council'
                      columns={[{ title: 'Name', field: 'name' },
                        { title: 'User ID', field: 'uid' },
                        { title: 'Phone No.', field: 'phone' },
                        { title: 'Designation', field: 'designation' }]}
                      data={porData.smc}
                      options={{

                        search: true,
                        pageSize: 10,
                        emptyRowsWhenPaging: false

                      }}
                    />
                  )
                },
                {
                  tabName: 'PU',
                  tabContent: (
                    <MaterialTable
                      title='Placement Unit'
                      columns={[{ title: 'Name', field: 'name' },
                        { title: 'User ID', field: 'uid' },
                        { title: 'Phone No.', field: 'phone' },
                        { title: 'Designation', field: 'designation' }]}
                      data={porData.pu}
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
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>

        <Button
          onClick={() => setOpen(false)}
          color='danger'
          solid='true'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function PorConnect () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [porData, setPorData] = React.useState({})
  const [isFetching, setIsfetching] = React.useState(false)
  const [isFetched, setIsFetched] = React.useState(false)
  const token = JSON.parse(localStorage.getItem('tokens'))

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await fetch(`${BaseUrl}/api/con/resb`, {
          headers: { Authorization: token }
        })
        const res = await result.json()
        setPorData(res.data)
        console.log(res.data)
      }
      fetchData()
      setIsFetched(true)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (

    <Card>

      <CardHeader color='primary'>
        <h4 className={classes.cardTitleCon}>
          RESPONSIBILITY
        </h4>
      </CardHeader>
      <CardBody>
        <p>A complete Directory of all the students holding some position in various places</p>
        <div className={classes.stats} style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button variant='outlined' style={{ borderRadius: '30px', border: '1px solid blue' }} color='primary' onClick={() => { setOpen(true) }}>
            View Directory
          </Button>
        </div>
      </CardBody>

      {isFetched ? <PorModal open={open} setOpen={setOpen} porData={porData} /> : null}

    </Card>
  )
}
