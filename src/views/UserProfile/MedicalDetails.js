
import React from 'react'

// material-ui components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export default function MedicalDetails ({ classes, profile, onChange }) {
  return (
    <div>
      <h3><b>MEDICAL DETAILS</b></h3>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.labelRoot}>Blood Group</InputLabel>
            <Select
              name='blood'
              className={classes.input + ' ' + classes.underline}
              value={profile.blood}
              onChange={onChange}
            >
              <MenuItem value='A+'>A+</MenuItem>
              <MenuItem value='A-'>A-</MenuItem>
              <MenuItem value='B+'>B+</MenuItem>
              <MenuItem value='B-'>B-</MenuItem>
              <MenuItem value='AB+'>AB+</MenuItem>
              <MenuItem value='AB-'>AB-</MenuItem>
              <MenuItem value='O+'>O+</MenuItem>
              <MenuItem value='O-'>O-</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText='Medical History'
            id='medHistory'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              multiline: true,
              defaultValue: `${profile.med_history}`,
              name: 'med_history'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText='Current Medication'
            id='CurrMed'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              multiline: true,
              defaultValue: `${profile.current_med}`,
              name: 'current_med'
            }}
            onChange={onChange}
          />
        </GridItem>
      </GridContainer>
    </div>
  )
}
