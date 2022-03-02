
import React from 'react'
import Datetime from 'react-datetime'

// material-ui components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export default function PersonalDetails ({ classes, profile, setProfile, hostels, onChange, valid }) {
  return (
    <div>
      <h3><b>PERSONAL DETAILS</b></h3>
      <GridContainer justify='left'>

        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='Name'
            id='name'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.name,
              disabled: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.labelRoot}>Hostel</InputLabel>
            <Select
              name='hostel'
              className={classes.input + ' ' + classes.underline}
              defaultValue={profile.hostel}
              onChange={onChange}
            >
              <MenuItem value='NA'>Select</MenuItem>
              {hostels.map((item) => {
                return <MenuItem value={item.key}>{item.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <CustomInput
            labelText='Room No.'
            id='room'

            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.room, name: 'room'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput
            labelText='Phone No.'
            id='phone'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.phone, name: 'phone'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='Alternate Phone No.'
            id='alt_phone'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.alt_phone,
              name: 'alt_phone'
            }}
            onChange={onChange}
          />
        </GridItem> <br />
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='ID'
            id='myid'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.id, disabled: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.label}>
              Birth-Date
            </InputLabel>
            <Datetime
              dateFormat='DD-MM-YYYY'
              defaultValue={new Date(`${profile.dob}`)}
              timeFormat={false}
              className={classes.input + ' ' + classes.underline}
              isValidDate={valid}
              onChange={(e) => {
                const date = new Date(`${e}`)
                const { Date1, Month, Year } = {
                  Date1: date.getDate(),
                  Month: date.getMonth() + 1,
                  Year: date.getFullYear()
                }
                if (Month > 9) {
                  setProfile(prevState => ({
                    ...prevState,
                    dob: `${Year}-${Month}-${Date1}`
                  }))
                } else {
                  setProfile(prevState => ({
                    ...prevState,
                    dob: `${Year}-0${Month}-${Date1}`
                  }))
                }
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.labelRoot}>Gender</InputLabel>
            <Select
              name='gender'
              className={classes.input + ' ' + classes.underline}
              value={profile.gender}
              onChange={onChange}
            >
              <MenuItem value='M'>Male</MenuItem>
              <MenuItem value='F'>Female</MenuItem>
              <MenuItem value='O'>Others</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='Aadhar Card No.'
            id='aadhar'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.aadhaar, name: 'aadhaar'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='PAN Card No.'
            id='pan'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.pan_card, name: 'pan_card'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>

          <FormControl fullWidth className={classes.formControl}>
            <InputLabel className={classes.labelRoot}>Category</InputLabel>
            <Select
              name='category'
              className={classes.input + ' ' + classes.underline}
              value={profile.category}
              onChange={onChange}
            >
              <MenuItem value='General'>General</MenuItem>
              <MenuItem value='SC'>Scheduled Caste (SC)</MenuItem>
              <MenuItem value='ST'>Scheduled Tribe (ST)</MenuItem>
              <MenuItem value='OBC'>Other Backward Class (OBC)</MenuItem>
              <MenuItem value='Others'>Others</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText='Personal Mail'
            id='mail'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: 'email',
              defaultValue: `${profile.email}`,
              name: 'email'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText='BITSmail'
            id='bitsmail'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: 'email',
              defaultValue: `${profile.uid}@hyderabad.bits-pilani.ac.in`,
              disabled: true
            }}
          />
        </GridItem>
      </GridContainer>
    </div>
  )
}
