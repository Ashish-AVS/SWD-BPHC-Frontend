
import React from 'react'

// material-ui components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import CustomInput from 'components/CustomInput/CustomInput.js'

export default function BankDetails ({ classes, profile, setProfile, hostels, onChange, valid }) {
  return (
    <div>
      <h3><b>BANK ACCOUNT DETAILS</b></h3>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='Account Number'
            id='accno'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.acno,
              name: 'acno'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='Bank Name'
            id='bankname'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.bank,
              name: 'bank'
            }}
            onChange={onChange}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='IFSC Code'
            id='ifscCode'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue: profile.ifsc,
              name: 'ifsc'
            }}
            onChange={onChange}
          />
        </GridItem>

      </GridContainer>
    </div>
  )
}
