
import React from 'react'

// material-ui components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function PersonalDetails({classes,profile,setProfile,hostels,onChange,valid}) {
    return (
        <div>
  <h3><b>LOCAL GUARDIAN'S DETAILS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Name"
        id="locname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.guardian,
          name:'guardian'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Phone No."
        id="locphno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.gphone,
          name:'gphone'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Address"
        id="Address"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          multiline:true,
          defaultValue:profile.localadd,
          name:'localadd'
        }}
        onChange={onChange}
      />
    </GridItem>
    </GridContainer>
    <h3><b>OTHER DETAILS</b></h3>
  <GridContainer>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Father's Name"
        id="paname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.father,
          name:'father'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Father's Phone No."
        id="paphno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fphone,
          name:'fphone'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Father's Email"
        id="pamail"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fmail,
          name:'fmail'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Father's Occupation"
        id="paocc"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.foccup,
          name:'foccup'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Father's Company"
        id="pacomp"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fcomp,
          name:'fcomp'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Father's Designation"
        id="padesg"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.fdesg,
          name:'fdesg'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Mother's Name"
        id="maname"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mother,
          name:'mother'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Mother's Phone No."
        id="maphno"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.hphone,
          name:'hphone'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={10}>
      <CustomInput
        labelText="Mothers's Email"
        id="mamail"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mmail,
          name:'mmail'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Mother's Occupation"
        id="maocc"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.moccup,
          name:'moccup'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Mother's Company"
        id="macomp"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mcomp,
          name:'mcomp'
        }}
        onChange={onChange}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={4}>
      <CustomInput
        labelText="Mother's Designation"
        id="madesg"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.mdesg,
          name:'mdesg'
        }}
        onChange={onChange}
      />                  
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel className={classes.labelRoot}>Family Income</InputLabel>
      <Select
        name='income'
        className={classes.input+" "+classes.underline}
        value={profile.income}
        onChange={onChange}
       >
         <MenuItem value={'NIL'}>NIL</MenuItem>
         <MenuItem value={'INR 0-4 Lakh'}>INR 0-4 Lakh</MenuItem>
         <MenuItem value={'INR 4-8 Lakh'}>INR 4-8 Lakh</MenuItem>
         <MenuItem value={'INR 8-12 Lakh'}>INR 8-12 Lakh</MenuItem>
         <MenuItem value={'INR 12 Lakh Above'}>INR 12 Lakh Above</MenuItem>
      </Select>
     </FormControl>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Nationality"
        id="nationality"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          defaultValue:profile.nation,
          name:'nation'
        }}
        onChange={onChange}
      />
      </GridItem>
  </GridContainer>
  </div>
    )
}
