import React from 'react'
import MaterialTable from 'material-table'
import { csv } from 'd3'
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

// import Table from "components/Table/Table";
import prof from './professors.csv'
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)
const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='down' ref={ref} {...props} />
})
Transition.displayName = 'Transition'

export default function ConnectModal () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [profData, setProfData] = React.useState()
  const [isFetching, setIsfetching] = React.useState(false)
  const [isFetched, setIsFetched] = React.useState(false)
  React.useEffect(() => {
    try {
      const fetchData = async () => {
        setProfData(await csv(prof))
        setIsfetching(true)
      }
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }, [])
  React.useEffect(() => {
    if (isFetching === true) { setIsFetched(true) }
  }, [isFetching])
  let modal = <></>
  if (isFetched === true) {
    const columns1 = profData.columns.map(item => {
      return { title: item, field: item }
    })
    modal = (
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        maxWidth='lg'
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
          <h3 className={classes.modalTitle}><strong>Faculty Details</strong></h3>
        </DialogTitle>
        <DialogContent
          id='classic-modal-slide-description'
          className={classes.modalBody}
        >
          <MaterialTable
            title='PROFESSOR DETAILS'
            columns={columns1}
            data={profData}
            options={{
              pageSize: 20,
              emptyRowsWhenPaging: false,
              headerStyle: {
                backgroundColor: '#A28089',
                color: '#FFF'
              },
              rowStyle: {
                border: '1px solid black'
              }
            }}
          />

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

  return (

    <Card>
      <CardHeader color='primary'>
        <h3 className={classes.cardTitleCon}>
          FACULTY DETAILS
        </h3>
      </CardHeader>
      <CardBody>
        <p>A complete Directory of all the Faculties holding some position in various places</p>
        <div className={classes.stats} style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button variant='outlined' style={{ borderRadius: '30px', border: '1px solid blue' }} color='primary' onClick={() => { setOpen(true) }}>
            View Directory
          </Button>
        </div>
      </CardBody>

      {modal}

    </Card>
  )
}
