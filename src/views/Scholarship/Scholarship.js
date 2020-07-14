import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

//Created components
import Content from "./Content.js";
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    paddingLeft: "35%",
    marginBottom: "40px",
    position: "relative"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Scholarship() {
  const classes = useStyles();
  return (
      <div>
          <div className={classes.typo} style={{marginTop:"-50px"}}>
          <h2><strong>STUDENT WELFARE DIVISION</strong></h2>
      </div>
      <div className={classes.note}>
          <h4>Scholarship offered at BITS</h4>
      </div>
   
  
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Scholarships:"
            headerColor="success"
            tabs={[
              {
                tabName: "MCN",                
                tabContent: (
                  <Content
                    contentId={0}
                  />
                )
              },
              {
                tabName: "SAF",              
                tabContent: (
                  <Content
                    contentId={1}
                  />
                )
              }
            ]}
          />
        </GridItem>
        </GridContainer>
</div>    
  );
}
