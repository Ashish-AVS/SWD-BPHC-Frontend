
import React from 'react'

// material-ui components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";



export default function PersonalDetails({classes,profile,setProfile,hostels,onChange,valid}) {
    return (
        <div>
  <h3><b>ADDRESS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Address"
        id="Address"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          multiline:true,
          defaultValue:`${profile.homeadd}`,
          name:"homeadd"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="City/Town"
        id="city"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.city,
          name:"city"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="District"
        id="city"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.dist,
          name:"dist"
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="State"
        id="state"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.state,
          name:'state'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Pin code"
        id="pin_code"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.pin_code,
          name:'pin_code'
        }}
        onChange={onChange}
      />
    </GridItem>
    
  </GridContainer>
  </div>
    )
}
