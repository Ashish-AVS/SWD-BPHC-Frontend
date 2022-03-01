import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer0.js'
import GridItem from 'components/Grid/GridItem0.js'

import styles from 'assets/jss/material-kit-react/views/landingPageSections/workStyle.js'

const useStyles = makeStyles(styles)

export default function WorkSection () {
  const classes = useStyles()
  return (
    <div className={classes.section} style={{ marginTop: '-40px' }}>
      <GridContainer justify='center'>
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Contact us</h2>
          <h4 className={classes.description}>
            For any query regarding your College life you can contact us from your BITS email or you can directly mail us at<br /><a href='mailto:swdnucleus@hyderabad.bits-pilani.ac.in?subject=Query'> swdnucleus@hyderabad.bits-pilani.ac.in</a>
          </h4>

        </GridItem>
      </GridContainer>
    </div>
  )
}
